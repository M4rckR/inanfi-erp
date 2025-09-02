import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import localFont from 'next/font/local';
import { ReactQueryProvider } from '@/providers/react-query'; // <--- agrega esto

const ProximaNova = localFont({
  variable: '--font-proxima-nova',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/Proxima Nova Regular.otf',
      weight: '400',
      style: 'normal',
    },
    // ...
  ],
});

export const metadata: Metadata = {
  title: 'InAnFi - InSalud ERP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${ProximaNova.variable} font-proxima-nova antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReactQueryProvider> {/* Aquí envolvemos */}
            {children}
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
