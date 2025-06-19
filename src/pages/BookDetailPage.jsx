import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaBook, FaUser, FaCalendar, FaStar } from 'react-icons/fa';
import Button from '../components/ui/Button';

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const bookRef = doc(db, 'books', bookId);
        const bookDoc = await getDoc(bookRef);
        
        if (bookDoc.exists()) {
          setBook({ id: bookDoc.id, ...bookDoc.data() });
        } else {
          setError('Book not found');
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
        <Button as="a" href="/books" variant="primary">
          Back to Books
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        as="a" 
        href="/books" 
        variant="outline" 
        className="flex items-center mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Books
      </Button>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-100 p-8 flex items-center justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
              <FaBook className="text-5xl text-gray-400" />
            </div>
          </div>
          
          <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaUser className="mr-2" />
                  <span className="text-xl">{book.author}</span>
                </div>
              </div>
              
              {book.isFavorite && (
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center">
                  <FaStar className="mr-1" /> Favorite
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 my-6 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaCalendar className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-600">Published Year</p>
                    <p className="font-medium">{book.publishedYear || 'Unknown'}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaBook className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-medium capitalize">{book.status || 'Unknown'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 my-6 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {book.description || 'No description available for this book.'}
              </p>
            </div>
            
            <div className="mt-8">
              <Button 
                as="a" 
                href={`/read/${book.id}`} 
                className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white"
              >
                Start Reading
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;