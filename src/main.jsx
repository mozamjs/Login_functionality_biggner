import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter , Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
// import Login from './pages/Login.jsx'
// import Register from './pages/Register.jsx'
import Contect from './pages/Contect.jsx'
import Services from './pages/Services.jsx'
import Auth from './pages/Auth.jsx'
import Todo from './pages/Todo.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route index element ={<Home/>}/>
    <Route path='about' element ={<About/>}/>
    <Route path='services' element ={<Services/>}/>
    <Route path='contect' element ={<Contect/>}/>
    {/* <Route path='login' element ={<Login/>}/> */}
    {/* <Route path='register' element ={<Register/>}/> */}
    <Route path='auth' element ={<Auth/>}/>
    <Route path='todo' element ={<Todo/>}/>

  </Routes>
  
  </BrowserRouter>
)