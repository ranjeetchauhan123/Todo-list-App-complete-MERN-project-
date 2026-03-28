import { useEffect } from "react"
import { useState } from "react"
import {Link,useNavigate} from 'react-router-dom'
import Navbar from "./Navbar"

const Signin = () => {

    const [userData, setUserData] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
      if(localStorage.getItem('signin')){
        navigate('/')
      }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

        const signInApis = async ()=>{
        const res = await fetch('http://localhost:3000/signin',{
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        })        
        const result = await res.json()
        if(result.success){
            console.log(result)
            document.cookie="token="+result.token
            localStorage.setItem('signin',userData.email)
            navigate('/')
        }else{
          alert('Invalid email !!')
        }
    }

    return (
      <>
      <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      SignIn Form
    </h1>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Email </label>
        <input type="email" placeholder="Enter email..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e)=>setUserData({ ...userData, email: e.target.value })}/>
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Password </label>
        <input type="password" placeholder="Enter password..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e)=>setUserData({ ...userData, password: e.target.value })}/>
      </div>

      {/* Button */}
      <button type="submit"className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold
      hover:bg-green-600 transition"
        onClick={signInApis}> SignIn </button>

      {/* Link */}
      <div className="text-center">
        <p className="text-gray-600">
          No have account?{" "}
          <Link to="/signup"
            className="text-green-600 font-medium hover:underline">SignUp
          </Link>
        </p>
      </div>

    </form>
  </div>
</div>
</>
    )
}

export default Signin;