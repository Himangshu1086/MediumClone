import React, { useContext } from 'react'
import { UserContext } from '../contextApi/contextApi'

function UserDetail() {

  // const {userCheck , user } = useContext(UserContext)

  const user = [
    {
      name:"Himangshu Baishya",
      email:"baishyahimangshu@gmail.com",
      following:456,
      earning:3957
    }
  ]

  return (
    <>
      <div className=' flex flex-col justify-center items-center mt-10'>
        <div>
        <h1 className=' text-6xl text-purple-600'>Profile</h1>
        </div>
        <div className='mt-5 flex flex-col bg-gray-100 p-10 w-1/3 rounded-md shadow-md shadow-gray-400'>
        <h2 className='text-3xl mr-10 mt-5 mb-3'><span className='text-blue-600 text-4xl'>Hello! </span>{user[0].name}</h2>
        <h2 className='text-3xl'><span className='text-blue-400 pr-4'>Email: </span> {user[0].email}</h2>
        <h2 className='text-3xl mt-10 text-orange-500 bg-blue-100 p-2 pl-5 rounded-lg '><span className=' text-orange-500 font-bold'>{user[0].following}</span> following</h2>
        <h2 className='text-3xl mt-10 text-green-400 bg-blue-100 p-2 pl-5 rounded-lg '>Total Earning: <span className='text-green-400 font-bold'>${user[0].earning}</span></h2>
        </div>
      </div>
    </>
  )
}

export default UserDetail