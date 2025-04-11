import { HeaderAuth } from '@/components';
import { HeaderRightContainer } from '@/components/Header/HeaderRightContainer';
import { ROUTES } from '@/const/routes';
import { AuthProvider } from '@/context/user';
import { CustomLink } from '@/ui';
import Image from 'next/image';
import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <CustomLink href="/">
          <Image
            src="/images/main-logo_full.svg"
            className={classNames(
              styles.header__logo,
              styles.header__logo_size_full
            )}
            width={200}
            height={35}
            alt="Логотип"
            priority
          />
          <Image
            src="/images/main-logo_small.svg"
            className={classNames(
              styles.header__logo,
              styles.header__logo_size_small
            )}
            width={55}
            height={35}
            alt="Логотип"
            priority
          />
        </CustomLink>
      </div>
      <HeaderRightContainer />
    </header>
  );
};
