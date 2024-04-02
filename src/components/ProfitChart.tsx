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
      // Ensure profitLoss is treated as a number, converting null to 0
      const profitLossValue = trade.profitLoss !== null ? trade.profitLoss : 0;
      currentAccountSize += profitLossValue;

      return {
        date: formattedDate,
        accountSize: currentAccountSize,
      };
    });
    setChartData(formattedData);
  }, [userData, tradesData, onDataUpdate]);

  return (
    <div className="profit-chart sm:w-full lg:w-1/2 w-full">
      <h1 className="text-center text-4xl tracking-widest text-white">
        PNL CHART
      </h1>
      <AreaChart
        className="h-52 w-full"
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
