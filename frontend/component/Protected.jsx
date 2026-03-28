import { Navigate } from 'react-router-dom'

function Protected({children}) {
    if(!localStorage.getItem('signin')){
        return <Navigate to="/signin" replace/>
    }
  return children
}

export default Protected;