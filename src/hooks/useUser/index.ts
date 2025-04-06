import { AuthContext } from '@/context/user';
import { useContext } from 'react';

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useModal должен быть использован внутри AuthProvider');
  }
  return context;
};
