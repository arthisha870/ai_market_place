import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

/**
 * This utility is for development only. In production, admin users should
 * be created through a secure admin process.
 * 
 * Instructions:
 * 1. Call this function from the browser console
 * 2. Make sure the email and password are valid
 */
export const createAdminUser = async (email: string, password: string) => {
  try {
    // Create the user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Set the user as admin
    await setDoc(doc(db, 'userRoles', user.uid), { isAdmin: true });
    
    console.log('Admin user created successfully:', user.uid);
    return user.uid;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

/**
 * Use this to verify an existing user's login credentials
 */
export const verifyUserCredentials = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User verified successfully:', userCredential.user.uid);
    return true;
  } catch (error) {
    console.error('Error verifying user:', error);
    return false;
  }
}; 