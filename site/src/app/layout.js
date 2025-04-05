import { Geist_Mono } from "next/font/google";
import { StoreDataProvider } from "../lib/StoreDataContext";
import DynamicFavicon from "./components/DynamicFavicon";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nine Mile Hardware | Family-Owned Hardware Store",
  description: "Nine Mile Hardware in Nine Mile Falls, WA. Tools, landscaping services, home improvement, paint, and more. Family-owned hardware store serving the local community.",
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistMono.variable} antialiased`}
        data-long-press-delay="2000"
      >
        <StoreDataProvider>
          <DynamicFavicon />
          {children}
        </StoreDataProvider>
      </body>
    </html>
  );
}
