"use server";

import { ID, Query, Models } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "./utils";


import { createMonoCustomer, deleteMonoCustomer } from "./mono.action";
;

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const register = async ({ password, ...userData }: SignUpParams) => {
  const { email, first_name, last_name } = userData;
  let newUserAccount: Models.User<Models.Preferences> | null = null;
  let newMonoCustomer = null;

  try {
    const { account, database } = await createAdminClient();

    // Create Appwrite account first
    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${first_name} ${last_name}`
    );

    if (!newUserAccount) {
      throw new Error("Error creating Appwrite user account");
    }

    // Try to create Mono customer, but continue even if there's an issue
    try {
      newMonoCustomer = await createMonoCustomer({
        ...userData,
        type: "individual",
      });
      console.log("Mono customer created:", newMonoCustomer);
    } catch (monoError) {
      // Log the error but continue with registration
      console.log("Warning: Issue with Mono customer creation:", monoError);
      // Create a placeholder object if needed
      newMonoCustomer = { id: "pending" };
    }

    // No validation check here - we'll use the Mono customer ID if it exists,
    // or a placeholder value if it doesn't
    const monoCustomerId = newMonoCustomer?.id || "pending";
    const monoCustomerUrl = newMonoCustomer?.id
      ? `https://api.withmono.com/v2/customers/${newMonoCustomer.id}`
      : "";

    // Create user document in database
    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        // Convert identity object to string if it exists
        identity: userData.identity
          ? `${userData.identity.type}:${userData.identity.number}`
          : undefined,
        userId: newUserAccount.$id,
        monoCustomerId: monoCustomerId,
        monoCustomerUrl: monoCustomerUrl,
      }
    );

    // Create session
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Registration Error:", error);

    // Cleanup if needed
    if (newUserAccount) {
      try {
        // Delete the Appwrite account if it exists
        const { account } = await createAdminClient();
        await account.delete(newUserAccount.$id);
        console.log(`Deleted Appwrite account due to registration failure`);
      } catch (cleanupError) {
        console.error(
          "Failed to delete Appwrite account during cleanup:",
          cleanupError
        );
      }
    }

    if (
      newMonoCustomer &&
      newMonoCustomer.id &&
      newMonoCustomer.id !== "pending"
    ) {
      try {
        // Delete Mono customer if it exists and has a real ID
        await deleteMonoCustomer(newMonoCustomer.id);
        console.log(`Deleted Mono customer due to registration failure`);
      } catch (cleanupError) {
        console.error(
          "Failed to delete Mono customer during cleanup:",
          cleanupError
        );
      }
    }

    throw error;
  }
};

export const deleteUser = async (monoCustomerId: string) => {
  try {
    const { account, database } = await createAdminClient();

    // Delete Mono customer first
    await deleteMonoCustomer(monoCustomerId);
    console.log("Deleted Mono customer with ID:", monoCustomerId);

    if (!monoCustomerId) {
      throw new Error("monoCustomerId must be provided");
    }

    // Find and delete user document by monoCustomerId instead of userId
    const documents = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [
        // Use Query class to search by monoCustomerId instead
        Query.equal("monoCustomerId", monoCustomerId),
      ]
    );

    if (documents.documents.length > 0) {
      const userDoc = documents.documents[0];

      // Get the userId from the document for account disabling
      const userId = userDoc.userId;

      // Delete the user document
      await database.deleteDocument(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        userDoc.$id
      );

      console.log("Deleted user document with ID:", userDoc.$id);

      // Disable the Appwrite account if we found the userId
      if (userId) {
        try {
          // We're using the adminClient that was already created above
          await account.updateStatus(userId, false); // Disable the account
          console.log("Disabled Appwrite account with ID:", userId);
        } catch (accErr) {
          console.error("Error disabling Appwrite account:", accErr);
          // Continue execution even if account disabling fails
        }
      }
    } else {
      console.warn(
        "No user document found with monoCustomerId:",
        monoCustomerId
      );
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
export const login = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(session);
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error", error);
  }
};

// export const createLinkToken = async (user: User) => {
//   try {
//     const tokenParams = {
//       user: {
//         client_user_id: user.$id,
//       },
//       client_name: "Reen Bank",
//       products: ["auth"] as Products[],
//       language: "en",
//       country_codes: ["US"] as CountryCode[],
//     };
//     const response = await plaidClient.linkTokenCreate(tokenParams);

//     return parseStringify({ linkToken: response.data.link_token });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createBankAccount = async ({
  users,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        users,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    );
    return parseStringify(bankAccount);
  } catch (error) {
    console.error("Error", error);
  }
};
