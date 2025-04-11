import { ref, update } from 'firebase/database';
import { database } from './index';

export async function updateData<T extends object>(
  path: string,
  updates: T
): Promise<void> {
  try {
    const dbRef = ref(database, path);
    await update(dbRef, updates);
    console.log('Data successfully updated!');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}
