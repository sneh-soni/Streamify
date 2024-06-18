import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Streamify",
  description: "The Live streaming app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <Head>
          <title>{metadata.title as string}</title>
          <meta name="description" content={metadata.description as string} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" sizes="any" type="image/svg+xml" href="/logo.svg" />
        </Head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="streamify-theme"
          >
            <Toaster theme="light" position="bottom-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
