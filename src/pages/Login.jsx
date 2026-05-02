// import React, { useState } from 'react'
// import { useNavigate } from 'react-router'
// import { supabase } from '../config/supabase/supabase'


// const Login = () => {
//   const [email , setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const navigate = useNavigate()

//   const loginUser = async(event)=>{
//     event.preventDefault();
//     console.log(email, password);

//     const {data, error} = await supabase.auth.signInWithPassword({
//       email,
//       password
//     })

//     if(error){
//       alert(error.message)
//     }else{
//       console.log(data.user)
//       navigate('/')
//     }

//   }


//   return (
//     <div>
//         <h1>Login</h1>
//         <form onSubmit={loginUser}>
//           <input type="email" placeholder='Enter your Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
//           <input type="password" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
//           <button>Login</button>
//         </form>
      
//     </div>
//   )
// }

// export default Login
