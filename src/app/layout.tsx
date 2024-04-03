import "./globals.css";
import { Providers } from "@/context/providers";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body>
          <Providers>
            <>{children}</>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
