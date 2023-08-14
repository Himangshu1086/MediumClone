
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contextApi/contextApi';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function UserPost() {

  const [userPost , setUserPost] = useState([])
  const [lists , setLists] = useState([])
  const [loading , setLoading ] = useState(true)
  const [IsDelete , setIsDelete] = useState(false);
  const {checkUser , user } = useContext(UserContext)
  const jwtToken = localStorage.getItem('jwtToken');
  const headers = {
      'authToken': jwtToken,
  };
  const navigate = useNavigate();

  
  const fetchUserPost = () =>{

     axios.get('http://127.0.0.1:3000/get/myPost', { headers })
    .then((response) => {
      setUserPost(response.data);
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error fetching posts:', error);
    });
  }

  const fetchList  = ()=>{
    axios.get('http://127.0.0.1:3000/playlists/show/all' ,  {headers} )
    .then((response) => {
        setLists(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });
}

  useEffect(()=>{
    fetchUserPost();
    fetchList();
    setLoading(false)
  },[IsDelete])




  // Delete handle
  const handleDelete = async (id) =>{
   await axios.delete(`http://127.0.0.1:3000/delete/posts/${id}`,{headers})
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error fetching posts:', error);

    });
    setIsDelete(!IsDelete)
    };



    const handleListId = async(id , List)=>{
      await axios.post('http://127.0.0.1:3000/playlists/add/post',
      {'playlist_id':List , 'post_id':id} , {headers} )
      .then((response) => {
          console.log(response.data);
      })
      .catch((error) => {
          console.error('Error fetching posts:', error);
      });
    }



      if(loading)
      return <>Loading...</>

      console.log(userPost)


  return (
    <div>
         <div className="flex justify-center mt-20 max-sm:mt-10">
            <h1 className='text-blue-950 font-bold text-6xl mb-5 text-center max-sm:text-5xl '>My Post:</h1>
    </div>
      <div className="flex justify-center m-20 mt-5 ">

        <div className="flex flex-col justify-center items-start mr-10 max-sm:mr-0" >
          <div className="flex flex-col justify-center items-start mr-10 max-sm:mr-0 ">
          {userPost.map((post) => {
            return (
              <div className="flex max-sm:flex-col-reverse p-10 justify-center items-center w-full  mb-8 bg-gray-100 shadow-md shadow-gray-300 hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95">
                <div className="p-4 m-4 rounded-md w-full">
                  <div className="w-full text-left pr-10">
                    <h1 className="font-bold text-4xl max-sm:text-3xl">{post.title}</h1>
                  </div>
                  <div className="w-full text-justify mt-1 mb-1 pr-10 h-28 overflow-hidden">
                    <p className="text-gray-600 w-4/5 max-sm:w-full max-sm:text-xl">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.text}</ReactMarkdown>
                    </p>
                  </div><Link to={`/${post.id}`} className='ml-5 text-red-500 text-2xl'>Read More</Link>

                  <div className="w-full mt-5 max-sm:mt-16 max-sm:flex max-sm:flex-wrap">
                    <span className="mr-3 font-light">19 Jan 2023</span>
                    <span className="mr-3 font-light">{post.reading_time} min</span>
                    <span className="mr-3 font-bold text-blue-500">{post.topic}<span className='pl-2 pr-2 text-2xl'>|</span></span>
                    <span className="mr-3 font-bold text-2xl text-blue-500">Total Comments : {(post.comments_count)} |</span>
                    <span className="mr-3 font-bold text-2xl text-green-600">Total Like : {post.likes_count} |</span>
                    <span className="mr-3 font-bold text-2xl text-red-400">Total Views : {post.view_count}</span>
                    <Link to={`/editPost/${post.id}`} className="mr-3 font-bold text-2xl bg-gray-600 text-white rounded-md p-3 cursor-pointer ">Edit</Link>
                    <span className="mr-3 font-bold text-2xl bg-red-500 text-white rounded-md p-3 cursor-pointer" onClick={(e) => {handleDelete(post.id)}}>Delete</span>
                    <select
              className="p-5 rounded-lg shadow-lg shadow-gray-400 w-72 
              max-sm:w-1/3 max-sm:p-2 max-sm:m-2  text-2xl m-10 border-none" 
             onChange={(e)=>{handleListId(post.id,e.target.value)}} 
               placeholder="Add to List..."
            >
              <option value=''>Add to list...</option>
              {lists.map((list) => (
                <option key={list.id} value ={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
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
  )
}

export default UserPost