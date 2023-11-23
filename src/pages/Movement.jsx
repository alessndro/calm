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
import movementCoach from '../assets/movementCoach.mp4'
import movementCoachGif from '../assets/movementCoach-unscreen3.gif'

export default function Movement() {
  return (
    <div className='w-full h-full border-yellow-500 p-5 overflow-y-auto'>
      <div className='mx-auto max-w-9xl my-10'>
          {/* First row */}
          <div className='flex flex-col  md:flex-row gap-3 mb-3'>
            
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center p-5 md:w-1/3'>
              <h4 className='text-md mb-2'>Today's Check in</h4>
              <p className='text-sm'>How would you rate your Movement?</p>
              <div className='flex flex-row mt-5 gap-10 fade-in'>
                <div className=''><img className='' src={moon1} width={30} height={30}/></div>
                <div className=''><img className='' src={moon2} width={30} height={30}/></div>
                <div className=''><img className='' src={moon3} width={30} height={30}/></div>
                <div className=''><img className='' src={moon4} width={30} height={30}/></div>
                <div className=''><img className='' src={moon5} width={30} height={30}/></div>
              </div>
            </div>
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center md:w-2/3'>
                B
            </div>
          </div>

          {/* Second row */}
          <div className='flex flex-col  md:flex-row gap-3'>
            
            {/* 1 column */}
            <div className='text-center flex flex-col md:w-1/2'>
                <div className='h-64 gap-3 text-center flex flex-row justify-center items-center'>
                  
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Current Streak in days</h4>
                    <p className='font-black text-5xl fade-in '>4</p></div>
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Average Sleep</h4>
                    <p className='font-black text-5xl fade-in'>4.5</p>
                  </div>
                
                </div>

                <div className='h-64 bg-gray-100 text-center flex flex-col justify-center p-5 items-center mt-3'>
                      <h4 className='mb-5'>Pillars of Sleep</h4>
                      <div className='flex flex-row items-between gap-10 xl:gap-20'>
                          
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
            </div>

            {/* Column 2 */}
            <div className='h-100 relative bg-gray-100 text-center flex flex-col items-center p-5 md:w-1/2'>
        
              <h4 className='mb-3'>Ask one of our sleeping experts</h4>
       
              <img className='my-5' src={movementCoachGif} width={200} height={200}/>
              <div>
                <div className='flex flex-col items-start justify-start mb-5'>
                  <div className='bg-gray-300 rounded-lg py-2 px-4 mb-2'><p className='text-start'>Hey there, I'm Alex, Calm's sleeping expert 👋</p> <p className='text-start'>Ask me anything!</p></div>
                  
                </div>
                <div className='mb-20'></div>
                <div className='flex mb-5 py-3 px-5 bg-white rounded-full justify-between max-w-xl'>
                  <input className='ml-3 outline-none' type='text' placeholder='type a message..' />
                  <img className='' src={send} width={25} height={25}/>
                </div>
              </div>
              <div>
                
              </div>
              <p className='absolute bottom-2 right-5 font-black'>POWERED BY AI</p>
            
            </div>
          </div>




      </div>
    

    </div>

    
  )
}
