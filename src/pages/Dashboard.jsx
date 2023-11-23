import React from 'react'
import {useAuthContext} from '../components/AuthContext'
export default function Dashboard() {

  const {currentUser} = useAuthContext()
  return (
    <>
      {currentUser && <p>{currentUser.email}</p>}
      <div className=''>Dashboard</div>
    </>
  )
}
