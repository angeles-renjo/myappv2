"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserIdContextProps {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserIdContext = createContext<UserIdContextProps | undefined>(undefined);

export const useUserId = () => {
  const context = useContext(UserIdContext);
  if (!context) {
    throw new Error("useUserId must be used within a UserIdProvider");
  }
  return context;
};

interface UserIdProviderProps {
  children: ReactNode;
}

export const UserIdProvider: React.FC<UserIdProviderProps> = ({ children }) => {
  // Set the initial userId to the desired value
  const [userId, setUserId] = useState<string | null>(
    "66048ddd59652ffc40704b6d"
  );

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};
