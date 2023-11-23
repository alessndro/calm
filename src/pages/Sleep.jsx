import React from 'react'
import moon1 from '../assets/calmmoon1.png'
import moon2 from '../assets/calmmoon2.png'
import moon3 from '../assets/calmmoon3.png'
import moon4 from '../assets/calmmoon4.png'
import moon5 from '../assets/calmmoon5.png'

import wind from '../assets/wind.svg'
import trendup from '../assets/trending-up.svg'
import eyeoff from '../assets/eye-off.svg'
import send from '../assets/send.svg'



export default function Sleep() {
  return (
    <div className='p-10 w-full bg-gray-50 xl:px-20 3xl:px-40'>
      {/* First row, with 2 sections, welcome message and active users */}
      <div className='flex flex-col gap-10 mb-10 md:flex-row md:justify-around'>

          <div className='text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-14'>
            <h4 className='text-md mb-2'>Today's Check in</h4>
            <p className='text-sm'>How would you rate your sleep?</p>
            <div className='flex flex-row mt-5 gap-10 fade-in '>
              <div className=''><img className='' src={moon1} width={30} height={30}/></div>
              <div className=''><img className='' src={moon2} width={30} height={30}/></div>
              <div className=''><img className='' src={moon3} width={30} height={30}/></div>
              <div className=''><img className='' src={moon4} width={30} height={30}/></div>
              <div className=''><img className='' src={moon5} width={30} height={30}/></div>
            </div>
          </div>

          <div className='text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-14'>
            <h4 className='mb-5'>Average Sleep</h4>
            <p className='font-black text-5xl fade-in'>4.5</p>
          </div>
      </div>

       {/* Second row, with 2 sections, our story and Why Calm? */}
       <div className='flex flex-col gap-10 mb-10 md:flex-row md:justify-around'>

        <div className='text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
            <h4 className='mb-5'>Current Streak in days</h4>
            <p className='font-black text-5xl fade-in '>4</p>
          </div>

          <div className='relative text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
            <h4 className='mb-3'>Ask one of our sleeping experts</h4>
            <div>
              <div className='flex flex-col items-start justify-start mb-5'>
                <div className='bg-gray-300 rounded-lg py-2 px-4 mb-2'><p className='text-start'>Hey there, I'm Alex, Calm's sleeping expert 👋</p> <p className='text-start'>Ask me anything!</p></div>
                
              </div>
              <div className='flex py-3 px-5 bg-white rounded-full justify-between max-w-xl'>
                <input className='ml-3 outline-none' type='text' placeholder='type a message..' />
                <img className='' src={send} width={25} height={25}/>
              </div>
            </div>
            <div>
              
            </div>
            <p className='absolute bottom-5 right-10 font-black'>POWERED BY AI</p>
          </div>
      </div>

       {/* Third row, with 2 sections, testimonials and Qoute */}
       <div className='flex flex-col gap-10 mb-10 md:flex-row md:justify-around'>

        <div className='text-center bg-gray-100 flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16 fade-in '>
            <h4 className='mb-5'>Pillars of Sleep</h4>
            <div className='flex flex-row items-between gap-10'>
                
                <div className='flex flex-col items-center mb-5'>
                  <img className='' src={trendup} width={30} height={30}/>
                  <p className='text-sm mt-3'>Consistency</p>
                </div>
                
                <div className='flex flex-col items-center mb-5'>
                  <img className='' src={eyeoff} width={30} height={30}/>
                  <p className='text-sm mt-3'>Screen time</p>
                </div>
                
                <div className='flex flex-col items-center mb-5'>
                  <img className='' src={wind} width={30} height={30}/>
                  <p className='text-sm mt-3'>Breathing</p>
                </div>
            </div>
        </div>
      

          <div className='flex flex-col justify-center items-center md:w-1/2 max-w-xl px-6 py-16'>
            <h4 className='text-center max-w-md mb-5 fade-in '>"The same soil is good for men and for treesA man's health requires as many acres arm does loads of muck."</h4>
            <h4 className='text-sm'>— Henry David Thoreau</h4>
          </div>
      </div>

    </div>
  )
}
