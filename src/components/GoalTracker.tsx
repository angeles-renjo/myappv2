// src/components/GoalTracker.tsx
import React from "react";
import { ProgressCircle } from "@tremor/react";

interface GoalTrackerProps {
  accountSize: number;
  profitLoss: number;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({
  accountSize,
  profitLoss,
}) => {
  const total = accountSize + profitLoss;
  const targetAccountSize = 1000; // Example target account size
  const progressPercentage = (total / targetAccountSize) * 100;

  // Example strokeWidth calculation. Adjust based on your design needs.
  const strokeWidth = progressPercentage > 50 ? 10 : 5;

  return (
    <div>
      <h1 className="text-center p-10 text-4xl">Goal Tracker</h1>

      <div className="text-white flex space-x-8 items-center">
        <div>
          <p>Account Size: {accountSize}</p>
          <p>Profit/Loss: {profitLoss}</p>
          <p>Total: {total}</p>
        </div>
        <div>
          <ProgressCircle
            className="stroke-green-500"
            value={progressPercentage}
            size="xl"
            color="indigo"
            strokeWidth={strokeWidth}
            showAnimation={true}
          >
            <span className="text-lg font-medium text-slate-700">
              {progressPercentage.toFixed(0)}%
            </span>
          </ProgressCircle>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;
