import type { Metadata } from 'next';
import { ReactLenis } from 'lenis/react';
import localFont from 'next/font/local';
import './globals.css';
// import { GUIProvider } from '@/hooks/use-gui';

const instrumentSerif = localFont({
  variable: '--font-instrument-serif',
  src: [
    {
      path: '/../../public/fonts/Instrument_Serif/InstrumentSerif-Italic.ttf',
      style: 'italic',
    },
    {
      path: '/../../public/fonts/Instrument_Serif/InstrumentSerif-Regular.ttf',
      style: 'normal',
    },
  ],
});

const figtree = localFont({
  variable: '--font-figtree',
  src: [
    {
      path: '/../../public/fonts/Figtree/Figtree-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
    {
      path: '/../../public/fonts/Figtree/Figtree-VariableFont_wght.ttf',
      style: 'normal',
    },
  ],
});

const geistMono = localFont({
  src: [
    {
      path: '/../../public/fonts/Geist_Mono/GeistMono-VariableFont_wght.ttf',
    },
  ],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Designjoy - Design as a subscription',
  description: 'Built and recoded by Gary.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${instrumentSerif.variable} ${figtree.variable} ${geistMono.variable} antialiased`}
      >
        <ReactLenis root>
          {/* <GUIProvider>{children}</GUIProvider> */}
        </ReactLenis>
        {children}
      </body>
    </html>
  );
}
