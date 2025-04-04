import React, { FC } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import styles from './custom-button.module.scss';

type ButtonType = 'primary' | 'link' | 'outlined';

interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  buttonType?: ButtonType;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const CustomButton: FC<CustomButtonProps> = ({
  type = 'button',
  buttonType = 'primary',
  onClick,
  className,
  children,
}) => {
  const buttonClass = classNames(styles.button, styles[buttonType], className);

  const handleOnClick = () => {
    if (onClick) onClick();
  };

  return (
    <Button htmlType={type} className={buttonClass} onClick={handleOnClick}>
      {children}
    </Button>
  );
};
