import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './firebase';
import { getAllowedEmail } from './firestore';

// Google sign-in
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if email is allowed
    const allowedEmail = await getAllowedEmail();
    if (user.email?.toLowerCase() !== allowedEmail.toLowerCase()) {
      // Sign out the user if email doesn't match
      await signOut(auth);
      throw new Error('This email is not authorized for admin access');
    }

    return user;
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    
    if (error?.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in popup was closed. Please try again.');
    }
    
    if (error?.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked. Please allow popups for this site.');
    }
    
    throw error;
  }
};

// Sign out
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Check if user is authenticated
export const isAuthenticated = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};
