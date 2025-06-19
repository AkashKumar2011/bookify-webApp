import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import BookItem from '../components/books/BookItem';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';


const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch books from Firestore (public access)
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const booksRef = collection(db, 'books');
      const booksSnapshot = await getDocs(booksRef);
      
      const booksData = booksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter and sort books
  const filteredBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === 'favorites') {
        return matchesSearch && book.isFavorite;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sort === 'newest') {
        return b.createdAt?.seconds - a.createdAt?.seconds;
      } else if (sort === 'oldest') {
        return a.createdAt?.seconds - b.createdAt?.seconds;
      } else if (sort === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Book Collection</h1>
      
      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <FaFilter className="mr-2" /> Filters
          </Button>
        </div>
        
        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            <div>
              <label className="block text-gray-700 mb-2">Filter</label>
              <div className="flex space-x-4">
                <Button 
                  variant={filter === 'all' ? 'primary' : 'outline'}
                  onClick={() => setFilter('all')}
                >
                  All Books
                </Button>
                <Button 
                  variant={filter === 'favorites' ? 'primary' : 'outline'}
                  onClick={() => setFilter('favorites')}
                >
                  Favorites
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Sort By</label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title (A-Z)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FaSort className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Books Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">No books found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? `No books match your search for "${searchTerm}"` : 'No books available yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <Link to={`/books/${book.id}`} key={book.id}>
              <BookItem book={book} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookListPage;