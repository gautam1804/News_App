export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
import {auth} from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch(setUser(user));
    return { success: true, user };
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, error: error.message };
  }
};



export const logoutUser = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(clearUser());
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, error: error.message };
  }
};
