import Link from 'next/link';
import React, { FC } from 'react';
import classNames from 'classnames';

interface CustomLinkProps {
  href: string;
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
}) => {
  const baseStyles = 'link';
  const buttonStyles = 'button';
  const mergedClassName = classNames(
    asButton ? buttonStyles : baseStyles,
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={mergedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={mergedClassName}>
      {children}
    </Link>
  );
};
