import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'

import Login from './pages/Login'
import Register from './pages/Register'
import MyProfile from './pages/MyProfile'
import Tools from './pages/Tools/Tools'
import Opiekunowie from './pages/Opiekunowie'
import Teams from './pages/Teams'
import Calendar from './pages/Tools/Calendar'
 

function App() {

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<MyProfile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<MyProfile />} />
            <Route path='/tools' element={<Tools />} />
            <Route path='/opiekunowie' element={<Opiekunowie />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/teams' element={<Teams />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
