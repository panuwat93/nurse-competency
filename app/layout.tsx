import type { Metadata } from "next";
import { K2D } from "next/font/google";
import "./globals.css";

const k2d = K2D({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-k2d",
});

export const metadata: Metadata = {
  title: "ระบบประเมินความสามารถ - โรงพยาบาลสมุทรปราการ",
  description: "ระบบประเมินความสามารถและทักษะการปฏิบัติงานในห้องผู้ป่วยหนักศัลยกรรม",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={k2d.className}>
        {children}
      </body>
    </html>
  );
}
