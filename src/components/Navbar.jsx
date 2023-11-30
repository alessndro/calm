import React from 'react'
import {Link} from 'react-router-dom'
import menuIcon from '../assets/menu.svg'
import closeIcon from '../assets/close.png'

import dashboard from '../assets/trending-up.svg'
import movement from '../assets/dribbble.svg'
import nutrition from '../assets/slack.svg'
import sleep from '../assets/sunset.svg'
import morning from '../assets/sunrise.svg'
import relationships from '../assets/users.svg'
import { useAuthContext } from '../components/AuthContext.jsx';

export default function Navbar() {
  const [isMenuShown, setIsMenuShown] = React.useState(false)
  const [error, setError] = React.useState('')

  const {signout, currentUser} = useAuthContext()

  function handleToggle() {
    setIsMenuShown(prevState => !prevState)
  }

  async function handleLogOut() {
    try {
      await signout();
      // Sign-out successful, now navigate to the "/login" route
      navigate('/');
    } catch (error) {
      // Handle sign-out error
      setError('Sign-out error:', error);
    }
  };

  return (
    <>
    <div className='px-5 py-10 text-black bg-gray-100 w-full justify-between flex flex-row md:w-1/4 lg:max-w-xs md:flex-col md:items-between lg:px-10'>
        <div className='flex items-center md:items-start md:flex-col'>
        <Link to="/"><h3 className='font-black text-2xl md:text-3xl'>Calm.</h3></Link>
            
            <div className='hidden gap-2 ml-10 md:gap-4 md:ml-0 md:mt-20 flex-row sm:flex md:flex-col'>
              <div className='flex'><img className='hidden md:flex mr-4' src={dashboard} width={20} height={20}/><Link to="/"><p className='text-sm 3xl:text-lg'>Dashboard</p></Link></div>
              <div className='flex'><img className='hidden md:flex mr-4' src={sleep} width={20} height={20}/><Link to="sleep"><p className='text-sm 3xl:text-lg'>Sleep</p></Link></div>
              <div className='flex'><img className='hidden md:flex mr-4' src={movement} width={20} height={20}/><Link to="movement"><p className='text-sm 3xl:text-lg'>Movement</p></Link></div>
              <div className='flex'><img className='hidden md:flex mr-4' src={morning} width={20} height={20}/><Link to="morning"><p className='text-sm 3xl:text-lg'>Morning</p></Link></div>
              <div className='flex'><img className='hidden md:flex mr-4' src={nutrition} width={20} height={20}/><Link to="nutrition"><p className='text-sm 3xl:text-lg'>Nutrition</p></Link></div>
              <div className='flex'><img className='hidden md:flex mr-4' src={relationships} width={20} height={20}/><Link to="relationships"><p className='text-sm 3xl:text-lg'>Relationships</p></Link></div>

            </div>
        </div>
    

        {/* <Link className='hidden sm:flex' to='/signin'>
            <p className='bg-black text-white px-4 py-2 rounded-full flex justify-center'>Sign in</p>
        </Link> */}
        {currentUser ? <button className='bg-black text-white px-4 py-2 rounded-full hidden justify-center sm:flex' onClick={handleLogOut}>Sign out</button> :  <Link className='hidden sm:flex' to='/signin'>
            <p className='bg-black text-white px-4 py-2 rounded-full hidden justify-center sm:flex'>Start now</p>
        </Link> }
       {isMenuShown ? <img onClick={handleToggle} alt="close icon" width={30} height={30} className='flex sm:hidden' src={closeIcon}/> : <img onClick={handleToggle} alt="hamburger icon" width={30} height={30} className='flex sm:hidden' src={menuIcon} />}
    </div>
     {
      isMenuShown && <div>
          <div className='absolute fade-in w-full top-15 p-5 bg-white flex items-center flex-col sm:hidden'>
            <Link to="/"><p className='text-md'>Dashboard</p></Link>
            <Link to="sleep"><p className='text-md'>Sleep</p></Link>
            <Link to="movement"><p className='text-md'>Movement</p></Link>
            <Link to="morning"><p className='text-md'>Morning</p></Link>
            <Link to="nutrition"><p className='text-md'>Nutrition</p></Link>
            <Link to="relationships"><p className='text-md'>Relationships</p></Link>
          </div>
        </div>
     }
    </>
  )
}
