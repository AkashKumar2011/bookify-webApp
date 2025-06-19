// src/components/books/BookItem.jsx
import { FaTrash, FaEdit, FaStar, FaRegStar } from 'react-icons/fa';
import Button from '../ui/Button';

const BookItem = ({ book }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
            <p className="text-gray-600 mt-1">by {book.author}</p>
          </div>
          <button className="text-amber-400 hover:text-amber-500">
            {book.isFavorite ? <FaStar className="text-xl" /> : <FaRegStar className="text-xl" />}
          </button>
        </div>
        
        {book.description && (
          <p className="mt-4 text-gray-700 line-clamp-2">{book.description}</p>
        )}
        
        {book.publishedYear && (
          <div className="mt-4 flex items-center text-gray-500 text-sm">
            <span>Published: {book.publishedYear}</span>
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between">
          <Button variant="danger" size="sm">
            <FaTrash className="mr-2" /> Delete
          </Button>
          <Button variant="secondary" size="sm">
            <FaEdit className="mr-2" /> Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;