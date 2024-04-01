"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Link,
} from "@nextui-org/react";
import { Trade } from "@prisma/client";
import { useUserId } from "@/context/UserIdContext"; // Adjust the import path as necessary

const columnNames = [
  "Date",
  "Pair",
  "Type",
  "ProfitLoss",
  "Risk",
  "Rules Followed",
  "Learnings",
  "View",
];

const JournalTable: React.FC = () => {
  const { userId } = useUserId();
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      if (!userId) return;
      // Replace the URL with your actual API endpoint
      const response = await fetch(`/api/trades?userId=${userId}`);
      const data: Trade[] = await response.json();
      setTrades(data);
    };

    fetchTrades();
  }, [userId]); // Depend on userId to refetch trades if it changes

  return (
    <Table className="p-10" aria-label="Journal table">
      <TableHeader>
        {columnNames.map((name, index) => (
          <TableColumn key={index}>{name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {trades.map((trade, index) => (
          <TableRow key={index}>
            <TableCell>{trade.date}</TableCell>
            <TableCell>{trade.pair}</TableCell>
            <TableCell>
              <Chip color={trade.tradeType === "LONG" ? "success" : "danger"}>
                {trade.tradeType}
              </Chip>
            </TableCell>
            <TableCell>{trade.profitLoss}</TableCell>
            <TableCell>{trade.risk}</TableCell>
            <TableCell>
              <Chip color={trade.rule === "YES" ? "success" : "danger"}>
                {trade.rule}
              </Chip>
            </TableCell>
            <TableCell className="min-w-[200px] max-w-[300px]">
              {trade.learnings}
            </TableCell>
            <TableCell>
              <Link
                isBlock
                showAnchorIcon
                href={trade.link ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                {trade.link}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JournalTable;
