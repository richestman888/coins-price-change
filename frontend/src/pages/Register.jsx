import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {name, email, password}
            );
            if(response.data.success){
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='border shadow p-6 w-80 bg-white'>
            <h2 className='text-2xl font-bold mb-4'>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                    <input 
                        type="text" 
                        onChange={(e) => setName(e.target.value)}
                        className='w-full px-3 py-2 border'
                        placeholder='Enter Username' 
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-3 py-2 border'
                        placeholder='Enter email address' 
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-3 py-2 border'
                        placeholder='Enter password' 
                    />
                </div>
                <div className='mb-4'>
                    <button
                        type='submit'
                        className='w-full bg-teal-600 text-white py-2'
                    >
                        Signup
                    </button>
                    <p className='text-center'>
                        Already have account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register