import { HeaderAuth } from '@/components';
import { ROUTES } from '@/const/routes';
import { AuthProvider } from '@/context/user';
import { CustomLink } from '@/ui';
import React, { FC } from 'react';
import styles from './header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <CustomLink href="/">
          <div>Logo</div>
        </CustomLink>
        <nav>
          <ul className={styles.header__navigation}>
            <li>
              <CustomLink href={ROUTES.ABOUT}>О нас</CustomLink>
            </li>
            <li>
              <CustomLink href={ROUTES.CONTACTS}>Контакты</CustomLink>
            </li>
            <li>
              <CustomLink href={ROUTES.POSTS}>Посты</CustomLink>
            </li>
          </ul>
        </nav>
      </div>
      <AuthProvider>
        <HeaderAuth />
      </AuthProvider>
    </header>
  );
};
