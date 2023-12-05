import React from 'react'
import moon1 from '../assets/calmmoon1.png'
import moon2 from '../assets/calmmoon2.png'
import moon3 from '../assets/calmmoon3.png'
import moon4 from '../assets/calmmoon4.png'
import moon5 from '../assets/calmmoon5.png'
import check from '../assets/check.svg'

import wind from '../assets/wind.svg'
import trendup from '../assets/trending-up.svg'
import eyeoff from '../assets/eye-off.svg'
import send from '../assets/send.svg'
import movementCoach from '../assets/movementCoach.mp4'
import movementCoachGif from '../assets/movementCoach-unscreen3.gif'
import { collection, addDoc, onSnapshot, setDoc, doc } from "firebase/firestore";
import { getDocs } from "firebase/firestore"; 
import {db} from '../firebaseConfig';
import {useAuthContext} from '../components/AuthContext'

export default function Sleep() {

  const [sleep, setSleep] = React.useState({
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
  //const [feedback, setFeedback] = React.useState('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?')

  console.log(userInput)

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
        body: `${userInput} * Provide me with a chatgpt open ai prompt. You are an expert in Sleep for Calm, a Health platform. 
        A user has a question for you and you want to provide them with supportive, pragmatic and nice feedback. `,
      })
      const data = await response.json()
      setFeedback(data.value)
    }
    fetchFeedback()
  }
  
  async function handleClick(event){
    console.log(event.target.id)
    setIsSurveyAvailable(false)
    
    // setMovement(prevMovement => {
    let newStreak = sleep.streak + 1
    
    let newCheckIns = [...sleep.checkIns, event.target.id]
      
    let total = 0
    newCheckIns.forEach((check) => {
        total = total + parseInt(check)
    })
    
    let newAverage = total / newStreak

    let newAverageFormatted = newAverage.toFixed(2)

    try {
          // Assuming 'user.email' is the email and 'element' is the element you want to use in the document ID
          let element = 'sleep'
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
        return data.user === currentUser?.email && data.element === 'sleep'
      })
      console.log(personalData)
      if (personalData.length !== 0)
      {
        console.log('inside there is data')
        setSleep(personalData[0])
      }
      else {
        setSleep({
        element: 'sleep',
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
    if (sleep.lastCheck)
    {
       
        // Check if the difference between stored last check in and current time is above 24 hours
        const lastCheckInTime = sleep.lastCheck.toDate().getTime()
        const currentTime = new Date().getTime()

        const timeDifference = currentTime - lastCheckInTime

        const twentyFourHours = 24 * 60 * 60 * 1000
        
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
    <div className='w-full h-full p-5 overflow-y-auto'>
      <div className='mx-auto max-w-9xl my-10'>
          {/* First row */}
          <div className='flex flex-col  md:flex-row gap-3 mb-3'>
            {isSurveyAvailable ? <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center p-5 md:w-1/3'>
              <h4 className='text-md mb-2'>Today's Check in</h4>
              <p className='text-sm'>How would you rate your Sleep?</p>
              <div onClick={handleClick} className='flex flex-row mt-5 gap-10 '>
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
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center p-5 md:w-2/3'>
              <p className='text-center max-w-md mb-5'>"Eat well and sleep well. That will feed your nervous system and your psyche. As you get older, you look how you feel."</p>
              <p className='text-sm'>— Francesca Annis</p>
            </div>
          </div>

          {/* Second row */}
          <div className='flex flex-col  md:flex-row gap-3'>
            
            {/* 1 column */}
            <div className='text-center flex flex-col md:w-1/2'>
                <div className='h-64 gap-3 text-center flex flex-row justify-center items-center'>
                  
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Current Streak in days</h4>
                    <p className='font-black text-5xl  '>{sleep ? sleep.streak : '0'}</p></div>
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Average Score</h4>
                    <p className='font-black text-5xl '>{sleep ? sleep.average : '0'}</p>
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
        
              <h4 className='mt-10 mb-5'>Ask one of our Sleep experts</h4>
       
              <img className='mb-5' src={movementCoachGif} width={200} height={200}/>
              <div>
                <div className='flex flex-col items-start justify-start mb-5'>
                  {feedback ? <div className='bg-gray-300 rounded-lg py-2 px-4 mb-2'><p className='text-start h-28 overflow-y-auto max-w-sm'>{feedback}</p></div> : <div className='bg-gray-300 rounded-lg py-2 px-4 mb-2'><p className='text-start w-96'>Hey there, I'm Alex, your personal Sleep expert 👋!</p> <p className='text-start'>Ask me anything!</p></div>}
                  
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
