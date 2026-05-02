import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../config/supabase/supabase'

const Home = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    const getCurrentUser = async()=>{
      const {data, error} = await supabase.auth.getUser()

      if(!data.user){
        console.log(error.message)
        navigate('/auth')
        return
      }
      // console.log('user:' , data.user)
    }

    getCurrentUser()

  }, [])


  //Logout
  const handlelogout = async ()=>{
    await supabase.auth.signOut()
    navigate('/auth')
  }


  return (
    <div>
      <button onClick={handlelogout}>Logout</button>
      <h1>Home</h1>
    </div>
  )
}

export default Home
