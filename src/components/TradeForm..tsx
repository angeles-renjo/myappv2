// src/components/TradeForm.tsx

import React, { useState } from "react";
import { Trade } from "@prisma/client";
import {
  Dropdown,
  DropdownTrigger,
  Input,
  Button,
  DropdownItem,
  DropdownMenu,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

interface TradeFormProps {
  onSubmit: (trade: Omit<Trade, "id">) => void;
  userId: string;
}

const TradeForm: React.FC<TradeFormProps> = ({ onSubmit, userId }) => {
  const [pair, setPair] = useState("");
  const [rule, setRule] = useState("");
  const [risk, setRisk] = useState("");
  const [learnings, setLearnings] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [profitLoss, setProfitLoss] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      pair,
      rule,
      risk,
      learnings,
      tradeType,
      profitLoss,
      date,
      link,
      userId,
    });
  };

  return (
    <>
      <Popover placement="bottom" backdrop="blur">
        <PopoverTrigger>
          <Button color="warning" variant="flat">
            Open Trade Form
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-10">
            <Input
              type="text"
              label="Pair"
              placeholder="Enter pair"
              labelPlacement="outside"
              value={pair}
              onChange={(e) => setPair(e.target.value)}
            />
            <div className="flex space-x-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">{rule || "Select Rule"}</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Rule Options">
                  <DropdownItem onClick={() => setRule("YES")}>
                    YES
                  </DropdownItem>
                  <DropdownItem onClick={() => setRule("NO")}>NO</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">{risk || "Select Risk"}</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Risk Options">
                  <DropdownItem onClick={() => setRisk("1%")}>1%</DropdownItem>
                  <DropdownItem onClick={() => setRisk("2%")}>2%</DropdownItem>
                  <DropdownItem onClick={() => setRisk("3%")}>3%</DropdownItem>
                  <DropdownItem onClick={() => setRisk("4%")}>4%</DropdownItem>
                  <DropdownItem onClick={() => setRisk("5%")}>5%</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">
                    {tradeType || "Select Trade Type"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Trade Type Options">
                  <DropdownItem onClick={() => setTradeType("LONG")}>
                    LONG
                  </DropdownItem>
                  <DropdownItem onClick={() => setTradeType("SHORT")}>
                    SHORT
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Textarea
              type="text"
              label="Learnings"
              placeholder="Enter learnings"
              labelPlacement="outside"
              value={learnings}
              onChange={(e) => setLearnings(e.target.value)}
            />
            <Input
              type="number"
              label="Profit/Loss"
              placeholder="0.00"
              labelPlacement="outside"
              value={profitLoss !== null ? profitLoss.toString() : ""}
              onChange={(e) => setProfitLoss(Number(e.target.value))}
            />
            <Input
              type="date"
              label="Date"
              placeholder="Select date"
              labelPlacement="outside"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              type="text"
              label="Link"
              placeholder="Enter link"
              labelPlacement="outside"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button variant="faded" type="submit" className="mt-4">
              Submit Trade
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default TradeForm;
