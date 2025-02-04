import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// 🔹 Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyClh9xzqRbt9kCguerBuM4QGzAMJXQ4sgM",
    authDomain: "bookmarkai-fa21c.firebaseapp.com",
    projectId: "bookmarkai-fa21c",
    storageBucket: "bookmarkai-fa21c.appspot.com", // ✅ Fixed typo
    messagingSenderId: "152985826406",
    appId: "1:152985826406:web:08a73376e15f1dd5b429a7",
    measurementId: "G-5FYBY5NHKN"
};

// ✅ Prevents multiple Firebase initializations
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// 🔹 Sign in with Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user; // ✅ Returns user details
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        return null;
    }
};

// 🔹 Sign in with GitHub
export const signInWithGithub = async () => {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        return result.user; // ✅ Returns user details
    } catch (error) {
        console.error("GitHub Sign-In Error:", error);
        return null;
    }
};

// 🔹 Sign out
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Sign-Out Error:", error);
    }
};

export { auth };
