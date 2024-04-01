// components/TradesList.tsx
import React, { useEffect, useState } from "react";
import { Trade } from "@prisma/client";

interface TradesListProps {
  trades: Trade[];
}
const TradesList: React.FC<TradesListProps> = ({ trades }) => {
  return (
    <div>
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
