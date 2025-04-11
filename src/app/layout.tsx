import { Header, SearchParamsHandler } from '@/components';
import { InitFirebase } from '@/components';
import { ModalProvider } from '@/context/modal';
import { AuthProvider } from '@/context/user';
import '@/styles/index.scss';
import '@ant-design/v5-patch-for-react-19';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import React, { Suspense } from 'react';

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Limpbizkatura</title>
      </head>
      <body className={`${robotoMono.variable}`}>
        <AuthProvider>
          <InitFirebase />
          <ModalProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <SearchParamsHandler />
            </Suspense>
          </ModalProvider>
        </AuthProvider>
        <Header />
        {children}
      </body>
    </html>
  );
}
