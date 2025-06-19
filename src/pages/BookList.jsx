import BookList from '../components/books/BookList';
import { useAuth } from '../context/AuthContext';

const BookListPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Book Collection</h1>
        <p className="text-gray-600">Hello, {currentUser?.email}</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <BookList />
      </div>
    </div>
  );
};

export default BookListPage;