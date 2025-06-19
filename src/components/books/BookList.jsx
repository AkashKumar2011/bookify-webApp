// src/components/books/BookList.jsx
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import BookItem from './BookItem';
import { FaSearch } from 'react-icons/fa';
import Button from '../ui/Button';
import { Link } from 'react-router-dom'; // ✅ Import Link for navigation

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'books'), (snapshot) => {
      setBooks(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredBooks.map(book => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>

      {/* No books found */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-8 h-8 rounded-full"></div>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No books found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? `No books match your search for "${searchTerm}"`
              : 'Your book collection is empty'}
          </p>
          <Link to="/books/add">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white">
              Add Your First Book
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookList;
