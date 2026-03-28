import { useState, } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Navbar() {

    const [isLogin, setIsLogin] = useState(localStorage.getItem('signin'))
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('signin')
        setIsLogin(null)
        alert('user Logout Successfull !!')
        setTimeout(() => {
            navigate('/signin')
        }, 0)

    }
    return (
        <div className="bg-zinc-300 flex flex-wrap justify-between items-center py-4 px-6 shadow-md">
            <h2 className="text-2xl font-semibold text-green-600">
                Todo App
            </h2>
            {
                isLogin ? <>
                    <ul className="flex items-center gap-8 text-gray-700 font-medium">
                        <li>
                            <Link to="/" className="hover:text-green-600 transition duration-200">
                                My Todos
                            </Link>
                        </li>
                        <li>
                            <Link to="/add" className="hover:text-green-600 transition duration-200">
                                Add Task
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout} className="hover:text-green-600 transition duration-200">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </> : null
            }


        </div>
    )
}

export default Navbar;