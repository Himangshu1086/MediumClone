import React from 'react'

function UserDetail() {

  const user = [
    {
      name:"Himangshu Baishya",
      email:"baishyahimangshu@gmail.com"
    }
  ]


  return (
    <>
      <div className=' flex flex-col justify-center items-center mt-10'>
        <div>
        <h1 className=' text-6xl text-green-500'>Profile</h1>
        </div>
        <div className='mt-5 flex flex-col bg-gray-100 p-10 rounded-md shadow-md shadow-gray-400'>
        <h2 className='text-3xl mr-10 mt-5 mb-3'><span className='text-blue-600 text-4xl'>Hello! </span>{user[0].name}<span className="ml-3 font-bold text-2xl bg-gray-600 text-white rounded-md p-3 ">Edit</span></h2>
        <h2 className='text-3xl'><span>Email: </span> {user[0].email}<span className="ml-3 font-bold text-2xl bg-gray-600 text-white rounded-md p-3 ">Edit</span></h2>
        </div>
      </div>
    </>
  )
}

export default UserDetail