import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hackwave | Join the Movement",
  description: "where the boldest builders come to play",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=archivo@100,101,200,201,300,301,400,401,500,501,600,601,700,701,800,801,900,901,1,2&f[]=clash-display@200,300,400,500,600,700,1&f[]=melodrama@300,400,500,600,700,1&f[]=boska@200,201,300,301,400,401,500,501,700,701,900,901&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased ${hostGrotesk.className}`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
