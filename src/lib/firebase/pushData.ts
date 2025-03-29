import { ref, update } from 'firebase/database';
import { database } from './index';

export async function updateData(path: string, updates: any) {
  try {
    const dbRef = ref(database, path);
    await update(dbRef, updates);
    console.log('Data successfully updated!');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}
