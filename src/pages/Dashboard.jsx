import React from 'react'
import {useAuthContext} from '../components/AuthContext'
import shield from '../assets/shield.svg'
export default function Dashboard() {

  // When user is logged in showcase, element and average
  const [showCaseElement, setShowCaseElement] = React.useState({element:'Sleep', average: '0'})
  const [badges, setBadges] = React.useState(['newUser'])
  
  const achievements = badges.map((badge) => {
    return <div className='flex flex-row items-between gap-10'>
      <div>
        <h3></h3>
      </div>
      <div className='flex flex-col items-center mb-5'>
        <img className='' src={shield} width={50} height={50}/>
        <p className='text-sm mt-3'>New User</p>
      </div>
      <div>
        <h3></h3>
      </div>
    </div>
  })



  const {currentUser} = useAuthContext()
  return (<>
    {!currentUser ? <div className='p-10 w-full bg-gray-50 xl:px-20 3xl:px-40'>
      {/* First row, with 2 sections, welcome message and active users */}
      <div className='flex flex-col gap-10 mb-10 md:flex-row md:justify-around'>

          <div className='text-center flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
            <h4 className='text-md'>Welcome to Calm.</h4>
            <h4 className='text-md fade-in'>Your simple and effective Health Dashboard</h4>
          </div>

          <div className='text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl p-6'>
            <h4 className='mb-5'>Active users</h4>
            <p className='font-black text-5xl fade-in'>1000+</p>
          </div>
      </div>

       {/* Second row, with 2 sections, our story and Why Calm? */}
       <div className='flex flex-col gap-10 mb-10 md:flex-row md:justify-around'>

          <div className='bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
            <h4 className='mb-5'>Our story</h4>
            <p className='text-sm text-center max-w-md fade-in '>Calm was crafted to seamlessly integrate tranquility into everyday life, providing a simple, effective, and science-based solution for holistic wellbeing.</p>
          </div>

          <div className='text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl p-6'>
            <h4 className='mb-5'>Why use Calm?</h4>
            <p className='text-sm text-center max-w-md fade-in '>Calm was crafted to seamlessly integrate tranquility into everyday life, providing a simple, effcetive, and science-based solution for holistic wellbeing.</p>
            <div>
              
            </div>
          </div>
      </div>

       {/* Third row, with 2 sections, testimonials and Qoute */}
       <div className='flex flex-col gap-10 mb-10 md:flex-row md:justify-around'>

        <div className='text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
            <h4 className='mb-5'>Testimonials</h4>
            <p className='text-sm text-center max-w-md fade-in '>Calm was crafted to seamlessly integrate tranquility into everyday life, providing a simple, effcetive, and science-based solution for holistic wellbeing.</p>
          </div>
      

          <div className='flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
            <h4 className='text-center max-w-md mb-5 fade-in '>"The same soil is good for men and for trees. A man's health requires as many acres of meadow to his prospect as his farm does loads of muck."</h4>
            <h4 className='text-sm'>— Henry David Thoreau</h4>
          </div>
      </div>

    </div> : 
    <div className='p-10 w-full bg-gray-50 xl:px-20 3xl:px-40'>
    {/* First row, with 2 sections, welcome message and active users */}
    <div className='flex flex-col gap-10 mb-10 md:flex-row md:justify-around'>

        <div className='text-center flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
          <h4 className='text-md'>Welcome back, {currentUser.email} 🚀</h4>
          <h4 className='text-md fade-in '>Good to see you again!</h4>
        </div>

        <div className='text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl p-6'>
          <h4 className='mb-5'>{showCaseElement.element}</h4>
          <p className='font-black text-5xl fade-in '>{showCaseElement.average}</p>
        </div>
    </div>

     {/* Second row, with 2 sections, our story and Why Calm? */}
     <div className='flex flex-col gap-10 mb-10 md:flex-row md:justify-around'>

        <div className='bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
          <h4 className='mb-5'>Total Health score</h4>
          <p className='font-black text-5xl fade-in '>4.6</p>
        </div>

        <div className='text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl p-6'>
          <h4 className='mb-5'>Recommendations</h4>
          <p className='text-sm text-center max-w-md overflow-y-auto h-28 fade-in '>Hi there! You've been scoring well on sleep Good job! You're movement could be better. You could consider a morning routine before you go to work or study. There are certain elments that you should have considered before, such as night life ine amsterdam. You have cat. but what if you dont you know? there are so many options to dit it. But what now? Focus on these steps and you will make it men</p>
          <div>
            
          </div>
        </div>
    </div>

     {/* Third row, with 2 sections, testimonials and Qoute */}
     <div className='flex flex-col gap-10 mb-10 md:flex-row md:justify-around'>

      <div className='text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
          <h4 className='mb-5'>Achievements</h4>
          <div className='fade-in '>{achievements}</div>
        </div>
    

        <div className='flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
          <h4 className='text-center max-w-md mb-5 fade-in '>"The same soil is good for men and for trees. A man's health requires as many acres of meadow to his prospect as his farm does loads of muck."</h4>
          <h4 className='text-sm'>— Henry David Thoreau</h4>
        </div>
    </div>

  </div>  }
  </>
  )
}
