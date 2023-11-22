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

export default function Navbar() {
  const [isMenuShown, setIsMenuShown] = React.useState(false)

  function handleToggle() {
    setIsMenuShown(prevState => !prevState)
  }

  return (
    <>
    <div className='relative px-5 py-10 text-black bg-gray-100 w-full justify-between flex flex-row md:w-1/4 md:flex-col md:items-between lg:px-10'>
        <div className='flex items-center md:items-start md:flex-col'>
            <h3 className='font-black text-2xl md:text-3xl'>Calm.</h3>
            
            <div className='hidden gap-2 ml-10 md:gap-4 md:ml-0 md:mt-20 flex-row sm:flex md:flex-col'>
              <div className='flex'><img className='hidden md:flex mr-4' src={dashboard} width={20} height={20}/><p className='text-sm 3xl:text-lg'>Dashboard</p></div>
              <div className='flex'><img className='hidden md:flex mr-4' src={sleep} width={20} height={20}/><p className='text-sm 3xl:text-lg'>Sleep</p></div>
              <div className='flex'><img className='hidden md:flex mr-4' src={movement} width={20} height={20}/><p className='text-sm 3xl:text-lg'>Movement</p></div>
              <div className='flex'><img className='hidden md:flex mr-4' src={morning} width={20} height={20}/><p className='text-sm 3xl:text-lg'>Morning</p></div>
              <div className='flex'><img className='hidden md:flex mr-4' src={nutrition} width={20} height={20}/><p className='text-sm 3xl:text-lg'>Nutrition</p></div>
              <div className='flex'><img className='hidden md:flex mr-4' src={relationships} width={20} height={20}/><p className='text-sm 3xl:text-lg'>Relationships</p></div>

            </div>
        </div>
    

        <Link className='hidden sm:flex' to='/signin'>
            <p className='bg-black text-white px-4 py-2 rounded-full flex justify-center'>Sign in</p>
        </Link>
       {isMenuShown ? <img onClick={handleToggle} alt="close icon" width={30} height={30} className='flex sm:hidden' src={closeIcon}/> : <img onClick={handleToggle} alt="hamburger icon" width={30} height={30} className='flex sm:hidden' src={menuIcon} />}
    </div>
     {
      isMenuShown && <div>
          <div className='absolute top-15 right-20 z-2 border p-5 bg-white sm:hidden'>
            <p>Navbar</p>
            <p>Navbar</p>
            <p>Navbar</p>
            <p>Navbar</p>
          </div>
        </div>
     }
    </>
  )
}
