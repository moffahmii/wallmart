import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/page";
import { Toaster } from "@/components/ui/sonner"
import CartContextProvider from "@/components/context/cartContext";
import Footer from "@/components/footer/Footer";

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
    // suppressHydrationWarning مهمة جداً عشان إضافات المتصفح
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <CartContextProvider>
          <NavBar />

          {/* استخدمنا flex-grow هنا عشان لو الصفحة محتواها قليل 
              يفضل الـ Footer ملزوق تحت في قاع الشاشة 
          */}
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
          <Toaster position="top-center" richColors />
        </CartContextProvider>
      </body>
    </html>
  );
}