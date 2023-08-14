import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contextApi/contextApi'
import axios from 'axios';

function UserDetail() {
  const [aboutText, setAboutText] = useState('');
  const [isAbout , setIsAbout] = useState(false);
  const [authorDetails,setAuthorDetails]=useState('');
  const [loading , setLoading] = useState(true)

  const jwtToken = localStorage.getItem('jwtToken');
  const headers = {
    'authToken': jwtToken
  };

  useEffect(()=>{

    fetchUser()
    setLoading(false)
  },[isAbout])


  const fetchUser = async() =>{
   await axios.get('http://127.0.0.1:3000/author/my/details',{headers})
      .then((response) => {
        setAuthorDetails(response.data);
        setAboutText(response.data.about)
        console.log(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }


  const handleAboutSubmit = () => {
    axios.put('http://127.0.0.1:3000/authors/edit',{ 'about':aboutText},{headers})
      .then((response) => {
        console.log(response.data);
        setAboutText('');
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
      setIsAbout(!isAbout)
  };





  const user = [
    {
      name:"Himangshu Baishya",
      email:"baishyahimangshu@gmail.com",
      following:456,
      earning:3957
    }
  ]


  if(loading) 
  return <>Loading...</>


  return (
    <>
      <div className=' flex flex-col justify-center items-center mt-10'>
        <div>
        <h1 className=' text-6xl  text-purple-600'>Profile</h1>
        </div>
        <div className='mt-5 flex flex-col bg-gray-100 p-10 w-1/3 max-sm:w-4/5 rounded-md shadow-md shadow-gray-400'>
        <h2 className='text-3xl mr-10 mt-5 mb-3'><span className='text-blue-600 text-4xl'>Hello! </span>{authorDetails.name}</h2>
        <h2 className='text-3xl max-sm:text-2xl'><span className='text-blue-400 pr-4'>Email: </span> {authorDetails.email}</h2>
        <h2 className='text-3xl max-sm:text-2xl mt-3'>
          <span className='text-blue-400 pr-4'>About: </span> {authorDetails.about || 'No Bio Added'}</h2>
        <input className='p-5 w-full h-20 mt-5 mb-5 rounded-2xl text-gray-500'
         type='text' placeholder='Update your Bio' value={aboutText} 
        onChange ={(e) => {setAboutText(e.target.value)}}
        ></input><button className='p-3 mt-2 rounded-2xl bg-blue-500 w-40' onClick={handleAboutSubmit}>Update Bio</button>
        <h2 className='text-3xl mt-10 text-orange-500 bg-blue-100 p-2 pl-5 rounded-lg '>
          <span className=' text-orange-500 font-bold'>{authorDetails.followers_count}</span> following</h2>
        <h2 className='text-3xl mt-10 text-green-400 bg-blue-100 p-2 pl-5 rounded-lg '>Total Earning: <span className='text-green-400 font-bold'>${user[0].earning}</span></h2>
        </div>
      </div>
    </>
  )
}

export default UserDetail