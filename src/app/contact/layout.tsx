import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Yi (Cherry) Lian',
  description: 'Get in touch with Yi (Cherry) Lian for robotics research collaborations, autonomous systems projects, or professional opportunities. Connect via email or social media.',
  keywords: [
    'contact', 'collaboration', 'robotics research', 'autonomous systems',
    'Yi Lian', 'Cherry Lian', 'email', 'professional networking',
    'machine learning', 'robotics engineer', 'research opportunities'
  ],
  openGraph: {
    title: 'Contact Yi (Cherry) Lian',
    description: 'Connect with Cherry for robotics research, autonomous systems projects, and professional opportunities.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Yi (Cherry) Lian',
    description: 'Connect with Cherry for robotics research and autonomous systems projects.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 