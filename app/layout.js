import './globals.css';

export const metadata = {
  title: 'AURA RUSH — LearnIT',
  description: 'A fast, chaotic campus aura arcade game by LearnIT.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
