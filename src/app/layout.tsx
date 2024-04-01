import "./globals.css";
import { UserIdProvider } from "@/context/UserIdContext";
import { Providers } from "@/context/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <UserIdProvider>{children}</UserIdProvider>
        </Providers>
      </body>
    </html>
  );
}
