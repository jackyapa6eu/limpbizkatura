'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './custom-link.module.scss';

interface CustomLinkProps extends LinkProps {
  isExternal?: boolean;
  asButton?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const CustomLink: FC<CustomLinkProps> = ({
  href,
  isExternal = false,
  asButton = false,
  className,
  children,
  ...linkProps
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const mergedClassName = classNames(
    asButton ? styles.customLink_type_button : styles.customLink_type_link,
    className,
    { [styles.customLink_active]: isActive }
  );

  if (isExternal) {
    const externalLink = typeof href === 'string' ? href : href.toString();

    return (
      <a
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className={mergedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={mergedClassName} {...linkProps}>
      {children}
    </Link>
  );
};
