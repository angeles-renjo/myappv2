// pages/api/trades.ts

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
  } else if (req.method === "POST") {
    const tradeData = req.body;
    const newTrade = await prisma.trade.create({
      data: {
        ...tradeData,
      },
    });
    res.status(201).json(newTrade);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
