import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DeskPilot',
  description: 'AI-assisted support desk dashboard for triaging inbound tickets.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
