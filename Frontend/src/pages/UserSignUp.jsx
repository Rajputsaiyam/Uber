import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {AddUser} from '../Serivce/User.service'

const UserSignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})


  const submitHandler = async (e) => {
    e.preventDefault();
    setUserData({ firstName: firstName, lastName: lastName, email: email, password: password });
    await AddUser(userData);
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div>
        <img className='w-20 mb-2' src='https://www.svgrepo.com/show/505031/uber-driver.svg' />
        <form onSubmit={(e) => { submitHandler(e) }}>
          <h3 className='text-lg font-medium mb-2'>What's your Name</h3>
          <div className='flex gap-4 mb-5'>
            <input
              id="First name" name="First name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type='text' 
              placeholder='First name'
              className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' />

            <input
              required
              id="Last name" name="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              placeholder='Last name'
              className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2  text-lg placeholder:text-base' />
          </div>
          <h3 className='text-base font-medium mb-2'>What's your email</h3>
          <input
            required
            id="Email" name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='xyz@gmail.com'
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />
          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input
            required
            id="Password" name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='Password'
            placeholder='password'
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />

          <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base' >Create account</button>
          <p className='text-center'>Already have a account?<Link to='/login' className='text-blue-600'>Login here</Link></p>
        </form>
      </div>
      <div>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA  and the <span className='underline'>Google Privacy
      Policy</span> and <span className='underline'>Terms of Servcie apply.</span></p>.
      </div>
    </div>
  )
}

export default UserSignUp