import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unSuscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                setUser({ uid, email, displayName, photoURL });
            } else {
                setUser(null);
            }
        });

        return () => unSuscribe();
    });

    const registerUser = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const loginUser = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const signOutUser = () => signOut(auth);

    return (
        <UserContext.Provider
            value={{ user, setUser, registerUser, loginUser, signOutUser }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
