import React from 'react'
import { Link } from 'react-router-dom'

function QuickLinks() {
  return (
    <div>
        <div className='bg-gray-100 flex flex-col justify-start ml-10 p-10 mt-48 w-full shadow-md shadow-gray-200 rounded-sm'>
            <h1 className='text-4xl font-bold p-5 '>Quick Links:</h1>
            <Link to='' className='p-5 m-3  text-black text-xl border-b-2 border-blue-400 hover:border-purple-500' >Draft</Link>
            <Link to='' className='p-5 m-3  text-black text-xl border-b-2 border-blue-400  hover:border-purple-500' >Revision history </Link>
            <Link to='' className='p-5 m-3  text-black text-xl border-b-2 border-blue-400  hover:border-purple-500' >Save for later</Link>
        </div>
    </div>
  )
}

export default QuickLinks