import React, { useEffect ,useState} from 'react'
import Navbar from './Navbar'
import { useParams ,useNavigate} from 'react-router-dom'

function UpdateTask() {

  const [getData , setGetData] = useState([])
  const {id} = useParams();
  const navigate = useNavigate()

  const handleNevigate = async (id) => {
    const res = await fetch(`http://localhost:3000/nevigate/${id}`)
    const result = await res.json()
    setGetData(result.data)
  }

  useEffect(() => {
    handleNevigate(id)
  }, [])

  const handleUpdate= async()=>{
    const res = await fetch(`http://localhost:3000/update`,{
      method : 'Put',
      headers: {'Content-Type': 'Application/Json'},
      body : JSON.stringify(getData)
    })   
    console.log(getData)
    navigate('/')
  }

  
  return (
    <>
      <Navbar />
      <div className="min-h-[89.7vh] flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Update Todo
          </h2>
          {/* Title */}
          <input type="text" placeholder="Enter title" value={getData.title}
          onChange={(e)=>setGetData({...getData, title:(e.target.value)})}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
          focus:ring-blue-400"/>

          {/* Description */}
          <textarea placeholder="Enter description" rows="4" value={getData.discription}
          onChange={(e)=>setGetData({...getData, discription:(e.target.value)})}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
          focus:ring-blue-400"></textarea>

          {/* Button */}
          <button onClick={handleUpdate}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600
            transition duration-300">
            Update Now
          </button>
        </div>
      </div>
    </>
  )
}

export default UpdateTask;