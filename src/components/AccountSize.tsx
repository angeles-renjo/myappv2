import { User } from "@prisma/client";

interface AccountSizeProps {
  accountSize: User["accountSize"];
}

const AccountSize: React.FC<AccountSizeProps> = ({ accountSize }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Account Size</h1>
      <div className="text-2xl">{accountSize}</div>
    </div>
  );
};

export default AccountSize;
