import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddTask() {

  const [taskData , setTaskData] = useState()
  const navigate = useNavigate()

  const handleTask =async ()=>{
    console.log(taskData)
    let result = await fetch('http://localhost:3000/add-task',{
      method: 'Post',
      body:JSON.stringify(taskData),
      headers: {'Content-Type': 'application/json'},
      credentials : 'include'
    })
    const data = await result.json()
    if(data.success){
       navigate('/')
    }else{
      alert('try after sometime')
    }
   
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[89.7vh] flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Add Todo
          </h2>
          {/* Title */}
          <input type="text" placeholder="Enter title"
          onChange={(e)=>setTaskData({...taskData, title:e.target.value})}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
          focus:ring-blue-400"/>

          {/* Description */}
          <textarea placeholder="Enter description" rows="4"
          onChange={(e)=>setTaskData({...taskData, discription:e.target.value})}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
          focus:ring-blue-400"></textarea>

          {/* Button */}
          <button onClick={handleTask}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600
            transition duration-300">
            Add Task
          </button>
        </div>
      </div>
    </>
  )
}

export default AddTask