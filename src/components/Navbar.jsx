import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../config/supabase/supabase'

const Navbar = () => {

  const [user, setUser] = useState(null)

 useEffect(() => {
  // initial check
  const getUser = async () => {
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
  }

  getUser()

  // 🔥 listen to auth changes (login/logout)
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user || null)
    }
  )

  return () => {
    listener.subscription.unsubscribe()
  }

}, [])

  // agar user login nahi hai → navbar hide
  if (user === null) return null

  return (
  <div className="navbar">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/services">Services</Link>
    <Link to="/contect">Contact</Link>
    <Link to="/todo">Todos</Link>
  </div>
)
}

export default Navbar