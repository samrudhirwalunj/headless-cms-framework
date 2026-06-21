import type { Metadata } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Headless WordPress App",
  description: "Next.js + WordPress Headless Framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}