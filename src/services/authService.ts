import { signInWithPopup, signOut, type User } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";

export const loginWithGoogle = async (): Promise<void> => {
    await signInWithPopup(auth, googleProvider);
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};

export const getUserProfile = async (): Promise<User | null> => {
    return auth.currentUser;
};
