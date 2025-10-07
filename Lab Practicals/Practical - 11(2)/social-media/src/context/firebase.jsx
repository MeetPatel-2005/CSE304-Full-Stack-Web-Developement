import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCunEef3kziYNN8h9Yeg_V4LBZMiwUfjTk",
    authDomain: "practical11-59151.firebaseapp.com",
    projectId: "practical11-59151",
    storageBucket: "practical11-59151.firebasestorage.app",
    messagingSenderId: "136560654536",
    appId: "1:136560654536:web:c3d9469670e7d33195cdfd",
    measurementId: "G-3L8KNEVT0V"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    };

    const loginUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    const signinWithGoogle = () => {
        return signInWithPopup(firebaseAuth, googleProvider);
    };

    const logoutUser = () => {
        return signOut(firebaseAuth);
    };
    
    // Function to add user doc to Firestore
    const ensureUserDoc = async (user) => {
        const userRef = doc(firestore, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName || 'Anonymous',
                email: user.email,
                photoURL: user.photoURL || `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(user.uid)}`,
                createdAt: new Date(),
            });
        }
    };
    
    const updateUserProfileInfo = (user, profile) => {
        return updateProfile(user, profile);
    };


    const isLoggedIn = user !== null;

    const value = {
        user,
        isLoggedIn,
        firestore,
        auth: firebaseAuth,
        signupUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        signinWithGoogle,
        logoutUser,
        ensureUserDoc,
        updateUserProfileInfo,
    };

    return (
        <FirebaseContext.Provider value={value}>
            {props.children}
        </FirebaseContext.Provider>
    );
};