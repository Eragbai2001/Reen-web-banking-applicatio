"use server";

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// Interface for customer data
interface CustomerData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  type: "individual" | "business";
  identity?: {
    type: "nin" | "bvn" | "passport" | "license";
    number: string;
  };
  address?: string;
}

interface MonoCustomerResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  type: string;
  [key: string]: any;
}

export const createMonoCustomer = async (
  newCustomer: CustomerData
): Promise<MonoCustomerResponse> => {
  try {
    // Validate identity data if provided
    if (newCustomer.identity) {
      // Convert to lowercase and validate
      newCustomer.identity.type = newCustomer.identity.type.toLowerCase() as
        | "nin"
        | "bvn"
        | "passport"
        | "license";

      // Check if identity.type is valid
      const validTypes = ["nin", "bvn", "passport", "license"];
      if (!validTypes.includes(newCustomer.identity.type)) {
        console.error(
          `Invalid identity type: ${
            newCustomer.identity.type
          }. Must be one of: ${validTypes.join(", ")}`
        );
        throw new Error(
          `Invalid identity type: ${
            newCustomer.identity.type
          }. Must be one of: ${validTypes.join(", ")}`
        );
      }

      // Validate identity number
      if (
        !newCustomer.identity.number ||
        newCustomer.identity.number.trim() === ""
      ) {
        console.error("Identity number is required");
        throw new Error("Identity number is required");
      }
    }

    // Validate required fields
    if (
      !newCustomer.first_name ||
      !newCustomer.last_name ||
      !newCustomer.email ||
      !newCustomer.phone
    ) {
      console.error("Missing required customer information");
      throw new Error("First name, last name, email, and phone are required");
    }

    // Get the API key from environment variables
    const apiKey = process.env.MONO_SECRET_KEY;

    // Log key info for debugging (without exposing the full key)
    if (!apiKey) {
      console.error("API key is undefined");
      throw new Error("Missing MONO_SECRET_KEY environment variable");
    }

    // Prepare request data
    const customerData = {
      first_name: newCustomer.first_name,
      last_name: newCustomer.last_name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      ...(newCustomer.type && { type: newCustomer.type }),
      ...(newCustomer.identity && { identity: newCustomer.identity }),
      ...(newCustomer.address && { address: newCustomer.address }),
    };

    console.log(
      "Sending customer data to Mono:",
      JSON.stringify(customerData, null, 2)
    );

    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://api.withmono.com/v2/customers",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "mono-sec-key": apiKey,
      },
      data: customerData,
    };

    try {
      const response: AxiosResponse<MonoCustomerResponse> = await axios.request(
        options
      );
      console.log("Mono API Response:", response.data);
      return response.data;
    } catch (axiosError) {
      // Type assertion for AxiosError
      const error = axiosError as AxiosError;

      // Log detailed error information
      console.error("Mono API Error Details:");
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);

        if (error.response.status === 409) {
          throw new Error("Customer already exists in Mono");
        }

        throw new Error(
          `Mono API Error: ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response received from Mono API");
      } else {
        console.error("Request setup error:", error.message);
        throw new Error(`Request setup error: ${error.message}`);
      }
    }
  } catch (err) {
    console.error("Creating a Mono Customer Failed: ", err);
    throw err;
  }
};

export const deleteMonoCustomer = async (customerId: string): Promise<any> => {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.MONO_SECRET_KEY;

    if (!apiKey) {
      console.log("API key is undefined");
      throw new Error("Missing MONO_SECRET_KEY environment variable");
    }

    // Log the customer ID to ensure it is being passed correctly
    console.log("Deleting Mono customer with ID:", customerId);

    const options: AxiosRequestConfig = {
      method: "DELETE",
      url: `https://api.withmono.com/v2/customers/${customerId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "mono-sec-key": apiKey,
      },
    };

    try {
      const response: AxiosResponse = await axios.request(options);
      console.log("Mono API Delete Response:", response.data);
      return response.data;
    } catch (axiosError) {
      // Type assertion for AxiosError
      const error = axiosError as AxiosError;

      // Log detailed error information
      console.error("Mono API Error Details:");
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);

        throw new Error(
          `Mono API Error: ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response received from Mono API");
      } else {
        console.error("Request setup error:", error.message);
        throw new Error(`Request setup error: ${error.message}`);
      }
    }
  } catch (err) {
    console.error("Deleting a Mono Customer Failed: ", err);
    throw err;
  }
};

export const getMonoConnectToken = async (
  customerId: string
): Promise<string> => {
  try {
    // For debugging - don't leave this in production code
    console.log("Customer ID:", customerId);

    // Use the secret key for server-side operations
    const apiKey = process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY;

    if (!apiKey) {
      console.error("MONO_SECRET_KEY is not defined in environment variables");
      throw new Error("Missing MONO_SECRET_KEY environment variable");
    }

    console.log("Making request to Mono API...");

    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://api.withmono.com/v2/connect/token/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "mono-sec-key": apiKey.trim(),
      },
      data: {
        customer: `67ce2777271cb661d8ebc0af`,
      },
    };

    const response: AxiosResponse = await axios.request(options);
    console.log("Mono API response status:", response.status);

    if (!response.data.token) {
      throw new Error("No token returned from Mono API");
    }

    return response.data.token;
  } catch (err) {
    // Enhanced error logging
    const error = err as AxiosError;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Mono API Error Response:", {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }

    console.error("Getting Mono Connect Token Failed: ", err);
    throw err;
  }
};

export const getMonoCustomerByEmail = async (
  email: string
): Promise<{ id: string } | null> => {
  try {
    const apiKey = process.env.MONO_SECRET_KEY;

    if (!apiKey) {
      throw new Error("Missing MONO_SECRET_KEY environment variable");
    }

    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://api.withmono.com/v2/customers", // Adjust URL based on Mono API documentation
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "mono-sec-key": apiKey,
      },
      params: {
        email: email,
        // Add other necessary parameters based on Mono API documentation
      },
    };

    const response: AxiosResponse = await axios.request(options);

    // Handle the response based on Mono's API structure
    // This is a placeholder - adjust according to Mono's API response format
    const customers = response.data.data || [];
    if (customers.length > 0) {
      return customers[0]; // Return the first matching customer
    }
    return null;
  } catch (err) {
    console.error("Getting Mono Customer by Email Failed: ", err);
    throw err;
  }
};
