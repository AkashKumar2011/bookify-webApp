import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const AddBookForm = ({ onSuccess }) => {
  const { currentUser, setUserBooks } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    isFavorite: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error('You must be logged in to add books');
      return;
    }

    if (!formData.title.trim() || !formData.author.trim()) {
      setError('Title and author are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const bookData = {
        ...formData,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'unread',
        rating: 0,
      };

      const docRef = await addDoc(collection(db, 'books'), bookData);
      setUserBooks((prev) => [...prev, { id: docRef.id, ...bookData }]);

      setFormData({
        title: '',
        author: '',
        description: '',
        publishedYear: '',
        isFavorite: false,
      });

      toast.success('Book added successfully!');
      
      if (onSuccess) onSuccess();

    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add book. Please try again.');
      toast.error('Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Author <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Published Year</label>
        <Input
          type="number"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          min="0"
          max={new Date().getFullYear()}
          placeholder="Publication year"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Brief description of the book"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isFavorite"
          id="isFavorite"
          checked={formData.isFavorite}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, isFavorite: e.target.checked }))
          }
          className="h-4 w-4 text-primary rounded focus:ring-primary"
        />
        <label htmlFor="isFavorite" className="ml-2 text-gray-700">
          Mark as favorite
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Adding Book...
          </div>
        ) : (
          'Add to Collection'
        )}
      </Button>
    </form>
  );
};

export default AddBookForm;
