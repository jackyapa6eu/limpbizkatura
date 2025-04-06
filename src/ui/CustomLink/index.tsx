import Link, { LinkProps } from 'next/link';
import React, { FC } from 'react';
import classNames from 'classnames';

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
  const baseStyles = 'link';
  const buttonStyles = 'button';
  const mergedClassName = classNames(
    asButton ? buttonStyles : baseStyles,
    className
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
