// app/layout.tsx
import './globals.css';
import { Inter, Josefin_Sans, Montserrat } from 'next/font/google';

// Inter for global (body)
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' }); // Add variable

// Josefin for titles
const josefin = Josefin_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-josefin' }); // Add variable

// Montserrat for paragraphs
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-montserrat' }); // Add variable

export const metadata = {
  title: 'Minimalistique',
  description: 'Landing page simple & élégante',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Apply all font variables to the html tag
    <html lang="en" className={`${inter.variable} ${josefin.variable} ${montserrat.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}