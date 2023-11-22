import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig.jsx'

export default function AuthRequired() {
  const [authorized, setAuthorized] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState('')

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setAuthorized(true)
        setCurrentUser(user)
      } else {
        setAuthorized(false)
        console.log('set authorized false')
      }
    });
     // Cleanup function to unsubscribe when the component is unmounted
    return () => {
      // Unsubscribe from the onAuthStateChanged listener
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, [])
    

  if (!authorized)
  {
    return <Navigate to='/login' />
  }

  return <Outlet currentUser={currentUser}/>

}
