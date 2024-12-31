import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import "../App.css"

const Register2 = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:5050/api/auth/register",
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
      <div className="sign-up-container">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Username"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div>
            <button type="submit">Signup</button>
            <p className="text-center">
              Already have account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    );
}

export default Register2