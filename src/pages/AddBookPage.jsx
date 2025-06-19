import { Link } from 'react-router-dom';
import AddBookForm from '../components/books/AddBookForm';
import { FaArrowLeft } from 'react-icons/fa';
import Button from '../components/ui/Button';

const AddBookPage = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Button 
          as={Link} 
          to="/books" 
          variant="outline" 
          className="flex items-center mb-6 text-indigo-600 hover:text-indigo-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Books
        </Button>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Book</h1>
            <AddBookForm />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add default export
export default AddBookPage;