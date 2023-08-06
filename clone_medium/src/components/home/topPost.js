import React, { useEffect, useState } from 'react'
import image from '../../styles/image.webp'
import { Link } from 'react-router-dom';
import '../../index.css'
function TopPost() {


  const postss = [
    {
      id: "1",
      Title: "Special Report: Extreme Heat and Human Health",
      Author: "John Doe",
      Date: "August 3, 2023",
      Time: "19 min",
      Topic: "Science",
      FeaturedImage: image,
      postData:
        "Excessive heat is pushing the limits of human tolerability. In more than a dozen articles, Wise & Well examines how hot is too hot...",
    },
    {
      id: "2",
      Title: "Sample Post 2",
      Author: "John Smith",
      Date: "August 3, 2023",
      Time: "12 min",
      Topic: "College",
      FeaturedImage: image,
      postData: "This is the content of Sample Post 2...",
    },
    {
      id: "3",
      Title: "Sample Post 3",
      Author: "John Hello",
      Date: "August 3, 2023",
      Time: " 10 min",
      Topic: "Environment",
      FeaturedImage: image,
      postData: "This is the content of Sample Post 3...",
    },
    {
      id: "4",
      Title: "Sample Post 4",
      Author: "John Hello",
      Date: "August 3, 2023",
      Time: " 10 min",
      Topic: "Environment",
      FeaturedImage: image,
      postData: "This is the content of Sample Post 3...",
    },
    {
      id: "5",
      Title: "Sample Post 5",
      Author: "John Hello",
      Date: "August 3, 2023",
      Time: " 10 min",
      Topic: "Environment",
      FeaturedImage: image,
      postData: "This is the content of Sample Post 3...",
    },
    {
      id: "5",
      Title: "Sample Post 5",
      Author: "John Hello",
      Date: "August 3, 2023",
      Time: " 10 min",
      Topic: "Environment",
      FeaturedImage: image,
      postData: "This is the content of Sample Post 3...",
    },
    {
      id: "5",
      Title: "Sample Post 5",
      Author: "John Hello",
      Date: "August 3, 2023",
      Time: " 10 min",
      Topic: "Environment",
      FeaturedImage: image,
      postData: "This is the content of Sample Post 3...",
    },
  ];


    // const fetchPosts = async() =>{
  //     const res = await fetch("/getPosts" , {
  //         method:"GET" ,
  //         headers:{
  //             "Content-Type":"application/json",
  //             // "id":id
  //         }
  //     });

  //     const result = await  res.json();
  //     setPosts(result);
  //     setLoading(false);
  // }

  const [posts , setPosts ] = useState('')
  const [loading , setLoading] = useState(true);


  useEffect(() => {
    setPosts(postss)
    setLoading(false)
  // fetchPosts()
  
}, [])


  if(loading)
  return <>Loading...</>

  return (
    <div>
       <h1 className='text-blue-950 font-bold text-3xl mb-5 max-sm:mt-5'>Top Trending Articles</h1>
       <div className="flex mr-10 w-full overflow-x-auto ">
          {posts.map((post) => {
            return (
              <Link to={post.id} className=' flex max-sm:flex-col p-5 max-sm:justify-start justify-center bg-gray-100 shadow-lg shadow-black-500/50 mb-8 mr-4 w-1/3 max-sm:w-full  hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95'>
                <div className='flex justify-center'>
                  <div className= "w-60 h-60 m-2   max-sm:w-full max-sm:h-30 flex justify-center overflow-hidden">
                    <img
                      className="rounded-lg"
                      src={post.FeaturedImage}
                      alt="feature_photo"
                    />
                  </div>
                </div>


                <div className="p-2 m-2 rounded-md w-96 h-72">
                  <div className="p-2 font-bold text-lg text-bold">
                    <h3>{post.Author}</h3>
                  </div>
                  <div className="w-full text-left h-16">
                    <h2 className=' text-2xl font-bold'>{post.Title}</h2>
                  </div>
                  <div className="w-full text-justify  mt-1 mb-1 h-20 ">
                    <p className='text-lg'>{post.postData}</p>
                  </div>

                  <div className="w-full mt-4">
                  <span className="mr-3 font-light">{post.Date}</span>
                    <span className="mr-3 font-light">{post.Time}</span>
                    <span className="mr-3 font-bold text-blue-500">{post.Topic}</span>
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