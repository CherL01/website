import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications | Yi (Cherry) Lian",
  description: "Academic publications and research contributions in machine learning, robotics, and network optimization from Georgia Tech and Huawei Canada.",
  keywords: ["publications", "research", "machine learning", "robotics", "ICRA", "APNET", "IEEE Network", "academic papers"],
};

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 