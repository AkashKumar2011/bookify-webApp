import { FaBook, FaTwitter, FaFacebook, FaInstagram, FaGithub, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-indigo-900 to-indigo-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-amber-400 p-2 rounded-lg mr-3">
                <FaBook className="text-xl text-indigo-900" />
              </div>
              <span className="text-2xl font-bold text-white">
                <span className="text-amber-300">Book</span>Shelf
              </span>
            </div>
            <p className="text-indigo-100 mb-6">
              Your ultimate platform for managing and organizing your book collection with powerful tools and insights.
            </p>
            
            <div className="flex space-x-4 mb-6">
              {[
                { icon: FaTwitter, color: "hover:text-blue-400" },
                { icon: FaFacebook, color: "hover:text-blue-600" },
                { icon: FaInstagram, color: "hover:text-pink-500" },
                { icon: FaGithub, color: "hover:text-gray-300" }
              ].map((item, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className={`text-indigo-200 hover:scale-110 transition-all ${item.color}`}
                  aria-label="Social media link"
                >
                  <item.icon className="text-xl" />
                </a>
              ))}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-amber-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-indigo-100">123 Book Street, Reading City, BK 12345</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-amber-300 mr-3 flex-shrink-0" />
                <span className="text-indigo-100">(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-amber-300 mr-3 flex-shrink-0" />
                <span className="text-indigo-100">support@bookshelf.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white border-b border-amber-400 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "Dashboard", "Books", "My Profile", "Reading Stats"].map((link, i) => (
                <li key={i}>
                  <a 
                    href="#" 
                    className="text-indigo-200 hover:text-amber-300 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white border-b border-amber-400 pb-2 inline-block">
              Resources
            </h3>
            <ul className="space-y-3">
              {["Blog", "Documentation", "Guides", "Support Center", "Community Forum"].map((link, i) => (
                <li key={i}>
                  <a 
                    href="#" 
                    className="text-indigo-200 hover:text-amber-300 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white border-b border-amber-400 pb-2 inline-block">
              Newsletter
            </h3>
            <p className="text-indigo-100 mb-4">
              Subscribe to get updates on new features and book recommendations.
            </p>
            
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-indigo-800 border border-indigo-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-white placeholder-indigo-300"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <div className="mt-6 flex items-start">
              <div className="bg-amber-400 p-2 rounded-lg mr-3 flex-shrink-0">
                <FaHeart className="text-indigo-900" />
              </div>
              <p className="text-indigo-100 text-sm">
                "BookShelf has completely transformed how I track my reading. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright and Bottom Links */}
        <div className="border-t border-indigo-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-indigo-300 mb-4 md:mb-0">
              © {currentYear} BookShelf. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((link, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="text-indigo-300 hover:text-amber-300 transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-center text-indigo-400 text-sm">
            <p className="flex items-center justify-center">
              Made with <FaHeart className="text-amber-400 mx-1" /> for book lovers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;