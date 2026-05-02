import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
        <Link to={'/services'}>Services</Link>
        <Link to={'/contect'}>Contect</Link>
        <Link to={'/auth'}>Login</Link>
        <Link to={'/todo'}>Todos</Link>


        
    </>
  )
}

export default Navbar
