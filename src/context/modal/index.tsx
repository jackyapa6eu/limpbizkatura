'use client';

import { CustomModal } from '@/components';
import React, { FC, ReactNode, createContext, useState } from 'react';

interface ModalContextType {
  showModal: (content: ReactNode, title?: string) => void;
  closeModal: () => void;
  updateTitle: (newTitle: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string | undefined>();

  const showModal = (content: ReactNode, title?: string) => {
    setModalContent(content);
    setModalTitle(title);
    setIsVisible(true);
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
    <ModalContext.Provider value={{ showModal, closeModal, updateTitle }}>
      {children}
      <CustomModal
        title={modalTitle}
        isVisible={isVisible}
        onClose={closeModal}
      >
        {modalContent}
      </CustomModal>
    </ModalContext.Provider>
  );
};
