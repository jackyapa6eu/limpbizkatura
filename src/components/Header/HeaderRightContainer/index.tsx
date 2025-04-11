import { HeaderAuth } from '@/components';
import { ROUTES } from '@/const/routes';
import { ModalProvider } from '@/context/modal';
import { AuthProvider } from '@/context/user';
import Link from 'next/link';
import React, { FC } from 'react';
import classNames from 'classnames';
import { MobileMenu } from './MobileMenu';
import styles from './header-right-container.module.scss';

export const HeaderRightContainer: FC = () => {
  return (
    <div className={styles.headerRightContainer}>
      <ModalProvider>
        <MobileMenu />
      </ModalProvider>
      <div className={styles.headerRightContainer__desktopContainer}>
        <nav>
          <ul className={styles.headerRightContainer__navigation}>
            <li>
              <Link className={classNames('global__link')} href={ROUTES.PHOTOS}>
                Фото с игр
              </Link>
            </li>
          </ul>
        </nav>
        <AuthProvider>
          <HeaderAuth />
        </AuthProvider>
      </div>
    </div>
  );
};
