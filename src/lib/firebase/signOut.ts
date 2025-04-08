import { FirebaseError } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { notification } from 'antd';

export const signOutAuth = async (): Promise<void> => {
  const auth = getAuth();
  try {
    await signOut(auth);
    notification.success({
      message: 'Выход выполнен успешно',
      duration: 5,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      notification.error({
        message: 'Ошибка выхода из аккаунта',
        description: `Ошибка: ${error.message} (код: ${error.code})`,
        duration: 15,
      });
      throw new Error(`Ошибка выхода: ${error.message} (код: ${error.code})`);
    }

    notification.error({
      message: 'Неизвестная ошибка выхода',
      duration: 15,
    });
    throw new Error('Неизвестная ошибка выхода');
  }
};
