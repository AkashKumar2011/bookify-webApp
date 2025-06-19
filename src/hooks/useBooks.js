import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export function useBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'books'), (snapshot) => {
      setBooks(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, []);

  const addBook = async (book) => {
    await addDoc(collection(db, 'books'), book);
  };

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, 'books', id));
  };

  return { books, addBook, deleteBook };
}