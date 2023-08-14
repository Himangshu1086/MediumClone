import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import image from '../../styles/image.webp' 
import axios from 'axios';
import DisplayDate from '../displayDate';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';


function OthersProfile() {

    const { author } = useParams();

console.log(author)

  const [profile , setProfile ] = useState([])
  const [posts , setPosts] = useState([])
  const [loading , setLoading ] = useState(true)

  const fetchProfile = async() =>{
    await axios.get(`http://127.0.0.1:3000/author/details/${author}`)
    .then((response) => {
      setProfile(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
  
    });

    axios.get(`http://127.0.0.1:3000/get/post/author/${author}`)
    .then((response) => {
      setPosts(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
  
    });
      
  }

    useEffect(() => {
    fetchProfile()
    setLoading(false);
  }, [])





if(loading)
return <>Loading...</>

// if(posts.length === 0)
// return <>No Article is written by {profile.name}</>

  return (
   <>
    <div className='flex justify-center items-center  flex-col'>
      <h1 className='text-center mt-20 text-6xl text-red-500 pb-4 font-bold w-1/3 border-b-2 border-red-500'>{profile.name}</h1>
      <p className='text-center mt-5 text-3xl text-green-500 pb-4 font-bold w-1/3 border-b-2 border-gray-400'>{profile.email} <span className="text-purple-600 ml-3 mr-3">|</span> <span className="text-blue-400"> Followers: {profile.followers_count}</span></p>
      <p className='text-center mt-5 text-3xl text-green-500 pb-4 font-bold w-1/3 border-b-2 border-gray-400'>{profile.about || 'No Bio Found'}</p>
      </div>
    <div>
    <div className="flex justify-center mt-20">
    <h1 className='text-blue-950 font-bold text-6xl mb-5 text-center '>Articles</h1>
    </div>
      <div className="flex justify-center m-20 mt-5 ">

        <div className="flex flex-col justify-center items-start mr-10" >
          <div className="flex flex-col justify-center items-start mr-10 ">
          {posts.map((post) => {
            return (
              <div className="flex p-10 justify-center items-center w-full  mb-8 bg-gray-100 shadow-md shadow-gray-300 hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95">
                <div className="p-4 m-4 rounded-md w-full">
                  <div className="w-full text-left pr-10 h-20 overflow-hidden">
                    <h1 className="font-bold text-4xl">{post.title}</h1>
                  </div>
                  <div className="w-full text-justify mt-1 mb-1 pr-10 h-20 overflow-hidden">
                    <p className="text-gray-600 w-4/5"><ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.text}</ReactMarkdown></p>
                  </div><Link to={`/${post.id}`} className='ml-5 text-red-500'>Read More</Link>

                  <div className="w-full mt-5">
                    <span className="mr-3 font-light">  <DisplayDate publishedAt={post.published_at} /></span>
                    <span className="mr-3 font-light">{post.reading_time} min</span>
                    <span className="mr-3 font-bold text-blue-500">{post.Topic}<span className='pl-2 pr-2 text-2xl'>|</span></span>
                    <span className="mr-3 font-bold text-2xl text-blue-500">Total Comments : {(post.comments_count)} |</span>
                    <span className="mr-3 font-bold text-2xl text-green-600">Total Like : {post.likes_count} |</span>
                    <span className="mr-3 font-bold text-2xl text-red-400">Total Views : {post.view_count}</span>
                  </div>
                </div>

                <div>
                  <div className="w-full flex justify-center items-center overflow-hidden">
                    <img
                      className="min-w-2/3 h-64 flex-shrink-0 rounded-lg"
                      src={post.image}
                      alt="featureImage"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
    </div>
    </div>
   </>
  )
}

export default OthersProfile