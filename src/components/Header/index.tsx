import { HeaderAuth } from '@/components';
import { AuthProvider } from '@/context/user';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div>
        <h1 style={{ margin: 0 }}>Мой Сайт</h1>
        <nav>
          <ul>
            <li>
              <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
                Главная
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                О нас
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                Контакты
              </Link>
            </li>
          </ul>
        </nav>

        <AuthProvider>
          <HeaderAuth />
        </AuthProvider>
      </div>
    </header>
  );
};
