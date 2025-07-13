"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppChat from "../ui/WhatsAppChat";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/dashboard");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="flex-1 relative">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      <WhatsAppChat />
    </>
  );
} 