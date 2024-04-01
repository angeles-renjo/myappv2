// ProfitChart.tsx
import React, { useEffect, useState } from "react";
import { AreaChart } from "@tremor/react";
import { Trade, User } from "@prisma/client";

interface ChartData {
  date: string;
  accountSize: number;
}

interface ProfitChartProps {
  userData: User;
  tradesData: Trade[];
  onDataUpdate: () => void;
}

export default function ProfitChart({
  userData,
  tradesData,
  onDataUpdate,
}: ProfitChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (!userData || !tradesData) return; // Exit early if data is not available

    let currentAccountSize = userData.accountSize || 0;
    const formattedData = tradesData.map((trade: Trade) => {
      const date = new Date(trade.date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
      currentAccountSize += trade.profitLoss || 0;

      return {
        date: formattedDate,
        accountSize: currentAccountSize,
      };
    });
    setChartData(formattedData);
  }, [userData, tradesData, onDataUpdate]);

  return (
    <div className="lg:flex lg:justify-center w-full profit-chart">
      <AreaChart
        className="h-80 profit-chart w-full lg:w-3/6"
        data={chartData}
        index="date"
        categories={["accountSize"]}
        showXAxis={false}
        yAxisWidth={60}
        showGridLines={false}
        showAnimation={true}
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}
