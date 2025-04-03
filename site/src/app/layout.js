import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nine Mile Hardware | Family-Owned Hardware Store",
  description: "Nine Mile Hardware in Nine Mile Falls, WA. Tools, landscaping services, home improvement, paint, and more. Family-owned hardware store serving the local community.",
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
