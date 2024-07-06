
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './../components/Navbar';
import AuthProvider from './../components/AuthProvider';
import Mobnav from './../components/Mobnav';

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
      <body className={inter.className}>
        <AuthProvider>
          <main className=" block">
          <Navbar />
            {children}
            <div className="sm:hidden flex">
              <Mobnav/>
            </div>
          </main>
          </AuthProvider>
      </body>
    </html>
  );
}
