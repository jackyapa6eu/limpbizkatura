import { FirebaseError } from 'firebase/app';
import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth';
import { notification } from 'antd';
import { auth } from './index';

interface IRegister {
  email: string;
  password: string;
}

const ERROR_CODES = {
  EMAIL_EXISTS: {
    CODE: 'auth/email-already-in-use',
    TEXT: (email: string) => `${email} уже зарегистрирован`,
  },
  WEAK_PASSWORD: {
    CODE: 'auth/weak-password',
    TEXT: 'Пароль должен содержать не менее 6 символов',
  },
} as const;

export const registerWithAuth = async ({
  email,
  password,
}: IRegister): Promise<UserCredential | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case ERROR_CODES.EMAIL_EXISTS.CODE:
          notification.error({
            message: ERROR_CODES.EMAIL_EXISTS.TEXT(email),
            duration: 15,
          });
          break;
        case ERROR_CODES.WEAK_PASSWORD.CODE:
          notification.error({
            message: ERROR_CODES.WEAK_PASSWORD.TEXT,
            duration: 15,
          });
          break;
      }
      throw new Error(
        `Ошибка регистрации: ${error.message} (код: ${error.code})`
      );
    }
    throw new Error('Неизвестная ошибка регистрации');
  }
};
