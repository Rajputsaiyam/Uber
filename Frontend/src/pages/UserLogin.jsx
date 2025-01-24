import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { LoginUser } from '../Serivce/User.service'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const navigate=useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setUserData({email:email,password:password})
    await LoginUser(userData);
    navigate('/');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div>
        <img className='w-16 mb-10' src='https://download.logo.wine/logo/Uber/Uber-Logo.wine.png' />
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
          <p className='text-center'>New here?<Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
        </form>
      </div>
      <div>
        <Link to='/captain-login'className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
}
export default UserLogin