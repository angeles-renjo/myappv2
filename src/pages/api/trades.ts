// pages/api/trades/[userId].ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;
    const trades = await prisma.trade.findMany({
      where: {
        userId: userId as string,
      },
    });
    res.status(200).json(trades);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
