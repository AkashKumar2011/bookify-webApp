import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Button from '../ui/Button';
import Input from '../ui/Input';

const AuthForm = ({ type, onSubmit, onGoogleLogin, onGithubLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = type === 'login';
  const title = isLogin ? 'Sign in to your account' : 'Create a new account';
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      // Error handling is done in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-2">Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          disabled={isLoading}
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-700">Password</label>
          {isLogin && (
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          )}
        </div>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          minLength={6}
          disabled={isLoading}
        />
        {!isLogin && (
          <p className="mt-2 text-sm text-gray-500">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
        )}
      </div>

      {!isLogin && (
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
          </label>
        </div>
      )}

      <div>
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              {isLogin ? 'Signing in...' : 'Creating account...'}
            </div>
          ) : isLogin ? (
            'Sign in'
          ) : (
            'Create account'
          )}
        </Button>
      </div>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="flex items-center justify-center border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={onGoogleLogin}
            disabled={isLoading}
          >
            <FaGoogle className="text-red-500 mr-2" />
            Google
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center justify-center border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={onGithubLogin}
            disabled={isLoading}
          >
            <FaGithub className="mr-2" />
            GitHub
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;