// src/app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import AccountSize from "@/components/AccountSize";
import JournalTable from "@/components/JournalTable";
import TradesList from "@/components/TradesList";
import { useUserId } from "@/context/UserIdContext";

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

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <TradesList trades={tradesData} />
      <JournalTable trades={tradesData} />
      <AccountSize accountSize={userData.accountSize} />
    </main>
  );
};

export default Home;
