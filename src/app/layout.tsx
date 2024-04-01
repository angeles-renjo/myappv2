import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserIdProvider } from "../context/UserIdContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserIdProvider>
        <body className={inter.className}>{children}</body>
      </UserIdProvider>
    </html>
  );
}
