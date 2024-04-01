// components/TradesList.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Trade } from "@prisma/client";
import { useUserId } from "../context/UserIdContext";

const TradesList: React.FC = () => {
  const { userId } = useUserId();
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      if (!userId) return;
      const response = await fetch(`/api/trades?userId=${userId}`);
      const data: Trade[] = await response.json();
      setTrades(data);
    };

    fetchTrades();
  }, [userId]);

  return (
    <div>
      <h2>Trades for User {userId}</h2>
      <ul>
        {trades.map((trade) => (
          <li key={trade.id}>
            {trade.pair} {trade.profitLoss}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradesList;
