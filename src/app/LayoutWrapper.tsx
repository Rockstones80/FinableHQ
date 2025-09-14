"use client";

import { usePathname } from "next/navigation";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isSlugPage = pathname.startsWith("/blog/[slug]");

  return (
    <>
      {!isAuthPage && !isDashboardPage && isSlugPage && <Navigation />}
      {children}
      {!isAuthPage && !isDashboardPage && <Footer />}
    </>
  );
}
