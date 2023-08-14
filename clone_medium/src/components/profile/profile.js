import React from 'react'
import UserDetail from './userDetail'
import UserPost from './userPost'
import QuickLinks from './quickLinks'

function Profile() {


  return (
   <>
    <div className='flex flex-col'>
      <UserDetail/>
     <div className='flex max-sm:flex-col-reverse justify-center'>
     <UserPost/>
     <QuickLinks />
     </div>
    </div>
    
   </>
  )
}

export default Profile