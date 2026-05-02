import React, { useState } from 'react'
import { supabase } from '../config/supabase/supabase'
import { useNavigate } from 'react-router'

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        if(isLogin){
            // Login
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password   
            })

            if(error){
                alert(error.message)
            }else{
                console.log(data.user)
                navigate('/')
            }
        }

        else{
            //SignUP

            const{data, error} = await supabase.auth.signUp({
                email,
                password
            })

            if(error){
                alert(error.message)
            }else{
                alert('check your email for confirmation!')
                console.log(data)
            }
        }
    }


   return (
    <div>
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

        <button>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      {/* Toggle */}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>

    </div>
  )

}

export default Auth
