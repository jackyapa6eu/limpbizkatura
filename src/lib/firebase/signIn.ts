import { FirebaseError } from 'firebase/app';
import {
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { notification } from 'antd';

interface ISignIn {
  email: string;
  password: string;
}

const ERROR_CODES = {
  EMAIL_EXISTS: {
    CODE: 'auth/invalid-credential',
    TEXT: 'Неверный логин или пароль',
  },
} as const;

export const signInWithAuth = async ({
  email,
  password,
}: ISignIn): Promise<UserCredential | null> => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
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
            message: ERROR_CODES.EMAIL_EXISTS.TEXT,
            duration: 15,
          });
      }
      throw new Error(
        `Ошибка авторизации: ${error.message} (код: ${error.code})`
      );
    }
    throw new Error('Неизвестная ошибка авторизации');
  }
};
