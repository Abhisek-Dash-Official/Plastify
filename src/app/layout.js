import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PathLayout from "./components/PathLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Plastify",
  description: "BioWaste to Bioplastics",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen justify-center items-center`}
      >
        <PathLayout>{children}</PathLayout>
      </body>
    </html>
  );
}
