import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { FaArrowRight, FaBookOpen, FaUsers, FaChartLine, FaStar } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center bg-indigo-700/30 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
              <FaStar className="text-amber-300 mr-2" />
              <span>Trusted by thousands of readers</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Reading Experience
            </h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Organize, track, and share your book collection with our intuitive platform designed for book lovers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                as={Link} 
                to="/signup" 
                size="lg" 
                className="bg-amber-400 hover:bg-amber-300 text-indigo-900 shadow-lg shadow-amber-400/30"
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
              >
                <span className="flex items-center">
                  Watch Demo 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
          
          {/* Book showcase */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4].map((item) => (
                  <div key={item} className="bg-gradient-to-br from-indigo-500 to-purple-600 h-32 rounded-lg shadow-lg transform rotate-1 hover:rotate-0 transition-transform"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Everything You Need for Your Book Journey</h2>
            <p className="text-gray-600">
              Powerful tools designed to enhance your reading experience and connect you with fellow book lovers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <div className="bg-amber-100 text-amber-600 p-4 rounded-xl w-16 h-16 flex items-center justify-center mx-auto">
                  <FaBookOpen className="text-2xl" />
                </div>,
                title: "Book Management",
                desc: "Easily add, edit, and organize your book collection with our intuitive interface."
              },
              {
                icon: <div className="bg-indigo-100 text-indigo-600 p-4 rounded-xl w-16 h-16 flex items-center justify-center mx-auto">
                  <FaUsers className="text-2xl" />
                </div>,
                title: "Community Sharing",
                desc: "Share your collection with friends and discover new books from our vibrant community."
              },
              {
                icon: <div className="bg-purple-100 text-purple-600 p-4 rounded-xl w-16 h-16 flex items-center justify-center mx-auto">
                  <FaChartLine className="text-2xl" />
                </div>,
                title: "Reading Insights",
                desc: "Track your reading progress and set personal goals with detailed statistics."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                {feature.icon}
                <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl text-indigo-400 mb-4">“</div>
            <p className="text-xl text-gray-700 italic mb-6">
              BookShelf has completely transformed how I organize and track my reading. I've discovered so many new books through the community features!
            </p>
            <div className="flex items-center justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="ml-4 text-left">
                <h4 className="font-bold text-gray-800">Sarah Johnson</h4>
                <p className="text-gray-600">Book Blogger & Avid Reader</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-indigo-700 to-purple-800 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Reading Experience?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of book lovers who are already organizing their collections with BookShelf.
            </p>
            <Button 
              as={Link} 
              to="/signup" 
              size="lg"
              className="bg-amber-400 hover:bg-amber-300 text-indigo-900 shadow-lg shadow-amber-400/30"
            >
              Create Your Free Account <FaArrowRight className="ml-2" />
            </Button>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-indigo-200">
              <div className="flex items-center">
                <FaStar className="text-amber-300 mr-1" />
                <FaStar className="text-amber-300 mr-1" />
                <FaStar className="text-amber-300 mr-1" />
                <FaStar className="text-amber-300 mr-1" />
                <FaStar className="text-amber-300 mr-2" />
                <span>4.9/5 from 2,000+ readers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;