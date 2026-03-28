import {BrowserRouter ,Routes , Route} from 'react-router-dom'
import HomePage from '../component/HomePage'
import './App.css'
import AddTask from '../component/AddTask'
import UpdateTask from '../component/UpdateTask'
import Signup from '../component/Signup'
import Signin from '../component/Signin'
import Protected from '../component/Protected'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protected><HomePage/></Protected>}/>
          <Route path="/add" element={<Protected><AddTask/></Protected>}/>
          <Route path="/update/:id" element={<UpdateTask/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
