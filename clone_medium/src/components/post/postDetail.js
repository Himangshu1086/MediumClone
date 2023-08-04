import React from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../styles/image.webp";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Comments from  '../post/comment'

function PostDetail() {
  const { id } = useParams();


  const handlFollow = ()=>{
    console.log('followed')
  }

  const handleLikes = () =>{
    console.log("Liked")
  }

  const post = [
    {
      id: id,
      Title: "Special Report: Extreme Heat and Human Health",
      Author: "John Doe",
      Date: "August 3, 2023",
      Time: "19 min",
      Topic: "Science",
      Likes : 45,
      FeaturedImage: image,
      postData:
        "<p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p><p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p><p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p><p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p><p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p><p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p><p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p><p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p><p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p><p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p>",
    },
  ];

  console.log(post);

  return (
    <>
      <div className="flex m-32 flex-col justify-center">
        <div className='flex justify-center'>
                <h1 className='text-center font-bold text-balck text-7xl'>{post[0].Title}</h1>
            </div>
        <div>
          <div className="flex justify-center items-center">
            <Link to='/profile'><span className="text-4xl text-red-800 p-5 hover:underline">{post[0].Author}</span></Link>
            <span className="text-blue-500 text-2xl font-bold p-5 cursor-pointer" onClick={handlFollow}>
              Follow
            </span>
          </div>
          <div className=" flex justify-center">
            <span className="text-xl text-gray-600 pb-5 pr-5">
              {post[0].Time}
            </span>
            <span className="text-xl text-gray-600 pb- pr-5">
              {post[0].Date}
            </span>
          </div>
          <div className=" flex justify-center">
            <span className="text-xl text-gray-600 pb-5 pr-5">
              Total Likes: {post[0].Likes}
            </span>
            <span className="text-xl text-gray-600 pb- pr-5 font-bold underline hover:cursor-pointer text-purple-700" onClick={handleLikes}>
              Like this Post
            </span>
          </div>
        </div>
        <div className="mt-10 flex justify-center items-center">
          <p className="text-justify w-1/2" >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post[0].postData}</ReactMarkdown>
            </p>
        </div>



      <Comments/>
      </div>

    </>
  );
}

export default PostDetail;

