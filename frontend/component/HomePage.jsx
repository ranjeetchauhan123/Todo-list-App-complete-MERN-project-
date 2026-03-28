import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

function HomePage() {
  const [apis, setApis] = useState([])
  const [selectAll, setSelectAll] = useState([])

  // get Todos
  const handleData = async () => {
    const res = await fetch('http://localhost:3000',{
      credentials : 'include'
    })
    const data = await res.json()
    setApis(data)
  }

  useEffect(() => {
    handleData()
  }, [])

  //handle delete
  const handleDelete = async (id) => {
    const responce = await fetch(`http://localhost:3000/delete/${id}`, {
      method: 'DELETE',
      credentials : 'include'
    });
    const data = await responce.json()
    handleData()
  }

  //handle nevigate
  const handleNevigate = async (id) => {
    const responce = await fetch(`http://localhost:3000/nevigate/${id}`, {
      method: 'Get'
    });
    const data = await responce.json()
  }

  //select All
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const tasks = apis.map((task) => task._id)
      setSelectAll(tasks)
    } else {
      setSelectAll([])
    }
  }

  //select one
  const singleSelect = (id) => {
    if (selectAll.includes(id)) {
      let items = selectAll.filter((item) => item != id)
      setSelectAll(items)
    } else {
      setSelectAll([...selectAll, id])
    }
  }

  // delete Multiple
  const deleteMultipleTask = async () => {
    const responce = await fetch(`http://localhost:3000/multiple-delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials : 'include',
      body: JSON.stringify(selectAll)
    });
    const data = await responce.json()
    console.log(data)
    handleData()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        {
          apis.length > 0 ? (
            <div className="space-y-4">
              {/* Select All */}
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow">
                <input type="checkbox" onChange={handleSelectAll} className="w-4 h-4" />
                <span className="text-gray-700 font-medium"> Select All Todos </span>
              </div>
              {/* Todo List */}
              {
                apis.map((todo, index) => {
                  return (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                      {/* Top Section */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h1 className="text-xl font-semibold text-gray-800">
                            {todo.title}
                          </h1>
                          <p className="text-gray-600 mt-1">
                            {todo.discription}
                          </p>
                        </div>

                        {/* Checkbox */}
                        <input type="checkbox" checked={selectAll.includes(todo._id)}
                          onChange={() => singleSelect(todo._id)} className="w-5 h-5 mt-1" />
                      </div>

                      {/* Buttons */}
                      <div className="flex justify-end gap-3 mt-4">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                          onClick={()=>handleDelete(todo._id)}>
                          Delete  </button>
                        <Link to={`/update/${todo._id}`}>
                          <button onClick={() => handleNevigate(todo._id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                            Update
                          </button>
                        </Link>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              Api Loading....
            </p>
          )
        }
        {/* Delete Selected */}
        <div className="mt-6 text-center">
          <button onClick={deleteMultipleTask}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow-md">
            Delete Selected Tasks
          </button>
        </div>
      </div>
    </div>

  )
}

export default HomePage