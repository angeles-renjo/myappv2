// src/components/AccountSize.tsx
import { ProgressCircle } from "@tremor/react";

interface AccountSize {
  accountSize: number;
}

export const AccountSize: React.FC<AccountSize> = ({ accountSize }) => (
  <div className="mx-auto grid grid-cols-1 gap-12">
    <div className="flex justify-center">
      <ProgressCircle value={accountSize} size="lg" />
    </div>
  </div>
);
