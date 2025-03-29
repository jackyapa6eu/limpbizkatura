import React, { FC } from 'react';
import Link from 'next/link';
import styles from './header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0 }}>Мой Сайт</h1>
        <nav>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              gap: '1rem',
            }}
          >
            <li>
              <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
                Главная
              </Link>
            </li>
            <li>
              <a
                href="/about"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                О нас
              </a>
            </li>
            <li>
              <a
                href="/contact"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                Контакты
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
