'use client';

import { AuthForm, CustomModal } from '@/components';
import { MODAL_SIZES } from '@/components/CustomModal';
import React, { FC, ReactNode, createContext, useState } from 'react';

interface ModalContextType {
  showModal: (content: ReactNode, title?: string, size?: TModalSize) => void;
  closeModal: () => void;
  updateTitle: (newTitle: string) => void;
  openModal: (modalName: keyof typeof MODALS_NAMES) => void;
}

// Обновляется только этот объект.
export const MODALS_DICTIONARY = {
  SIGN_IN: {
    component: <AuthForm signIn={true} />,
    title: 'Вход',
    size: MODAL_SIZES.SMALL,
  },
  SIGN_UP: {
    component: <AuthForm />,
    title: 'Регистрация',
    size: MODAL_SIZES.SMALL,
  },
} as const;

const modalKeys = Object.keys(
  MODALS_DICTIONARY
) as (keyof typeof MODALS_DICTIONARY)[];

export const MODALS_NAMES = modalKeys.reduce(
  (acc, key) => {
    acc[key] = key;
    return acc;
  },
  {} as Record<(typeof modalKeys)[number], (typeof modalKeys)[number]>
);

export type TModalSize = (typeof MODAL_SIZES)[keyof typeof MODAL_SIZES];

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string | undefined>();
  const [modalSize, setModalSize] = useState<TModalSize>(MODAL_SIZES.AUTO);

  const openModal = (
    modalName: keyof typeof MODALS_NAMES,
    title?: string,
    size?: TModalSize
  ) => {
    const {
      component,
      title: modalTitle,
      size: modalSize,
    } = MODALS_DICTIONARY[modalName];
    showModal(component, title ?? modalTitle, size ?? modalSize);
  };

  const showModal = (content: ReactNode, title?: string, size?: TModalSize) => {
    setModalContent(content);
    setModalTitle(title);
    setIsVisible(true);
    if (size) setModalSize(size);
    else setModalSize(MODAL_SIZES.AUTO);
  };

  const closeModal = () => {
    setIsVisible(false);
    setModalContent(null);
    setModalTitle(undefined);
  };

  const updateTitle = (newTitle: string) => {
    setModalTitle(newTitle);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, updateTitle, openModal }}
    >
      {children}
      <CustomModal
        title={modalTitle}
        isVisible={isVisible}
        onClose={closeModal}
        size={modalSize}
      >
        {modalContent}
      </CustomModal>
    </ModalContext.Provider>
  );
};
