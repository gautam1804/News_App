import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJyZoi1Hfx4GB4kqjvBgUSaN3fnUXBtfU",
  authDomain: "nextjsnewsapp.firebaseapp.com",
  databaseURL: "https://nextjsnewsapp-default-rtdb.firebaseio.com",
  projectId: "nextjsnewsapp",
  storageBucket: "nextjsnewsapp.appspot.com",
  messagingSenderId: "29162919471",
  appId: "1:29162919471:web:702c6f55766f2a93e098da"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Export the auth instance
export const firestore = getFirestore(app); // Export the firestore instance
const signUp = async (email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed up:', user);
    return user;
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
};

// Sign in with email and password
const signIn = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed in:', user);
    return user;
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
};

// Sign out
const signOut = async () => {
  try {
    await auth.signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Sign-out error:', error);
    throw error;
  }
};

// export { auth, signUp, signIn, signOut ,app};
export default app;


 