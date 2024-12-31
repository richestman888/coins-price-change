import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
// import './index.css'

const Login2 = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:5050/api/auth/login",
                {email, password}
            );
            if(response.data.success){
                localStorage.setItem("token", response.data.token)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
      <div className="sign-up-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
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
            <button type="submit">Login</button>
            <p>Forgot password?</p>
            <p>Don't have account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    );
}

export default Login2