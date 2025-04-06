import React, { FC } from 'react';
import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';
import styles from './custom-button.module.scss';

interface CustomButtonProps extends ButtonProps {
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const CustomButton: FC<CustomButtonProps> = ({
  htmlType = 'button',
  type = 'default',
  children,
  onClick,
  className,
  ...btnProps
}) => {
  const buttonClass = classNames(styles.button, styles[type], className);

  const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (onClick) onClick(event);
  };

  return (
    <Button
      htmlType={htmlType}
      type={type}
      className={buttonClass}
      onClick={handleOnClick}
      {...btnProps}
    >
      {children}
    </Button>
  );
};
