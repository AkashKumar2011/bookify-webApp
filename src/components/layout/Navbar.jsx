import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBook, FaUserCircle, FaMoon, FaSun, FaPlus, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { useState, useEffect, useRef } from 'react';
import AddBookForm from '../books/AddBookForm';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const menuRef = useRef(null);
  const formRef = useRef(null);

  // Dark mode persistence
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setDarkMode(localStorage.getItem('darkMode') === 'true');
  }, []);

  // Close overlays on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      if (formRef.current && !formRef.current.contains(e.target) && isBookFormOpen) {
        setIsBookFormOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isBookFormOpen]);

  // Prevent body scrolling when form is open
  useEffect(() => {
    document.body.style.overflow = isBookFormOpen ? 'hidden' : 'auto';
  }, [isBookFormOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error: ', err);
    }
  };

  return (
    <>
      {/* Add Book Modal */}
      {isBookFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-start justify-center pt-16 md:pt-20">
          <div ref={formRef} className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-b-xl shadow-2xl animate-slideDown">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Add New Book</h2>
              <button onClick={() => setIsBookFormOpen(false)}>
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
              <AddBookForm onSuccess={() => setIsBookFormOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-800 to-purple-900 shadow-lg relative z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-amber-400 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <FaBook className="text-xl text-indigo-900" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                <span className="text-amber-300">Book</span>Shelf
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {['/', '/dashboard', '/books'].map(path => (
                <NavLink
                  key={path}
                  to={path === '/' ? '/' : path}
                  className={({ isActive }) =>
                    `text-gray-200 hover:text-amber-300 transition-colors py-2 px-1 border-b-2 ${
                      isActive ? 'text-amber-300 border-amber-300 font-semibold' : 'border-transparent'
                    }`
                  }
                >
                  {path.replace('/', '') || 'Home'}
                </NavLink>
              ))}
              {currentUser && (
                <Button
                  onClick={() => setIsBookFormOpen(true)}
                  size="sm"
                  className="ml-4 bg-amber-400 hover:bg-amber-300 text-indigo-900 flex items-center"
                >
                  <FaPlus className="mr-2" /> New Book
                </Button>
              )}
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-indigo-700 hover:bg-indigo-600 text-white"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FaSun className="text-amber-300" /> : <FaMoon />}
              </button>

              {/* Mobile Hamburger */}
              <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(prev => !prev)} aria-label="Toggle menu">
                <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <div className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>

              {/* Desktop User Controls */}
              {currentUser ? (
                <div className="hidden md:flex items-center space-x-3 group relative">
                  <div className="bg-amber-400 p-2 rounded-full">
                    <FaUserCircle className="text-xl text-indigo-900" />
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 invisible group-hover:visible transition-all z-10">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium">{currentUser.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-gray-700">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-gray-700">Settings</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-indigo-50 dark:hover:bg-gray-700">Logout</button>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex space-x-2">
                  <Button as={Link} to="/login" variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-800">Login</Button>
                  <Button as={Link} to="/signup" size="sm" className="bg-amber-400 hover:bg-amber-300 text-indigo-900">Sign Up</Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div ref={menuRef} className="md:hidden bg-indigo-700 dark:bg-gray-800 rounded-lg mt-2 py-3 shadow-xl">
              <div className="flex flex-col space-y-1 px-4">
                {['Home', 'Dashboard', 'Books'].map((label, idx) => {
                  const to = label === 'Home' ? '/' : `/${label.toLowerCase()}`;
                  return (
                    <NavLink
                      key={label}
                      to={to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `py-3 px-4 rounded-lg flex items-center ${
                          isActive ? 'bg-indigo-600 dark:bg-gray-700 text-white' : 'text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  );
                })}

                {currentUser && (
                  <button
                    onClick={() => {
                      setIsBookFormOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="py-3 px-4 rounded-lg flex items-center bg-amber-400 text-indigo-900 hover:bg-amber-300"
                  >
                    <FaPlus className="mr-2" /> New Book
                  </button>
                )}

                <div className="border-t border-indigo-600 dark:border-gray-700 my-2"></div>

                {currentUser ? (
                  <>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="py-3 px-4 flex items-center text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700">
                      <FaUserCircle className="mr-2" /> Profile
                    </Link>
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="py-3 px-4 flex items-center text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700">
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="py-3 px-4 flex items-center text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="py-3 px-4 flex items-center text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700">
                      Login
                    </Link>
                    <Button as={Link} to="/signup" onClick={() => setIsMenuOpen(false)} className="py-3 px-4 flex items-center justify-center bg-amber-400 text-indigo-900 hover:bg-amber-300">
                      <FaPlus className="mr-2" /> Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
