
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./Providers/providers";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
          <Providers>
            {children}
          </Providers>
          <Toaster />
      </body>
      </html>
      </ClerkProvider>
  );
}
