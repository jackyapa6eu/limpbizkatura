'use client';

import { ROUTES } from '@/const/routes';
import { MODALS_NAMES } from '@/context/modal';
import { useAuth } from '@/context/user';
import { useModal } from '@/hooks/useModal';
import { signOutAuth } from '@/lib/firebase/signOut';
import { CustomButton } from '@/ui';
import { MenuOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC, useCallback, useMemo } from 'react';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './mobile-menu.module.scss';

export const MobileMenu: FC = observer(() => {
  const { user, logOut } = useAuth();
  const { openModal } = useModal();
  const pathname = usePathname();

  const handleLoginClick = () => {
    openModal(MODALS_NAMES.SIGN_IN);
  };
  const handleLogOut = async () => {
    try {
      await signOutAuth();
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const menuOptions = useCallback(() => {
    if (user) {
      return [
        {
          key: '2',
          label: <span>{user.email}</span>,
        },
        {
          key: '3',
          label: (
            <CustomButton onClick={handleLogOut} type="primary">
              Выход
            </CustomButton>
          ),
        },
      ];
    } else
      return [
        {
          key: '2',
          label: (
            <CustomButton onClick={handleLoginClick} type="primary">
              Вход
            </CustomButton>
          ),
        },
      ];
  }, [user]);

  const menuItems = useMemo(() => {
    return [
      {
        key: '1',
        label:
          pathname === ROUTES.PHOTOS ? (
            <Link href={ROUTES.HOME}>На главную</Link>
          ) : (
            <Link href={ROUTES.PHOTOS}>Фото с игр</Link>
          ),
      },
      ...menuOptions(),
    ];
  }, [menuOptions, pathname]);

  return (
    <div className={styles.mobileMenu}>
      <Dropdown menu={{ items: menuItems }} trigger={['click']}>
        <MenuOutlined className={styles.mobileMenu__icon} />
      </Dropdown>
    </div>
  );
});
