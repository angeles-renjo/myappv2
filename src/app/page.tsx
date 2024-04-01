import JournalTable from "@/components/JournalTable";
import TradesList from "@/components/TradesList";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <TradesList />
      <JournalTable />
    </main>
  );
}
