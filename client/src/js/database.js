import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  const txtEditDb = await openDB('jate', 1);
  const txtTransaction = txtEditDb.transaction('jate', 'readwrite');
  const txtStore = txtTransaction.objectStore('jate');
  const request = txtStore.put({id: 1, value: content});
  
  const result = await request;
  console.log("Data saved to the database", result);
};


export const getDb = async () => {
  const txtEditDb = await openDB('jate', 1);
  const txtTransaction = txtEditDb.transaction('jate', 'readonly');
  const txtStore = txtTransaction.objectStore('jate');
  const request = txtStore.get(1);
  
  const result = await request;
  result ? console.log("Data saved to the database", result.value) : console.log('No data found in database.');
};

initdb();
