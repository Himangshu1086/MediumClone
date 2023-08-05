import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import image from '../../styles/image.webp' 


function OthersProfile() {

    const {author } = useParams();

    const [profile , setProfile ] = useState('')
  const [loading , setLoading ] = useState(false)
  const fetchProfile = async() =>{
      const res = await fetch("/profile/author" , {
          method:"GET" ,
          headers:{
              "Content-Type":"application/json",
              "author": author
          }
      });

      const result = await  res.json();
      setProfile(result);
      setLoading(false);
  }

    useEffect(() => {
    fetchProfile()
  }, [])



  const posts = [
    {
      id:"1",
      Title: "Special Report: Extreme Heat and Human Health",
      Author: "John Doe",
      Date: "August 3, 2023",
      Time: "19 min",
      Topic: "Science",
      Likes:45,
      Comments:[{user1:'cwesc'},{user2:'swdercwds'},{user3:'wefws'}],
      views:45945,
      FeaturedImage: image,
      postData:
        "Excessive heat is pushing the limits of human tolerability. In more than a dozen articles, Wise & Well examines how hot is too hot...",
    },
    {
      id:"2",
      Title: "Sample Post 2",
      Author: "John Smith",
      Date: "August 3, 2023",
      Time: "12 min",
      Topic: "College",
      Likes:45,
      Comments:[{user1:'cwesc'},{user2:'swdercwds'},{user3:'wefws'}],
      views:45945,
      FeaturedImage: image,
      postData: "This is the content of Sample Post 2...",
    },
    {
      id:"3",
      Title: "Sample Post 3",
      Author: "John Hello",
      Date: "August 3, 2023",
      Time: " 10 min",
      Topic: "Environment",
      Likes:45,
      Comments:[{user1:'cwesc'},{user2:'swdercwds'},{user3:'wefws'}],
      views:45945,
      FeaturedImage: image,
      postData: "This is the content of Sample Post 3...",
    },
  ];






  return (
   <>
    <div className='flex justify-center'><h1 className='text-center mt-20 text-6xl text-red-500 pb-4 font-bold w-1/3 border-b-2 border-red-500'>{author}</h1></div>
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
                  <div className="w-full text-left pr-10">
                    <h1 className="font-bold text-4xl">{post.Title}</h1>
                  </div>
                  <div className="w-full text-justify mt-1 mb-1 pr-10 h-16">
                    <p className="text-gray-600 w-4/5">{post.postData}<Link to={`/${post.id}`} className='ml-5 text-red-500'>Read More</Link></p>
                  </div>

                  <div className="w-full mt-5">
                    <span className="mr-3 font-light">{post.Date}</span>
                    <span className="mr-3 font-light">{post.Time}</span>
                    <span className="mr-3 font-bold text-blue-500">{post.Topic}<span className='pl-2 pr-2 text-2xl'>|</span></span>
                    <span className="mr-3 font-bold text-2xl text-blue-500">Total Comments : {(post.Comments.length)} |</span>
                    <span className="mr-3 font-bold text-2xl text-green-600">Total Like : {post.Likes} |</span>
                    <span className="mr-3 font-bold text-2xl text-red-400">Total Views : {post.views}</span>
                  </div>
                </div>

                <div>
                  <div className="w-full flex justify-center items-center overflow-hidden">
                    <img
                      className="min-w-2/3 h-64 flex-shrink-0 rounded-lg"
                      src={post.FeaturedImage}
                      alt="feature image"
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