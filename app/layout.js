import './globals.css';

export const metadata = {
  title: 'AURA RUSH — LearnIT',
  description: 'Think you have aura? Prove it. A fast, chaotic campus game by LearnIT.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
