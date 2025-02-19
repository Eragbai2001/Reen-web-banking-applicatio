// pages/api/email-token.ts
import { NextApiRequest, NextApiResponse } from "next";
import { account } from "../lib/appwrite";
import { ID } from "appwrite";

interface EmailRequestBody {
  email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body as EmailRequestBody;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    try {
      const sessionToken = await account.createEmailToken(ID.unique(), email);
      res.status(200).json({ userId: sessionToken.userId });
    } catch (error) {
      console.error("Error creating email token:", error);
      res.status(500).json({ error: "Failed to create email token" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
