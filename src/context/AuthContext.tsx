import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as firebaseSignInWithEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

interface UserRole {
  isAdmin: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  createUserWithEmail: (email: string, password: string) => Promise<void>;
  setUserAsAdmin: (uid: string) => Promise<void>;
  checkIfUserIsAdmin: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (user: User) => {
    try {
      const userRoleDoc = await getDoc(doc(db, 'userRoles', user.uid));
      if (userRoleDoc.exists()) {
        setUserRole(userRoleDoc.data() as UserRole);
      } else {
        // Set default role for new users
        const defaultRole: UserRole = { isAdmin: false };
        setUserRole(defaultRole);
        await setDoc(doc(db, 'userRoles', user.uid), defaultRole);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole({ isAdmin: false });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserRole(user);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await firebaseSignInWithEmail(auth, email, password);
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const createUserWithEmail = async (email: string, password: string) => {
    try {
      await firebaseCreateUser(auth, email, password);
    } catch (error) {
      console.error('Error creating user with email:', error);
      throw error;
    }
  };

  const setUserAsAdmin = async (uid: string) => {
    try {
      await setDoc(doc(db, 'userRoles', uid), { isAdmin: true });
      if (currentUser && currentUser.uid === uid) {
        setUserRole({ isAdmin: true });
      }
    } catch (error) {
      console.error('Error setting user as admin:', error);
      throw error;
    }
  };

  const checkIfUserIsAdmin = async (): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      const userRoleDoc = await getDoc(doc(db, 'userRoles', currentUser.uid));
      return userRoleDoc.exists() && userRoleDoc.data().isAdmin === true;
    } catch (error) {
      console.error('Error checking if user is admin:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userRole,
    loading,
    signInWithGoogle,
    signInWithEmail,
    createUserWithEmail,
    setUserAsAdmin,
    checkIfUserIsAdmin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 