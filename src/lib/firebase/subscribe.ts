import { onValue, ref } from 'firebase/database';
import { database } from './index';

export function subscribeToData<T>(
  path: string,
  callback: (data: T | null) => void
): () => void {
  const dbRef = ref(database, path);

  const unsubscribe = onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val() as T);
    } else {
      callback(null);
    }
  });

  return unsubscribe;
}
