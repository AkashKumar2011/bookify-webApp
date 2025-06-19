import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../context/AuthContext';
import { FaBook } from 'react-icons/fa';
import { useEffect } from 'react';
import Button from '../components/ui/Button';


const Login = () => {
  const navigate = useNavigate();
  const { currentUser, login, googleLogin, githubLogin } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      // Error handling is done in AuthContext
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await googleLogin();
    } catch (error) {
      // Error handling is done in AuthContext
    }
  };

  const handleGithubLogin = async (e) => {
    e.preventDefault();
    try {
      await githubLogin();
    } catch (error) {
      // Error handling is done in AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-3 rounded-full">
              <FaBook className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back to BookShelf
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in to access your book collection
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          <AuthForm 
            type="login" 
            onSubmit={handleSubmit}
            onGoogleLogin={handleGoogleLogin}
            onGithubLogin={handleGithubLogin}
          />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button 
                as="a" 
                href="/signup" 
                variant="outline" 
                className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Create a new account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;