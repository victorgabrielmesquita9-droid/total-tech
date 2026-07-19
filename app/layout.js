import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';

const jbmono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jbmono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'tutoriais.dev — domine tecnologia, um tutorial de cada vez',
  description:
    'Tutoriais claros de programação, informática, Windows e celular. Em breve.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${jbmono.variable} ${inter.variable}`}>
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
