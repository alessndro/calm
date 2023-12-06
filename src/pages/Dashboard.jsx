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

  const [testimonials, setTestimonials] = React.useState([{name: 'Alex M. 28' , text: `Being a busy professional, I needed a health solution that didn't add more complexity to my life. Calm has been a game-changer. The intuitive design and seamless navigation make it easy to incorporate biohacking practices into my daily routine`}, {name: 'Emma H. 34' , text:`Calm has transformed the way I approach my health journey. The simplicity of the platform allows me to focus on what truly matters—the five key pillars. The biohacking insights, inspired by Andrew Huberman, have been eye-opening.`}, {name: 'David S. 43',text: `As someone who has tried numerous health apps, Calm stands out for its holistic approach. The five key pillars provide a structured and balanced path to well-being. Calm has become my go-to dashboard for tracking progress and staying motivated on my health journey.` }])
  const [showcaseTestimonial, setShowcaseTestimonial] = React.useState({})
  
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

  React.useEffect(() => {
      const randomIndex = Math.floor(Math.random() * 3);
      setShowcaseTestimonial(testimonials[randomIndex])
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
    if (showCaseRecom) { 
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
              <p className='text-md'>Good to see you again!</p>
            </div>
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center md:w-2/3'>
            
            <p className='text-center max-w-md mb-5'>"Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth"</p>
              <p className='text-sm'>— Marcus Aurelius</p>
            </div>
          </div>

          {/* Second row */}
          <div className='flex flex-col  md:flex-row gap-3'>
            
            {/* 1 column */}
            <div className='text-center flex flex-col md:w-1/2'>
                <div className='h-64 gap-3 text-center flex flex-row justify-center items-center'>
                  
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Totale Health Score</h4>
                    <p className='font-black text-5xl '>{totalAverageScore ? totalAverageScore : 0}</p></div>
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-2'>Highest Score</h4>
                    <p className='text-gray-800 mb-3'>{highestScore.element ? highestScore.element : ""}</p>
                    <p className='font-black text-5xl'>{highestScore.average ? highestScore.average : 0}</p>
                  </div>
                
                </div>

                <div className='h-64 bg-gray-100 text-center flex flex-col justify-center p-5 items-center mt-3'>
                  <h4 className='mb-5'>Achievements</h4>
                  <div className=''>{achievements}</div>
                </div>
            </div>

            {/* Column 2 */}
            <div className='relative h-100  bg-gray-100 text-center flex flex-col items-center justify-center p-10 md:w-1/2'>
        
        
              <h4 className='mb-3'></h4>
              {recommendations ? <div><p className='max-w-xl'>{recommendations}</p> <p className='text-sm mt-5'>— The Calm Team</p></div> : <div><p className='max-w-xl'>Thank you for choosing Calm to embark on your well-being journey. While you haven't logged any scores yet, every small step matters.

Consider assessing your Sleep, Movement, Morning Routine, Nutrition, and Relationships on our platform. Your commitment to self-reflection is the first step toward a healthier, happier you.

Your well-being is a unique journey, and Calm is here to help you every step of the way 🚀.</p>  <p className='text-sm mt-5'>— The Calm Team</p> </div>}
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
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center items-center p-10 md:w-1/3'>
              <h4 className='text-md'>Welcome to Calm.</h4>
              <p className='text-md'>Your simple and effective Health Dashboard</p>
            </div>
            <div className='h-64 bg-gray-100 text-center flex flex-col justify-center p-10 items-center md:w-2/3'>
            <h4 className='mb-5'>Why use Calm?</h4>
            <p className='text-center max-w-xl'>Calm was crafted to seamlessly integrate tranquility into everyday life, providing a simple, effective, and science-based solution for holistic wellbeing.</p>
            </div>
          </div>

          {/* Second row */}
          <div className='flex flex-col  md:flex-row gap-3'>
            
            {/* 1 column */}
            <div className='text-center flex flex-col md:w-1/2'>
                <div className='h-64 gap-3 text-center flex flex-row justify-center items-center'>
                  
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Verified reviews</h4>
                    <p className='font-black md:text-5xl text-2xl '>800+</p></div>
                  <div className='w-1/2 bg-gray-100 h-full flex flex-col items-center justify-center'>
                    <h4 className='mb-5'>Active Users</h4>
                    <p className='font-black md:text-5xl text-2xl'>6000+</p>
                  </div>
                
                </div>

                <div className='max-h-64 bg-gray-100 text-center flex flex-col justify-center p-5 items-center mt-3 lg:p-10'>
                      <h4 className='mb-5'>Testimonials</h4>
                      <p className='text-center max-w-md mb-5 text-sm lg:text-md'>{showcaseTestimonial.text}</p>
                      <p className='text-sm'>- {showcaseTestimonial.name}</p>
                </div>
            </div>

            {/* Column 2 */}
            <div className='h-100 relative bg-gray-100 text-center flex flex-col items-center justify-center p-10 md:w-1/2'>
        
              <h4 className='mb-5'>Our Story</h4>
              <p className='max-w-xl'>Welcome to Calm—a health dashboard driven by self-improvement and biohacking. Inspired by neuroscientist Andrew Huberman, our platform simplifies optimal living. We value simplicity, offering a seamless, modern design. Recognizing the multifaceted nature of health, we focus on five key pillars for a straightforward path to a healthier you.</p>
              <p className='text-sm mt-5'>— The Calm Team</p>
       
      
            
            </div>
          </div>




      </div>
    

    </div>
    )
  }

}
