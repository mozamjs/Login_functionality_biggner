import React, { useEffect, useState } from 'react'
import { supabase } from '../config/supabase/supabase'
import { useNavigate } from 'react-router-dom'

const Auth = () => {

  const [isLogin, setIsLogin] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isLogin) {
      // Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        alert(error.message)
      } else {
        console.log(data.user)
        navigate('/')
      }
    }

    else {
      //SignUP

      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        alert(error.message)
      } else {
        alert('check your email for confirmation!')
        console.log(data)
      }
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        navigate('/')   // already logged in → home
      }
    }

    checkUser()
  }, [])


  return (
    <div className="page-center">
      <div className="main-card">

        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="button-group">
            <button type="submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Switch' : 'Login'}
            </button>
          </div>

        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>


      </div>
    </div>
  )

}

export default Auth
