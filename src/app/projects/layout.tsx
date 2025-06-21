import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Yi (Cherry) Lian",
  description: "Explore Cherry's robotics and machine learning projects, including interactive robot learning frameworks and autonomous navigation systems.",
  keywords: ["robotics projects", "machine learning", "HINTeract", "SpooderMan", "autonomous robots", "SLAM", "computer vision"],
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 