// prisma/seed.ts

import prisma from "@/lib/prisma";

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      email: "dummy@example.com",
      name: "Dummy User",
    },
  });

  console.log(`Created user: ${user.name} (ID: ${user.id})`);

  // Create trades for the user
  const createResult = await prisma.trade.createMany({
    data: [
      {
        pair: "BTC/USD",
        rule: "Buy when price drops",
        risk: "Low",
        tradeType: "Long",
        profitLoss: 1000,
        date: "2023-04-01",
        userId: user.id,
      },
      {
        pair: "ETH/USD",
        rule: "Sell when price rises",
        risk: "Medium",
        tradeType: "Short",
        profitLoss: -500,
        date: "2023-04-02",
        userId: user.id,
      },
    ],
  });

  console.log(`Created ${createResult.count} trades for user ${user.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
