import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig.jsx'

export default function AuthRequired() {
  const [currentUser, setCurrentUser] = React.useState()
  
  console.log(currentUser)
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
        console.log(currentUser)
    })

    return unsubscribe
}, [])

  
  if (!currentUser)
  {
    return <Navigate to='/signin' />
  }

  return <Outlet currentUser={currentUser}/>

}
