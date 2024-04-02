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
import TradeForm from "@/components/TradeForm.";

const Home: React.FC = () => {
  const { userId } = useUserId();
  const [userData, setUserData] = useState<any>(null); // Adjust the type based on your data structure
  const [tradesData, setTradesData] = useState<any>(null); // Adjust the type based on your data structure

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

  useEffect(() => {
    fetchData(); // Call fetchData inside useEffect
  }, [userId]);

  // Function to handle trade submission
  const handleTradeSubmit = async (trade: Omit<Trade, "id">) => {
    try {
      const response = await fetch("/api/trades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trade),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Optionally, re-fetch trades data after a new trade is submitted
      fetchData();
    } catch (error) {
      console.error("Error submitting trade:", error);
    }
  };

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
      <main className="flex flex-col items-center justify-between p-10 w-full">
        <TradeForm onSubmit={handleTradeSubmit} userId={userId as string} />
        <JournalTable trades={tradesData} />
        <div className=" flex flex-col sm:flex-row gap-10 justify-around w-full items-center">
          <GoalTracker accountSize={accountSize} profitLoss={profitLoss} />
          <ProfitChart
            userData={userData}
            tradesData={tradesData}
            onDataUpdate={() => {}}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
