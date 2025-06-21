import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journey Map | Yi (Cherry) Lian",
  description: "Interactive map showing Cherry's academic and professional journey across North America, from Toronto to Atlanta to San Diego.",
  keywords: ["journey map", "academic journey", "professional timeline", "Toronto", "Atlanta", "San Diego", "Georgia Tech", "Huawei Canada"],
};

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 