import { Link, NavLink, useNavigate } from 'react-router-dom'; // Added useNavigate
import { FaBook, FaUserCircle, FaMoon, FaSun, FaPlus, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { useState, useEffect, useRef } from 'react';
import AddBookForm from '../books/AddBookForm';

const Navbar = () => {
  const { currentUser, logout } = useAuth(); // Added logout from context
  const navigate = useNavigate(); // Added for navigation
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const menuRef = useRef(null);
  const formRef = useRef(null);
  const menuButtonRef = useRef(null); // Added ref for menu button
  
  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);
  
  // Initialize dark mode from localStorage
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
  }, []);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Fix 2: Check if click is on menu button
      if (menuButtonRef.current && menuButtonRef.current.contains(e.target)) {
        return;
      }
      
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      if (formRef.current && !formRef.current.contains(e.target) && isBookFormOpen) {
        setIsBookFormOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isBookFormOpen]);

  // Fix 1: Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Prevent body scroll when form is open
  useEffect(() => {
    if (isBookFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isBookFormOpen]);

  return (
    <>
      {/* Book Form Overlay - Fix 3: Added pointer-events-auto */}
      {isBookFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-start justify-center pt-16 md:pt-20 pointer-events-auto">
          <div 
            ref={formRef}
            className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-b-xl shadow-2xl animate-slideDown"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Book</h2>
              <button 
                onClick={() => setIsBookFormOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
              <AddBookForm onSuccess={() => setIsBookFormOpen(false)} />
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-indigo-800 to-purple-900 shadow-lg dark:from-gray-900 dark:to-gray-900 relative z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="bg-amber-400 p-2 rounded-lg mr-3 group-hover:rotate-12 transition-transform">
                  <FaBook className="text-xl text-indigo-900" />
                </div>
                <span className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  <span className="text-amber-300">Book</span>Shelf
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  `text-gray-200 hover:text-amber-300 transition-colors py-2 px-1 border-b-2 ${
                    isActive 
                      ? 'text-amber-300 border-amber-300 font-semibold' 
                      : 'border-transparent'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/dashboard" 
                className={({isActive}) => 
                  `text-gray-200 hover:text-amber-300 transition-colors py-2 px-1 border-b-2 ${
                    isActive 
                      ? 'text-amber-300 border-amber-300 font-semibold' 
                      : 'border-transparent'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/books" 
                className={({isActive}) => 
                  `text-gray-200 hover:text-amber-300 transition-colors py-2 px-1 border-b-2 ${
                    isActive 
                      ? 'text-amber-300 border-amber-300 font-semibold' 
                      : 'border-transparent'
                  }`
                }
              >
                Books
              </NavLink>
              
              {/* New Book Button - Desktop */}
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
            
            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Dark mode toggle */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-indigo-700 hover:bg-indigo-600 text-white transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <FaSun className="text-amber-300" /> : <FaMoon />}
              </button>
              
              {/* Mobile menu button - Fix 2: Added ref */}
              <button 
                ref={menuButtonRef}
                className="md:hidden text-white p-2"
                onClick={(e) => {
                  e.stopPropagation(); // Fix 2: Prevent event bubbling
                  setIsMenuOpen(!isMenuOpen);
                }}
                aria-label="Toggle menu"
              >
                <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </button>
              
              {/* User controls - Desktop */}
              {currentUser ? (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="relative group">
                    <div className="bg-amber-400 p-2 rounded-full">
                      <FaUserCircle className="text-xl text-indigo-900" />
                    </div>
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 invisible group-hover:visible transition-all z-10">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="font-medium text-gray-800 dark:text-gray-200">{currentUser.email}</p>
                      </div>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                      {/* Fix 1: Added onClick handler */}
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex space-x-2">
                  <Button 
                    as={Link} 
                    to="/login" 
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-800"
                    size="sm"
                  >
                    Login
                  </Button>
                  <Button 
                    as={Link} 
                    to="/signup" 
                    className="bg-amber-400 hover:bg-amber-300 text-indigo-900"
                    size="sm"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div 
              ref={menuRef}
              className="navbar-menu md:hidden bg-indigo-700 dark:bg-gray-800 rounded-lg mt-2 py-3 shadow-xl animate-fadeIn"
            >
              <div className="flex flex-col space-y-1 px-4">
                <NavLink 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({isActive}) => 
                    `py-3 px-4 rounded-lg transition-colors flex items-center ${
                      isActive 
                        ? 'bg-indigo-600 dark:bg-gray-700 text-white' 
                        : 'text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/dashboard" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({isActive}) => 
                    `py-3 px-4 rounded-lg transition-colors flex items-center ${
                      isActive 
                        ? 'bg-indigo-600 dark:bg-gray-700 text-white' 
                        : 'text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/books" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({isActive}) => 
                    `py-3 px-4 rounded-lg transition-colors flex items-center ${
                      isActive 
                        ? 'bg-indigo-600 dark:bg-gray-700 text-white' 
                        : 'text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  Books
                </NavLink>
                
                {/* New Book Button - Mobile */}
                {currentUser && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsBookFormOpen(true);
                    }}
                    className="py-3 px-4 rounded-lg transition-colors flex items-center bg-amber-400 text-indigo-900 hover:bg-amber-300"
                  >
                    <FaPlus className="mr-2" /> New Book
                  </button>
                )}
                
                {currentUser ? (
                  <>
                    <div className="border-t border-indigo-600 dark:border-gray-700 my-2"></div>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsMenuOpen(false)}
                      className="py-3 px-4 text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700 rounded-lg flex items-center"
                    >
                      <FaUserCircle className="mr-2" /> Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setIsMenuOpen(false)}
                      className="py-3 px-4 text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700 rounded-lg flex items-center"
                    >
                      Settings
                    </Link>
                    {/* Fix 1: Added onClick handler */}
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="py-3 px-4 text-left text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700 rounded-lg flex items-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="border-t border-indigo-600 dark:border-gray-700 my-2"></div>
                    <Link 
                      to="/login" 
                      onClick={() => setIsMenuOpen(false)}
                      className="py-3 px-4 text-gray-200 hover:bg-indigo-600 dark:hover:bg-gray-700 rounded-lg flex items-center"
                    >
                      Login
                    </Link>
                    <Button 
                      as={Link} 
                      to="/signup" 
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full bg-amber-400 hover:bg-amber-300 text-indigo-900 justify-center flex items-center"
                    >
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