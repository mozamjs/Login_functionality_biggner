import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../config/supabase/supabase'

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (!data.user) {
        navigate('/auth')
        return
      }
      // console.log('user:' , data.user)
    }

    getCurrentUser()

  }, [])


  //Logout
  const handlelogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }


  return (
    <div className="page-center">
      <div className='main-card'>
        <h1 >Home</h1>
        <button onClick={handlelogout}>Logout</button>
      </div>
    </div>
  )
}

export default Home
