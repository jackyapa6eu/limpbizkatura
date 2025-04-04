import { TModalSize } from '@/context/modal';
import React, { FC, ReactNode } from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import styles from './custom-modal.module.scss';

export const MODAL_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  AUTO: 'auto',
} as const;

interface GlobalModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: TModalSize;
}

export const CustomModal: FC<GlobalModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
  size = MODAL_SIZES.AUTO,
}) => {
  const modalClasses = classNames(styles.modal, {
    [`${styles[`modal_size_${size}`]}`]: !!size,
  });

  return (
    <Modal
      title={title}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      className={modalClasses}
    >
      {children}
    </Modal>
  );
};
