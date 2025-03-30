'use client';

import { CustomModal } from '@/components';
import React, { FC, ReactNode, createContext, useState } from 'react';

interface ModalContextType {
  showModal: (content: ReactNode, title?: string) => void;
  closeModal: () => void;
}
// Инициализация контекста
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

// Провайдер для глобального контекста
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

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
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
