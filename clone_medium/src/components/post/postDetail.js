import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../styles/image.webp";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Comments from  '../post/comment'
import {UserContext} from '../contextApi/contextApi'

function PostDetail() {
  const { id } = useParams();
  const { checkUser , user  }  = useContext( UserContext );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const handleFollow = async(author , userId)=>{
    console.log(`followed author ${author}`)

    const expt = await fetch("/addExperts" ,{
              method:"POST" ,
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({author , id , userId })
            });
          
            const data = await expt.json();
            
            if(data.status === 501 || !data)
            {
              window.alert("Invalid Credentials");
              console.log("Invalid Credentials");
          }
              if(data.error){
                window.alert("Invalid Credentials")
              }
            else
            {
                console.log("login successful");
               window.location.reload();
                
            }
  }



  const handleLikes = (id) =>{
    console.log(`Liked the post with id = ${id}`)
  }




  const handleSaveforLater = (id) =>{
    console.log(`saved for later  with id ${id}`)
    // have to send post request
  }


  // const [posts , setPosts ] = useState()
  // const [loading , setLoading ] = useState(false)
  // const fetchPosts = async() =>{
  //     const res = await fetch("/getPostsDetail" , {
  //         method:"GET" ,
  //         headers:{
  //             "Content-Type":"application/json",
  //             "id":id
  //         }
  //     });

  //     const result = await  res.json();
  //     setPosts(result);
  // }

  // const [comment , setComment] = useState('');
  // const fetchCommment = async() =>{
  //   const res = await fetch("/getComment" , {
  //             method:"GET" ,
  //             headers:{
  //                 "Content-Type":"application/json",
  //                 "id":id
  //             }
  //         });
    
  //         const result = await  res.json();
  //         setComment(result);
  // }

  //   useEffect(() => {
  //   fetchPosts()
  //   fetchComment()
  //   setLoading(false);
  // }, [])



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


  const comments = [
    {
      name:'Jone Witch',
      comment : 'The post is amazing. The quality of writing is extraordinary. Wish you a happy life ahead!',
      date:'23 Jan 2023',
      time:'7:28 pm'
    },
    {
      name:'Jone Witch',
      comment : 'The post is amazing. The quality of writing is extraordinary. Wish you a happy life ahead!',
      date:'23 Jan 2023',
      time:'7:28 pm'
    },
    {
      name:'Jone Witch',
      comment : 'The post is amazing. The quality of writing is extraordinary. Wish you a happy life ahead!',
      date:'23 Jan 2023',
      time:'7:28 pm'
    }
  ]


  console.log(post);





  // if(loading)
  // return <>Loading...</>

  return (
    <>
      <div className="flex m-32 max-sm:m-10 flex-col justify-center">
        <div className='flex justify-center max-sm:flex-col '>
                <h1 className='text-center font-bold text-black text-7xl max-sm:text-3xl'>{post[0].Title}</h1>
                <span className="ml-10 p-4 bg-green-300 rounded-xl font-bold cursor-pointer text-2xl max-sm:text-xl max-sm:w-1/3" onClick={ (e)=> {handleSaveforLater(post[0].id)}}>Save for Later</span>
            </div>
        <div>
          <div className="flex justify-center items-center">
            <Link to={`/profile/${post[0].Author}`}><span className="text-4xl text-red-800 p-5 hover:underline">{post[0].Author}</span></Link>
            <span className="text-blue-500 text-2xl font-bold p-5 cursor-pointer" onClick={()=> { handleFollow(post[0].Author , user.id)}}>
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
            <span className="text-xl text-gray-600 pb- pr-5 font-bold underline hover:cursor-pointer text-purple-700" onClick={ ()=> { handleLikes(post[0].id) }}>
              Like this Post
            </span>
          </div>
        </div>
        <div className="mt-10 flex justify-center items-center">
          <p className="text-justify w-1/2 max-sm:w-full " >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post[0].postData}</ReactMarkdown>
            </p>
        </div>
      <div className="flex max-sm:flex-col justify-center m-10">
      <div className="flex flex-col mt-16 bg-gray-100 p-10 ">
      <h1 className="text-start text-blue-500 mb-5">Comments: </h1>
      <div className="h-4/5 overflow-y-auto">
      {
        comments.map(comment =>{
          return(
            <div className="w-4/5 bg-gray-50 shadow-md shadow-gray-300 rounded-lg p-5 mt-5 mb-5">
        <h2 className="text-lg bg-gray-100 p-2 rounded-md text-red-600">{comment.name}
        </h2>
        <p className="text-2xl p-2 text-black font-light">{comment.comment}</p>
        <div>
        <span className="pl-2 mr-8 text-gray-600">{comment.date}</span>
          <span className="text-gray-600">{comment.time}</span>
        </div>
      </div>
          )
        })
      }
      </div>
      </div>
      <Comments postId = {post[0].id} />
      </div>
      </div>

    </>
  );
}

export default PostDetail;

