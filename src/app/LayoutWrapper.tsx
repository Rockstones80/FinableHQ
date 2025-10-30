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
  const isBlogPage = pathname.startsWith("/blog");

  return (
    <>
      {!isAuthPage && !isDashboardPage && <Navigation />}
      {children}
      {!isAuthPage && !isDashboardPage && <Footer />}
    </>
  );
}
