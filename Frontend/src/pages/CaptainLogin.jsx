import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginCaptain } from '../Serivce/Captain.service'

const CaptainLogin = () => {

  const navigate=useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState({})

  const submitHandler = async(e) => {
    e.preventDefault();
    setCaptainData({ email: email, password: password });
    await LoginCaptain(captainData);
    navigate('/');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div>
        <img className='w-20 mb-2' src='https://www.svgrepo.com/show/505031/uber-driver.svg' />
        <form onSubmit={(e) => { submitHandler(e) }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='xyz@gmail.com'
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />
          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='Password'
            placeholder='password'
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />
          <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base' >Login</button>
          <p className='text-center'>Join a fleet?<Link to='/captain-signup' className='text-blue-600'>Register as Captain</Link></p>
        </form>
      </div>
      <div>
        <Link to='/login' className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin