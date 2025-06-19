import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BookListPage from './pages/BookListPage'; // Renamed for clarity
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login'; // Import dedicated Login page
import Signup from './pages/Signup'; // Import dedicated Signup page
import AddBookPage from './pages/AddBookPage'; // Import add book page
import BookDetailPage from './pages/BookDetailPage'; // Import book detail page
import './App.css'; // Import global styles

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          {/* Main content area */}
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              // Add these routes
              <Route path="/books" element={<BookListPage />} />
              <Route path="/books/:bookId" element={<BookDetailPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes - Require authentication */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/books" element={<BookListPage />} />
                <Route path="/books/add" element={<AddBookPage />} />
              </Route>
              
              {/* Fallback route for 404 pages */}
              <Route path="*" element={<div className="text-center py-20"><h1 className="text-3xl font-bold">404 - Page Not Found</h1></div>} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;