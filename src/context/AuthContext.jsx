import { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserBooks = async (uid) => {
    try {
      const q = query(collection(db, 'books'), where('userId', '==', uid));
      const querySnapshot = await getDocs(q);
      const books = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserBooks(books);
    } catch (error) {
      console.error('Failed to fetch books:', error);
      toast.error('Error loading books.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) await fetchUserBooks(user.uid);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      await fetchUserBooks(userCredential.user.uid);
      toast.success('Account created successfully!');
      return userCredential.user;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(getFirebaseErrorMessage(error.code));
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      await fetchUserBooks(userCredential.user.uid);
      toast.success('Logged in successfully!');
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(getFirebaseErrorMessage(error.code));
      return null;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserBooks([]);
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout. Please try again.');
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      await fetchUserBooks(result.user.uid);
      toast.success('Google login successful!');
      return result.user;
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(getFirebaseErrorMessage(error.code));
      return null;
    }
  };

  const githubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      await fetchUserBooks(result.user.uid);
      toast.success('GitHub login successful!');
      return result.user;
    } catch (error) {
      console.error('GitHub login error:', error);
      toast.error(getFirebaseErrorMessage(error.code));
      return null;
    }
  };

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
    userBooks,
    setUserBooks,
    signup,
    login,
    logout,
    googleLogin,
    githubLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
