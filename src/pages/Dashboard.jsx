import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookList from '../components/books/BookList';
import AddBookForm from '../components/books/AddBookForm';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaBookOpen, FaCheckCircle, FaClock, FaBars, FaTimes, FaChartLine, FaUser } from 'react-icons/fa';
import Button from '../components/ui/Button';


const Dashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('books');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  
  // Mock data for demonstration
  const readingStats = [
    { label: "Total Books", value: 24, icon: <FaBookOpen className="text-indigo-500" />, color: "from-indigo-500 to-indigo-600" },
    { label: "Completed", value: 18, icon: <FaCheckCircle className="text-green-500" />, color: "from-green-500 to-green-600" },
    { label: "In Progress", value: 6, icon: <FaClock className="text-amber-500" />, color: "from-amber-500 to-amber-600" }
  ];
  
  const recentActivity = [
    { title: "Added Atomic Habits", time: "2 hours ago" },
    { title: "Started reading Dune", time: "1 day ago" },
    { title: "Completed The Midnight Library", time: "3 days ago" }
  ];

  const dashboardTabs = [
    { id: 'books', label: 'Your Books', icon: <FaBookOpen /> },
    { id: 'reading', label: 'Reading List', icon: <FaClock /> },
    { id: 'stats', label: 'Reading Stats', icon: <FaChartLine /> }
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-indigo-800 to-purple-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={() => setMobileMenuOpen(true)} className="mr-4">
            <FaBars className="text-xl" />
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <div className="bg-indigo-700 p-2 rounded-full">
          <FaUser />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="bg-white w-4/5 h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">BookShelf</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <FaTimes className="text-gray-500 text-xl" />
              </button>
            </div>
            
            <div className="space-y-6">
              {dashboardTabs.map(tab => (
                <button
                  key={tab.id}
                  className={`flex items-center w-full p-3 rounded-lg ${
                    activeTab === tab.id 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
              
              <Button 
                className="w-full flex items-center justify-center mt-8"
                onClick={() => {
                  setShowAddBookForm(true);
                  setMobileMenuOpen(false);
                }}
              >
                <FaPlus className="mr-2" /> Add New Book
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Reading Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {currentUser?.email || 'Book Lover'}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => setShowAddBookForm(true)}
              className="flex items-center"
              size="lg"
            >
              <FaPlus className="mr-2" /> Add New Book
            </Button>
          </div>
        </div>
        
        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {readingStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm sm:text-base">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className="bg-indigo-100 p-2 sm:p-3 rounded-xl">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${stat.color} h-2 rounded-full`} 
                    style={{ width: `${(stat.value / 24) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Books Section */}
          <div className={`w-full ${showAddBookForm ? 'lg:w-2/3' : 'lg:w-full'}`}>
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
              {/* Tabs - Desktop */}
              <div className="hidden md:flex border-b border-gray-200 mb-6">
                {dashboardTabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`py-2 px-4 font-medium flex items-center ${
                      activeTab === tab.id 
                        ? 'text-indigo-600 border-b-2 border-indigo-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Mobile Tab Selector */}
              <div className="md:hidden mb-6">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {dashboardTabs.map(tab => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <BookList />
            </div>
          </div>
          
          {/* Right Column - Add Book Form & Activity */}
          {showAddBookForm && (
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Add New Book</h2>
                  <button 
                    onClick={() => setShowAddBookForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                <AddBookForm onSuccess={() => setShowAddBookForm(false)} />
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <ul className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-indigo-100 p-2 rounded-full mr-3 mt-1">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-2 h-2 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.title}</p>
                        <p className="text-gray-500 text-sm">{activity.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                >
                  View All Activity
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Floating Add Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-30 md:hidden">
        <button
          onClick={() => setShowAddBookForm(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-800 transition-all"
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;