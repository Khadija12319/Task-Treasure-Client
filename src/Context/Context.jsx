import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup,updateProfile } from "firebase/auth";
import { app } from "../../firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const Context = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const Provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const logInUser= (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }
    useEffect(()=> {
       const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () =>{
            unSubscribe();
        }
    },[])

    const logInGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, Provider);
    }

    const updateUserProfile = (displayName, photoURL) => {
        if (user) {
            updateProfile(user,{displayName:displayName,
                photoURL:photoURL})
                .then(setUser({ ...user, displayName, photoURL }))
                .catch()
        }
      };

    const authKey={user,loading,createUser,logOut,logInUser,logInGoogle, updateUserProfile,auth};
    return (
        <AuthContext.Provider value={authKey}>
            {children}
        </AuthContext.Provider>
    );
};


export default Context;