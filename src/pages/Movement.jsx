import React from 'react'
import moon1 from '../assets/calmmoon1.png'
import moon2 from '../assets/calmmoon2.png'
import moon3 from '../assets/calmmoon3.png'
import moon4 from '../assets/calmmoon4.png'
import moon5 from '../assets/calmmoon5.png'
import check from '../assets/check.svg'
import shuffle from '../assets/shuffle.svg'
import settings from '../assets/settings.svg'

import wind from '../assets/wind.svg'
import trendup from '../assets/trending-up.svg'
import eyeoff from '../assets/eye-off.svg'
import send from '../assets/send.svg'
import movementCoach from '../assets/movementCoach.mp4'
import movementGif from '../assets/movement.gif'
import { collection, addDoc, onSnapshot, setDoc, doc } from "firebase/firestore";
import { getDocs } from "firebase/firestore"; 
import {db} from '../firebaseConfig';
import {useAuthContext} from '../components/AuthContext'

export default function Movement() {

  const [movement, setMovement] = React.useState({
    element: '',
    user: '',
    streak: 0,
    checkIns: [],
    lastCheck: '',
    average: 0,

  })

  const [isSurveyAvailable, setIsSurveyAvailable] = React.useState(true)
  const {currentUser} = useAuthContext()
  const [userInput, setUserInput] = React.useState('')
  const [feedback, setFeedback] = React.useState('')

  function handleChange(event){
    setUserInput(event.target.value)
  }

  async function handleSubmit(event){
    event.preventDefault()
    async function fetchFeedback() {
      const response = await fetch("https://spectacular-tartufo-1e017e.netlify.app/.netlify/functions/fetchFeedback", {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: `${userInput} * You are an expert in Movement for Calm, a Health platform. 
        A user has a question for you and you want to provide them with supportive, pragmatic and nice feedback. `,
      })
      const data = await response.json()
      setFeedback(data.value)
      setUserInput('')
    }
    fetchFeedback()
  }

  async function handleClick(event){
    console.log(event.target.id)
    setIsSurveyAvailable(false)
    console.log(movement)
    // setMovement(prevMovement => {
    let newStreak = movement.streak + 1
    
    let newCheckIns = [...movement.checkIns, event.target.id]
      
    let total = 0
    newCheckIns.forEach((check) => {
        total = total + parseInt(check)
    })
    
    let newAverage = total / newStreak

    let newAverageFormatted = newAverage.toFixed(2)

    try {
          // Assuming 'user.email' is the email and 'element' is the element you want to use in the document ID
          let element = 'movement'
          let mail = currentUser.email
          const documentRef = doc(db, 'data', `${mail}_${element}`);

           // Data you want to set or update
          const dataToUpdate = {
            element: element,
            user: mail,
            streak: newStreak,
            checkIns: newCheckIns,
            lastCheck: new Date(),
            average: newAverageFormatted,
        
          };
          await setDoc(documentRef, dataToUpdate);
    }
    catch (error) {
          console.log(error.message)
    }

      }
  
    
  // Code to keep DB insync with state used in component, if nothing in db yet, set Movement state with empty values
  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "data"), (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
      console.log(newData)
      const personalData = newData.filter((data) => {
        return data.user === currentUser?.email && data.element === 'movement'
      })
      console.log(personalData)
      if (personalData.length !== 0)
      {
        console.log('inside there is data')
        setMovement(personalData[0])
      }
      else {
        setMovement({
        element: 'movement',
        user: `${currentUser.email}`,
        streak: 0,
        checkIns: [],
        lastCheck: '',
        average: 0,
        })
      }
    }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  // Although the survey will not be compeletely synced and only when the component is rendered, using the onSnapshot would be an option. For practice sake, I choose the useEffect option
  React.useEffect(() => {
    console.log(movement)
    if (movement.lastCheck)
    {
        console.log('inside React useEffect')
        console.log(movement.lastCheck)
        // Check if the difference between stored last check in and current time is above 24 hours
        const lastCheckInTime = movement.lastCheck.toDate().getTime()
        const currentTime = new Date().getTime()

        const timeDifference = currentTime - lastCheckInTime

        const twentyFourHours = 24 * 60 * 60 * 1000
        
        console.log(timeDifference)
        console.log(twentyFourHours)
        if (timeDifference > twentyFourHours){
            setIsSurveyAvailable(true)
        }
        else {
          setIsSurveyAvailable(false)
        }
    }
    else {
      console.log('there is not movement last check')
      setIsSurveyAvailable(true)
    }
})


  return (
    <div className='w-full h-full border-yellow-500 p-5 overflow-y-auto'>
      <div className='mx-auto max-w-9xl my-10'>
          {/* First row */}
          <div className='flex flex-col  md:flex-row gap-3 mb-3'>
            {isSurveyAvailable ? <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center p-5 md:w-1/3'>
              <h4 className='text-md mb-2'>Today's Check in</h4>
              <p className='text-sm'>How would you rate your Movement?</p>
              <div onClick={handleClick} className='flex flex-row mt-5 gap-10'>
                <div id="1" className=''><img id="1" className='' src={moon1} width={30} height={30}/></div>
                <div id="2" className=''><img id="2" className='' src={moon2} width={30} height={30}/></div>
                <div id="3" className=''><img id="3" className='' src={moon3} width={30} height={30}/></div>
                <div id="4" className=''><img id="4" className='' src={moon4} width={30} height={30}/></div>
                <div id="5" className=''><img id="5" className='' src={moon5} width={30} height={30}/></div>
              </div>
            </div> : <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center p-5 md:w-1/3'>
              <h4 className='text-md mb-2'>Today's Check in</h4>
              <p className='text-sm fade-in'>Another day gone, let's go!</p>
              <img className='mt-5 fade-in' src={check} width={30} height={30}/>
            </div>}
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center md:w-2/3'>
              <p className='text-center max-w-md mb-5'>"We’ve all known people who, like monkeys, mimic whatever seems novel and flashy at the moment. But then their enthusiasm and efforts wane; they drop their projects as soon as they become too familiar or demanding."</p>
              <p className='text-sm'>— Epictetus</p>
            </div>
          </div>

          {/* Second row */}
          <div className='flex flex-col  md:flex-row gap-3'>
            
            {/* 1 column */}
            <div className='text-center flex flex-col md:w-1/2'>
                <div className='h-64 gap-3 text-center flex flex-row justify-center items-center'>
                  
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Current Streak in days</h4>
                    <p className='font-black text-5xl'>{movement ? movement.streak : '0'}</p></div>
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Average Score</h4>
                    <p className='font-black text-5xl'>{movement ? movement.average : '0'}</p>
                  </div>
                
                </div>

                <div className='h-64 bg-gray-100 text-center flex flex-col justify-center p-5 items-center mt-3'>
                      <h4 className='mb-5'>Pillars of Movement</h4>
                      <div className='flex flex-row items-between gap-10 xl:gap-20'>
                          
                          <div className='flex flex-col items-center mb-5'>
                            <img className='' src={trendup} width={30} height={30}/>
                            <p className='text-sm mt-3'>Consistency</p>
                          </div>
                          
                          <div className='flex flex-col items-center mb-5'>
                            <img className='' src={shuffle} width={30} height={30}/>
                            <p className='text-sm mt-3'>Variety</p>
                          </div>
                          
                          <div className='flex flex-col items-center mb-5'>
                            <img className='' src={settings} width={30} height={30}/>
                            <p className='text-sm mt-3'>Adaptability</p>
                          </div>
                      </div>
                </div>
            </div>

            {/* Column 2 */}
            <div className='h-100 relative bg-gray-100 text-center flex flex-col items-center p-5 md:w-1/2'>
        
              <h4 className='mt-10 mb-5'>Ask one of our Movement experts</h4>
       
              <img className='mb-5' src={movementGif} width={200} height={200}/>
              <div>
                <div className='flex flex-col items-start justify-start mb-5'>
                  {feedback ? <div className='bg-gray-300 rounded-lg py-2 px-4 mb-2'><p className='text-start h-28 overflow-y-auto max-w-sm'>{feedback}</p></div> : <div className='bg-gray-300 rounded-lg py-2 px-4 mb-2'><p className='text-start'>Hey, I'm Fredo, your personal Movement expert 👋!</p> <p className='text-start'>Ask me anything!</p></div>}
                  
                </div>
                {!feedback && <div className='mb-20'></div>}
                <div className='flex mb-5 py-3 px-5 bg-white rounded-full justify-between max-w-xl'>
                <form onSubmit={handleSubmit} className='flex justify-between w-full'>
                  <input className='ml-3 outline-none' type='text' placeholder='type a message..' value={userInput} onChange={handleChange}/>
                  <img className='' src={send} width={25} height={25}/>
                </form>
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
