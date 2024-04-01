import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Assuming the account size is stored in a field named `accountSize`
      const accountSize = user.accountSize;

      return res.status(200).json({ accountSize });
    } catch (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
