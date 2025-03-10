"use server";

import axios, { AxiosRequestConfig } from "axios";
import { createAdminClient } from "./appwrite";
import { parseStringify } from "./utils";

interface BalanceResponse {
  status: string;
  message: string;
  timestamp: string;
  data: {
    id: string;
    name: string;
    account_number: string;
    balance: number;
    currency: string;
  };
}

interface JobStatusResponse {
  status: string;
  message: string;
  timestamp: string;
  data: {
    id: string;
    job_status: "processing" | "failed" | "finished";
    name: string;
    account: string;
    type: string;
    synced: boolean;
    reauth_required: boolean;
  };
}

// Fetch real-time balance data from Mono API
export const fetchAccountBalance = async (accountId: string) => {
  try {
    const apiKey = process.env.MONO_SECRET_KEY;

    if (!apiKey) {
      throw new Error("Missing MONO_SECRET_KEY environment variable");
    }

    // Make the initial request to start real-time sync
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://api.withmono.com/v2/accounts/${accountId}/balance`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "mono-sec-key": apiKey,
        "x-realtime": "true",
      },
    };

    const response = await axios.request(options);
    
    // Extract headers to check job status
    const hasNewData = response.headers["x-has-new-data"];
    const jobId = response.headers["x-job-id"];
    const jobStatus = response.headers["x-job-status"];

    console.log("Real-time data request headers:", {
      hasNewData,
      jobId,
      jobStatus
    });

    // Initial response data
    const balanceData: BalanceResponse = response.data;

    return {
      jobId,
      jobStatus,
      hasNewData,
      initialData: parseStringify(balanceData),
    };
  } catch (error) {
    console.error("Error fetching real-time account balance:", error);
    throw error;
  }
};

// Check the status of a real-time job
export const checkJobStatus = async (accountId: string, jobId: string) => {
  try {
    const apiKey = process.env.MONO_SECRET_KEY;

    if (!apiKey) {
      throw new Error("Missing MONO_SECRET_KEY environment variable");
    }

    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://api.withmono.com/v2/accounts/${accountId}/jobs/${jobId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "mono-sec-key": apiKey,
      },
    };

    const response = await axios.request(options);
    const jobData: JobStatusResponse = response.data;

    return parseStringify(jobData);
  } catch (error) {
    console.error("Error checking job status:", error);
    throw error;
  }
};

// Get finalized balance data after job completion
export const getFinalBalanceData = async (accountId: string) => {
  try {
    const apiKey = process.env.MONO_SECRET_KEY;

    if (!apiKey) {
      throw new Error("Missing MONO_SECRET_KEY environment variable");
    }

    // Make request to get balance without real-time flag
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://api.withmono.com/v2/accounts/${accountId}/balance`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "mono-sec-key": apiKey,
        // No x-realtime flag, to get latest data without starting a new job
      },
    };

    const response = await axios.request(options);
    const balanceData: BalanceResponse = response.data;

    // Store the account data in the database
    await storeAccountData(accountId, balanceData.data);

    return parseStringify(balanceData);
  } catch (error) {
    console.error("Error fetching final balance data:", error);
    throw error;
  }
};

// Store the account data in the database
const storeAccountData = async (accountId: string, accountData: any) => {
  try {
    const { database } = await createAdminClient();
    const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
    const BANK_ACCOUNTS_COLLECTION_ID = process.env.APPWRITE_BANK_COLLECTION_ID;

    // Check if account already exists in the database
    const documents = await database.listDocuments(
      DATABASE_ID!,
      BANK_ACCOUNTS_COLLECTION_ID!,
      [`accountId=${accountId}`]
    );

    if (documents.documents.length > 0) {
      // Update existing account
      await database.updateDocument(
        DATABASE_ID!,
        BANK_ACCOUNTS_COLLECTION_ID!,
        documents.documents[0].$id,
        {
          balance: accountData.balance,
          last_updated: new Date().toISOString(),
        }
      );
    } else {
      // Do nothing, as createBankAccount should have already been called
      console.log("No existing account found to update");
    }

    return true;
  } catch (error) {
    console.error("Error storing account data:", error);
    throw error;
  }
};

// Trigger reauthorization if needed
export const triggerReauthorization = async (accountId: string) => {
  try {
    const apiKey = process.env.MONO_SECRET_KEY;

    if (!apiKey) {
      throw new Error("Missing MONO_SECRET_KEY environment variable");
    }

    // This endpoint may vary based on Mono's documentation
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `https://api.withmono.com/v2/accounts/${accountId}/reauthorize`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "mono-sec-key": apiKey,
      },
    };

    const response = await axios.request(options);
    return parseStringify(response.data);
  } catch (error) {
    console.error("Error triggering reauthorization:", error);
    throw error;
  }
};