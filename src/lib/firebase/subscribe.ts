import { database } from './index';
import { ref, onValue } from 'firebase/database';

export function subscribeToData(path: string, callback: (data: any) => void) {
  const dbRef = ref(database, path);

  const unsubscribe = onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback(null);
    }
  });

  // Вернуть функцию для отмены подписки
  return unsubscribe;
}
