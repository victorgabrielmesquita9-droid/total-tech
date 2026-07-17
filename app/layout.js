import './globals.css';

export const metadata = {
  title: 'tutoriais.dev',
  description: 'Tutoriais de programação, informática, Windows e celulares.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
