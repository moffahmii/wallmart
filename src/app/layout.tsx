import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/page";
import { Toaster } from "@/components/ui/sonner"
import CartContextProvider from "@/components/context/cartContext";
import Footer from "@/components/footer/Footer";
import MySessionProvider from "@/components/mySessionProvider/MySessionProvider";
import WishlistFloatButton from "@/app/(pages)/wishlist/wishlistButtons/WishlistFloatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WallMart | Premium E-commerce Store",
  description: "Shop the latest products with the best prices at WallMart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <MySessionProvider>
          <CartContextProvider>
            <NavBar />
            <main className="fgrow">
              {children}
              <WishlistFloatButton />
            </main>
            <Footer />
            <Toaster position="top-center" richColors />
          </CartContextProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}