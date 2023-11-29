import React from 'react'
import {useAuthContext} from '../components/AuthContext'
import shield from '../assets/shield.svg'
import wind from '../assets/wind.svg'
import trendup from '../assets/trending-up.svg'
import eyeoff from '../assets/eye-off.svg'
import send from '../assets/send.svg'
import { collection, addDoc, onSnapshot, setDoc, doc } from "firebase/firestore";
import { getDocs } from "firebase/firestore"; 
import {db} from '../firebaseConfig';

export default function Dashboard() {

  // When user is logged in showcase, element and average
  const [showCaseElement, setShowCaseElement] = React.useState({element:'Sleep', average: '0'})
  const [badges, setBadges] = React.useState(['newUser'])
  const [recommendations, setRecommendations] = React.useState('')

  const [lowestScore, setLowestScore] = React.useState('')
  const [highestScore, setHighestScore] = React.useState('')
  const [totalAverageScore, setTotalAverageScore] = React.useState('')
  const [showCaseRecom, setShowCaseRecom] = React.useState(false)
  
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
    
  // Code to keep DB insync with state used in component, if nothing in db yet, set Movement state with empty values
  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "data"), (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
      const personalData = newData.filter((data) => {
        return data.user === currentUser?.email
      })
      console.log(personalData)
      if (personalData.length > 0)
      {
        console.log('inside if')
        let totalAverage = 0.00
        let amountElements = personalData.length
        let lowestObject = {name: 'lowest', average: 5.00}
        let highestObject = {name: 'highest', average: 0.00}

        personalData.forEach((arrayItem) => {
          if (parseInt(arrayItem.average, 10) > highestObject.average)
          {
              highestObject = arrayItem
          }
          if (parseInt(arrayItem.average, 10) < lowestObject.average)
          {
              lowestObject = arrayItem
          }
          totalAverage = totalAverage + parseInt(arrayItem.average, 10)
        })
        setShowCaseRecom(true)
        setLowestScore(lowestObject)
        setHighestScore(highestObject)
        setTotalAverageScore((totalAverage / amountElements).toFixed(2))
      }
        
    })

    return () => {
      unsubscribe()
    }
  }, [])

  React.useEffect(() => {
    if (setShowCaseRecom) { 
      async function fetchRecommendation() {
      const response = await fetch("https://spectacular-tartufo-1e017e.netlify.app/.netlify/functions/openAI", {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: `The user scores highest on ${highestScore.element} with a score of ${highestScore.average}. 
        The user scores the lowest on ${lowestScore.element} with a score of ${lowestScore.average}`,
      })
      const data = await response.json()
      setRecommendations(data.value)
    }
    fetchRecommendation();}
  }, [lowestScore])

  const {currentUser} = useAuthContext()
  
  if (currentUser)
  {
  return (
    <div className='w-full h-full p-5 overflow-y-auto'>
      <div className='mx-auto max-w-9xl my-10'>
          {/* First row */}
          <div className='flex flex-col  md:flex-row gap-3 mb-3'>
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center p-5 md:w-1/3'>
              <h4 className='text-md'>Welcome back, {currentUser.email} 🚀</h4>
              <p className='text-md fade-in '>Good to see you again!</p>
            </div>
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center md:w-2/3'>
            
            <p className='text-center max-w-md mb-5 fade-in '>"The same soil is good for men and for trees. A man's health requires as many acres of meadow to his prospect as his farm does loads of muck."</p>
              <h4 className='text-sm'>— Henry David Thoreau</h4>
            </div>
          </div>

          {/* Second row */}
          <div className='flex flex-col  md:flex-row gap-3'>
            
            {/* 1 column */}
            <div className='text-center flex flex-col md:w-1/2'>
                <div className='h-64 gap-3 text-center flex flex-row justify-center items-center'>
                  
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Totale Health Score</h4>
                    <p className='font-black text-5xl fade-in '>{totalAverageScore ? totalAverageScore : 0}</p></div>
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-2'>Highest Score</h4>
                    <p className='text-gray-800 fade-in mb-3'>{highestScore.element ? highestScore.element : ""}</p>
                    <p className='font-black text-5xl fade-in'>{highestScore.average ? highestScore.average : 0}</p>
                  </div>
                
                </div>

                <div className='h-64 bg-gray-100 text-center flex flex-col justify-center p-5 items-center mt-3'>
                  <h4 className='mb-5'>Achievements</h4>
                  <div className='fade-in '>{achievements}</div>
                </div>
            </div>

            {/* Column 2 */}
            <div className='h-100 relative bg-gray-100 text-center flex flex-col items-center justify-center p-5 md:w-1/2'>
        
        
              <h4 className='mb-3'>Recommendations</h4>
              {recommendations ? <ol className='fade-in max-w-sm'>{recommendations}</ol> : <p className='fade-in max-w-sm'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p> }
              <p className='absolute bottom-2 right-5 font-black'>POWERED BY AI</p>
      
            
            </div>
          </div>




      </div>
    

    </div>

    
  )}
  else {
    return (
      <div className='w-full h-full p-5 overflow-y-auto'>
      <div className='mx-auto max-w-9xl my-10'>
          {/* First row */}
          <div className='flex flex-col  md:flex-row gap-3 mb-3'>
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center p-5 md:w-1/3'>
              <h4 className='text-md'>Welcome to Calm.</h4>
              <h4 className='text-md fade-in'>Your simple and effective Health Dashboard</h4>
            </div>
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center md:w-2/3'>
            <h4 className='mb-5'>Why use Calm?</h4>
            <p className='text-sm text-center max-w-md fade-in '>Calm was crafted to seamlessly integrate tranquility into everyday life, providing a simple, effective, and science-based solution for holistic wellbeing.</p>
            </div>
          </div>

          {/* Second row */}
          <div className='flex flex-col  md:flex-row gap-3'>
            
            {/* 1 column */}
            <div className='text-center flex flex-col md:w-1/2'>
                <div className='h-64 gap-3 text-center flex flex-row justify-center items-center'>
                  
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Verified reviews</h4>
                    <p className='font-black text-5xl fade-in '>1000+</p></div>
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Active Users</h4>
                    <p className='font-black text-5xl fade-in'>10000+</p>
                  </div>
                
                </div>

                <div className='h-64 bg-gray-100 text-center flex flex-col justify-center p-5 items-center mt-3'>
                      <h4 className='mb-5'>Testimonials</h4>
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
            <div className='h-100 relative bg-gray-100 text-center flex flex-col items-center justify-center p-5 md:w-1/2'>
        
        
              <h4 className='mb-3'>Our story</h4>
              <p className='fade-in max-w-sm'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
       
      
            
            </div>
          </div>




      </div>
    

    </div>
    )
  }

}
