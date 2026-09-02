import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'AURA RUSH — Campus Aura Lab',
  description: "Think you've got aura? Prove it. 25 unique challenges · ~3 minutes · solo aura challenge by LearnIT.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
