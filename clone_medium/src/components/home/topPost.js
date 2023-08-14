import React, { useEffect, useState } from 'react'
import image from '../../styles/image.webp'
import { Link } from 'react-router-dom';
import '../../index.css'
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
function TopPost() {


  const postss = [
    {
      id: "1",
      title: "Special Report: Extreme Heat and Human Health",
      author_name: "John Doe",
      reading_time: "19 min",
      topic: "Science",
      image: image,
      text:
        "Excessive heat is pushing the limits of human tolerability. In more than a dozen articles, Wise & Well examines how hot is too hot...",
    },
    {
      id: "2",
      title: "Special Report: Extreme Heat and Human Health",
      author_name: "John Doe",
      reading_time: "19 min",
      topic: "Science",
      image: image,
      text:
        "Excessive heat is pushing the limits of human tolerability. In more than a dozen articles, Wise & Well examines how hot is too hot...",
    },
    {
      id: "3",
      title: "Special Report: Extreme Heat and Human Health",
      author_name: "John Doe",
      reading_time: "19 min",
      topic: "Science",
      image: image,
      text:
        "Excessive heat is pushing the limits of human tolerability. In more than a dozen articles, Wise & Well examines how hot is too hot...",
    },
    {
      id: "4",
      title: "Special Report: Extreme Heat and Human Health",
      author_name: "John Doe",
      reading_time: "19 min",
      topic: "Science",
      image: image,
      text:
        "Excessive heat is pushing the limits of human tolerability. In more than a dozen articles, Wise & Well examines how hot is too hot...",
    },
    {
      id: "5",
      title: "Special Report: Extreme Heat and Human Health",
      author_name: "John Doe",
      reading_time: "19 min",
      topic: "Science",
      image: image,
      text:
        "Excessive heat is pushing the limits of human tolerability. In more than a dozen articles, Wise & Well examines how hot is too hot...",
    },
  ];

  const [posts , setPosts] = useState([])
  const [loading , setLoading] = useState(true);

  const fetchTopPost = async() =>{
    await axios.get('http://127.0.0.1:3000/get/topPosts')
    .then((response) => {
      if(!response.data)
        setPosts(postss)
      else setPosts(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    })
  }


  useEffect(() => {
    // setPosts(postss)
    fetchTopPost()
    setLoading(false)
  
}, [])


  if(loading)
  return <>Loading...</>

  return (
    <div>
       <h1 className='text-blue-950 font-bold text-3xl mb-5 max-sm:mt-5'>Top Trending Articles</h1>
       <div className="flex mr-10 w-full overflow-x-auto ">
          {posts.map((post) => {
            return (
              <Link to={`/${post.id}`} className=' flex max-sm:flex-col p-5 max-sm:justify-start justify-center bg-gray-100 shadow-lg shadow-black-500/50 mb-8 mr-4 w-1/3 max-sm:w-full  hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95'>
                <div className='flex justify-center'>
                  <div className= "w-60 h-60 m-2   max-sm:w-full max-sm:h-30 flex justify-center overflow-hidden">
                    <img
                      className="rounded-lg"
                      src={post.image}
                      alt="feature_photo"
                    />
                  </div>
                </div>


                <div className="p-2 m-2 rounded-md w-96 h-72">
                  <div className="p-2 font-bold text-lg text-bold">
                    <h3>{post.author_name}</h3>
                  </div>
                  <div className="w-full text-left h-16 overflow-hidden">
                    <h2 className=' text-2xl font-bold'>{post.title}</h2>
                  </div> <span classname="font-bold">...</span>
                  <div className="w-full text-justify  mt-3 mb-1 h-20 overflow-hidden">
                    <p className='text-lg'>
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.text}</ReactMarkdown></p>
                  </div>
                  <span classname="font-bold">...</span>
                  <div className="w-full mt-4">
                  <span className="mr-3 font-light">29 Jan 2023</span>
                    <span className="mr-3 font-light">{post.reading_time} min</span>
                    <span className="mr-3 font-bold text-blue-500">{post.topic}</span>
                  </div>
                </div>
            
            </Link>
            );
          })}
        </div>
    </div>
  )
}

export default TopPost