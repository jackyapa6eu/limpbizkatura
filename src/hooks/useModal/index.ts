import { ModalContext } from '@/context/modal';
import { useContext } from 'react';

// Хук для работы с состоянием модального окна.
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      'useModal должен быть использован внутри GlobalModalProvider'
    );
  }
  return context;
};
