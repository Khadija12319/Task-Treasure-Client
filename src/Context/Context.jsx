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
        return createUserWithEmailAndPassword(auth,email,password)
        .finally(() => setLoading(false));
    }

    const logInUser= (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
        .finally(() => setLoading(false));
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
        .finally(() => setLoading(false));
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
        return signInWithPopup(auth, Provider)
        .finally(() => setLoading(false));
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
            {!loading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};


export default Context;