'use client';

import { CustomModal } from '@/components';
import { MODAL_SIZES } from '@/components/CustomModal';
import React, { FC, ReactNode, createContext, useState } from 'react';

interface ModalContextType {
  showModal: (content: ReactNode, title?: string, size?: TModalSize) => void;
  closeModal: () => void;
  updateTitle: (newTitle: string) => void;
}

export type TModalSize = (typeof MODAL_SIZES)[keyof typeof MODAL_SIZES];

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string | undefined>();
  const [modalSize, setModalSize] = useState<TModalSize>(MODAL_SIZES.AUTO);
  const showModal = (content: ReactNode, title?: string, size?: TModalSize) => {
    setModalContent(content);
    setModalTitle(title);
    setIsVisible(true);
    if (size) setModalSize(size);
  };

  const closeModal = () => {
    setIsVisible(false);
    setModalContent(null);
    setModalTitle(undefined);
    setModalSize(MODAL_SIZES.AUTO);
  };

  const updateTitle = (newTitle: string) => {
    setModalTitle(newTitle);
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal, updateTitle }}>
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
