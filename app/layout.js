import FooterContact from "@/components/FooterContact";
import Header from "@/components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import { UserAuthProvider } from "@/context/UserAuthContext";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ecommerce-platform",
  description: "App de muestra en next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserAuthProvider>
          <ShoppingCartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <FooterContact />
          </ShoppingCartProvider>
        </UserAuthProvider>
      </body>
    </html>
  );
}