import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nine Mile Feed & Hardware | Under New Ownership",
  description: "Nine Mile Feed & Hardware in Nine Mile Falls, WA. Landscaping services, feed delivery, nursery services, and more. Under new ownership and soon new direction!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistMono.variable} antialiased`}
        data-long-press-delay="2000"
      >
        {children}
      </body>
    </html>
  );
}
