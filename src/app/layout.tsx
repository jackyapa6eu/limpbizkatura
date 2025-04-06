import { Header } from '@/components';
import '@ant-design/v5-patch-for-react-19';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import React from 'react';
import '../styles/index.scss';

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Limpbizkatura',
  description: 'Вопросы с квизов',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
