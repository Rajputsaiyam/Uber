import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUP from './pages/CaptainSignUP'
import Start from './pages/Start'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} ></Route>
        <Route path='/login' element={<UserLogin/>} ></Route>
        <Route path='/signup' element={<UserSignUp/>} ></Route>
        <Route path='/captain-login' element={<CaptainLogin/>} ></Route>
        <Route path='/captain-signup' element={<CaptainSignUP/>} ></Route>

      </Routes>
    </div>
  )
}

export default App