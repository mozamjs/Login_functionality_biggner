// import React, { useState } from 'react'
// import { supabase } from '../config/supabase/supabase'

// const Register = () => {

//   const [email, setEmail] = useState('')
//   const [password , setPassword] = useState('')

//   const registerUser = async (event)=> {
//     event.preventDefault();
//     console.log(email, password);

//     const {data , error} = await supabase.auth.signUp({
//       email,
//       password
//     })

//     if(error){
//       alert(error.message)
//     }else{
//       alert('check your email for confirmation!')
//       console.log(data)
//     }
//   }

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={registerUser}>
//         <input type="email" placeholder='Enter your Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
//         <input type="password" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
//           <button>Register</button>
//       </form>
//     </div>
//   )
// }

// export default Register
