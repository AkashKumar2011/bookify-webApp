import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email/password
  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      toast.success('Account created successfully!');
      return userCredential.user;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(getFirebaseErrorMessage(error.code));
      throw error;
    }
  };

  // Login with email/password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      toast.success('Logged in successfully!');
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(getFirebaseErrorMessage(error.code));
      throw error;
    }
  };

  // Google login
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      toast.success('Google login successful!');
      return result.user;
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(getFirebaseErrorMessage(error.code));
      throw error;
    }
  };

  // GitHub login
  const githubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      toast.success('GitHub login successful!');
      return result.user;
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error(getFirebaseErrorMessage(error.code));
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Failed to logout. Please try again.');
      throw error;
    }
  };

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Firebase error messages
  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email is already in use. Please use a different email.';
      case 'auth/invalid-email':
        return 'Invalid email address. Please enter a valid email.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/user-not-found':
        return 'User not found. Please check your email or sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Login popup was closed. Please try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    googleLogin,
    githubLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}