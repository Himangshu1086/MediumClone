
import React, { useContext, useEffect, useState } from 'react'
import image from '../../styles/image.webp'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contextApi/contextApi';

function UserPost() {

  const {checkUser , user } = useContext(UserContext)

  const navigate = useNavigate();

  const [userDetail , setUserDetail] = useState()
  const [loading , setLoading ] = useState(false)

  const fetchUserDetail = async() =>{


      const res = await fetch("/getUserDetail" , {
          method:"GET" ,
          headers:{
              "Content-Type":"application/json",
              "id":user.id
          }
      });
      const result = await  res.json();
      setUserDetail(result);
      setLoading(false);
  }
  useEffect(()=>{
    fetchUserDetail();
  },[user])


  //edit handle
  const handleEdit = (post)=>{
    navigate('/editpost' , {state :post} )
  };



  // Delete handle
  const handleDelete = async (id) =>{
    console.log(id)
    
    try {
      // Send a DELETE request to your server to remove the post from the database
      const response = await fetch("/deletePost", {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-access-token',
          'id':id
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete the post');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    };


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
    <div>
         <div className="flex justify-center mt-20 max-sm:mt-10">
            <h1 className='text-blue-950 font-bold text-6xl mb-5 text-center max-sm:text-5xl '>My Post:</h1>
    </div>
      <div className="flex justify-center m-20 mt-5 ">

        <div className="flex flex-col justify-center items-start mr-10 max-sm:mr-0" >
          <div className="flex flex-col justify-center items-start mr-10 max-sm:mr-0 ">
          {posts.map((post) => {
            return (
              <div className="flex max-sm:flex-col-reverse p-10 justify-center items-center w-full  mb-8 bg-gray-100 shadow-md shadow-gray-300 hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95">
                <div className="p-4 m-4 rounded-md w-full">
                  <div className="w-full text-left pr-10">
                    <h1 className="font-bold text-4xl max-sm:text-3xl">{post.Title}</h1>
                  </div>
                  <div className="w-full text-justify mt-1 mb-1 pr-10 h-16">
                    <p className="text-gray-600 w-4/5 max-sm:w-full max-sm:text-xl">{post.postData}<Link to={`/${post.id}`} className='ml-5 text-red-500'>Read More</Link></p>
                  </div>

                  <div className="w-full mt-5 max-sm:mt-16 max-sm:flex max-sm:flex-wrap">
                    <span className="mr-3 font-light">{post.Date}</span>
                    <span className="mr-3 font-light">{post.Time}</span>
                    <span className="mr-3 font-bold text-blue-500">{post.Topic}<span className='pl-2 pr-2 text-2xl'>|</span></span>
                    <span className="mr-3 font-bold text-2xl text-blue-500">Total Comments : {(post.Comments.length)} |</span>
                    <span className="mr-3 font-bold text-2xl text-green-600">Total Like : {post.Likes} |</span>
                    <span className="mr-3 font-bold text-2xl text-red-400">Total Views : {post.views}</span>
                    <span className="mr-3 font-bold text-2xl bg-gray-600 text-white rounded-md p-3 cursor-pointer " onClick={() => {handleEdit(post)}}>Edit</span>
                    <span className="mr-3 font-bold text-2xl bg-red-500 text-white rounded-md p-3 cursor-pointer" onClick={()=> {handleDelete(post.id)}}>Delete</span>
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
  )
}

export default UserPost