import React, { useContext} from 'react'
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";


// Create function useAuth() to have acces to useContext in different components
const AuthContext = React.createContext()

export function useAuthContext(){
    return useContext(AuthContext)
}

export function AuthProvider({children})
{
    const [currentUser, setCurrentUser] = React.useState()
    const [loading, setLoading] = React.useState(true)

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
      }
    
    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signOut() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
