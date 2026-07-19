import './globals.css';
import CustomCursor from '@/components/CustomCursor';

export const metadata = {
  title: 'tutoriais.dev',
  description: 'Tutoriais de programação, informática, Windows e celulares.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="grain" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
