"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "./Header";
import Footer from "./Footer";

// Dynamically import WhatsAppChat with SSR disabled to prevent hydration mismatches
const WhatsAppChat = dynamic(() => import("../ui/WhatsAppChat"), {
  ssr: false,
});

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/dashboard");
  const isLoginPage = pathname === "/login";
  const shouldShowComponents = !isAdminRoute && !isLoginPage;

  return (
    <>
      {shouldShowComponents && <Header />}
      <main className="flex-1 relative">
        {children}
      </main>
      {shouldShowComponents && <Footer />}
      {shouldShowComponents && <WhatsAppChat />}
    </>
  );
} 