import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig.jsx'
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../components/AuthContext.jsx';

export default function Signup() {

    const [user, setUser] = React.useState({username: '', password: '', password1: ''})
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    
    const {signUp} = useAuthContext()
    function handleChange(event) {
        setUser(prevUser => {
            return {
                ...prevUser,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (user.password !== user.password1)
        {
            setError('Passwords are not identical')
        }

        try {
            setLoading(true)
            await signUp(user.username, user.password)
            navigate('/', { replace: true });

        }
        catch (error){
            setError(error.message)
        }
        finally {
            setLoading(false)
        }
    }
  
  
return (
    <div className='h-full w-full flex items-center flex-col'>
        <div className='bg-gray-100 px-10 py-10 mt-20 lg:px-20 lg:py-20'>
            <h3 className='font-black text-2xl mb-5 lg:mb-7'>Calm.</h3>

            <h5 className='mb-5 lg:mb-7'>Create a new account.
</h5>
            <form onSubmit={handleSubmit}>
            <div className='mb-5 lg:mb-6'>
                <input required name="username" type="email" value={user.username} onChange={handleChange} placeholder="email" className='w-full p-2 bg-gray-100 border-b-2 border-black rounded-md focus:outline-none focus:border-blue-500' />
            </div>

            <div className='mb-7 lg:mb-10'>
                <input required type="password" name="password" value={user.password} onChange={handleChange} placeholder="password" className='w-full p-2 bg-gray-100 border-b-2 border-black rounded-md focus:outline-none focus:border-blue-500' />
            </div>

            <div className='mb-7 lg:mb-10'>
                <input required type="password" name="password1" value={user.password1} onChange={handleChange} placeholder="confirm password" className='w-full p-2 bg-gray-100 border-b-2 border-black rounded-md focus:outline-none focus:border-blue-500' />
            </div>
           
           
            {error ? <p className='mb-4 text-gray-600'>{error}</p> : <p></p> }
            <button className='bg-black rounded-full text-white py-2 px-4 mb-5 lg:mb-10'>Sign up</button>
            </form>
            <div className='flex items-between gap-16 lg:gap-36'>
                <p className='text-sm'>Already have an account?</p>
                <Link to="/signin"><p className='text-sm text-gray-500'>Sign in</p></Link>
            </div>
        </div>
    </div>
  )
}
