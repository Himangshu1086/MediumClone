import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contextApi/contextApi'

function QuickLinks() {

  const {checkUser , user } = useContext(UserContext)

  const userid = 'bewhd35acad4';
  const links = [
    'Draft',
    'Revision history',
    'Save for Later'
  ]
  return (
    <div>
        <div className='bg-gray-100 flex flex-col justify-start ml-10 p-10 mt-48 w-full shadow-md shadow-gray-200 rounded-sm'>
            <h1 className='text-4xl font-bold p-5 '>Quick Links:</h1>
            {
              links.map( link =>{
                return(
                  <Link to={`/${userid}/${link}`} className='p-5 m-3  text-black text-xl border-b-2 border-blue-400 hover:border-purple-500' >{link}</Link>
                )
              })
            }
        </div>
    </div>
  )
}

export default QuickLinks