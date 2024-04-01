// components/TradesList.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Trade } from "@prisma/client";

interface TradesListProps {
  userId: string | null;
}

const TradesList: React.FC<TradesListProps> = ({ userId }) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const response = await fetch(`/api/trades?userId=${userId}`);
      const data: Trade[] = await response.json();
      console.log(data);
      console.log("User ID:", userId);

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
