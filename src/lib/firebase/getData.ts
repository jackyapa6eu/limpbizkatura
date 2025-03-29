import { database } from './index';
import { ref, get } from 'firebase/database';

export async function getData(path: string) {
  const dbRef = ref(database, path);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
}
