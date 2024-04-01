// src/app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { AccountSize } from "@/components/AccountSize";
import JournalTable from "@/components/JournalTable";
import { useUserId } from "@/context/UserIdContext";
import ProfitChart from "@/components/ProfitChart";
import { TurnOffDefaultPropsWarning } from "@/components/TurnOffDefaultPropsWarning";
import { Trade } from "@prisma/client";
import GoalTracker from "@/components/GoalTracker";

const Home: React.FC = () => {
  const { userId } = useUserId();
  const [userData, setUserData] = useState<any>(null); // Adjust the type based on your data structure
  const [tradesData, setTradesData] = useState<any>(null); // Adjust the type based on your data structure

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        // Fetch user data
        const userResponse = await fetch(`/api/user?userId=${userId}`);
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch trades data
        const tradesResponse = await fetch(`/api/trades?userId=${userId}`);
        const tradesData = await tradesResponse.json();
        setTradesData(tradesData);
      }
    };

    fetchData();
  }, [userId]);

  if (!userData || !tradesData) {
    return <div>Loading...</div>;
  }

  const accountSize = userData?.accountSize || 0; // Adjust based on your actual data structure
  const profitLoss =
    tradesData?.reduce(
      (sum: number, trade: Trade) => sum + (trade.profitLoss ?? 0),
      0
    ) || 0; //

  return (
    <>
      <TurnOffDefaultPropsWarning />
      <main className="flex flex-col items-center justify-between p-24">
        <JournalTable trades={tradesData} />
        <GoalTracker accountSize={accountSize} profitLoss={profitLoss} />
        <ProfitChart
          userData={userData}
          tradesData={tradesData}
          onDataUpdate={() => {}}
        />
      </main>
    </>
  );
};

export default Home;
