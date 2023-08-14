import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../styles/image.webp";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Comments from  '../post/comment'
import {UserContext} from '../contextApi/contextApi'
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function PostDetail() {
  const { id } = useParams();
  const { checkUser , user  }  = useContext( UserContext );
    const [posts , setPosts ] = useState([])
  const [loading , setLoading ] = useState(true)
  const [comment,setComment]=useState('');
  const [IsComment , setIsComment] = useState(false);
  const [isLiked, setIsLiked] = useState('false');
  const [isFollow, setIsFollow] = useState('false');
  const [comments , setComments ] = useState([]);
  const jwtToken = localStorage.getItem('jwtToken');
  var flag=false;

  const headers = {
    'authToken': jwtToken
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
    fetchComment();
    add_views();
    setLoading(false);
  }, [isLiked,IsComment]);




const fetchPosts = async() => {

    try {
      await axios.get(`http://127.0.0.1:3000/get/post/${id}`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });
    } catch (error) {
      console.error('Error fetching main API data:', error);
    }
    // setLoading(false);
}


const fetchComment = async()=>{
  await axios.get(`http://127.0.0.1:3000/comment/all/${id}`)
  .then((response) => {
    setComments(response.data);
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error fetching posts:', error);

  });
  // setLoading(false);
}


const add_views = async() =>{
  try {
    await axios.post(`http://127.0.0.1:3000/add/view/${id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);

    });
  } catch (error) {
    console.error('Error fetching main API data:', error);
  }
}


  const handleFollow = async( )=>{
    axios.post(`http://127.0.0.1:3000/author/follow/${posts.author_id}`,{},{headers})
    .then((response) => {
      setIsFollow((prev)=>!prev);
      console.log(response.data);
      alert(`you are now following ${posts.author_name}`)
    })
    .catch((error) => {
      console.log(headers);
      console.log('cannot put there');
      console.error('Error fetching posts:', error);

    });
  }



  const handleLikes = () =>{
    axios.post(`http://127.0.0.1:3000/like/create/${id}`,{},{headers})
    .then((response) => {
      setIsLiked(true);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });
  }

  const handleDisike = () =>{
    axios.delete(`http://127.0.0.1:3000/like/remove/${id}`,{headers})
      .then((response) => {
        setIsLiked(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }



  const handleSaveforLater = () =>{
    axios.post(`http://127.0.0.1:3000/author/saveForLater/${id}`, {}, { headers })
      .then((response) => {
        console.log(response.data);
        alert('Saved for later')
      })
      .catch((error) => {
        console.log('cannot put there');
        console.error('Error fetching posts:', error);

      });
  }




  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setComment(data)
  };


 const handleComment = async(e) =>{
  e.preventDefault()
  const Comment = {
    post_id: id,
    text: comment
  }
  axios.post('http://127.0.0.1:3000/comment/create', Comment, { headers })
  .then((response) => {
    console.log(response.data);
    setComment('')
  })
  .catch((error) => {
    console.log('cannot put there');
    console.error('Error fetching posts:', error);

  });
 
  setIsComment(!IsComment);
 }



  
  if(loading)
  return <>Loading...</>

console.log(comment)


  return (
    <>
      <div className="flex m-32 max-sm:m-10 flex-col justify-center">
        <div className='flex justify-center max-sm:flex-col '>
                <h1 className='text-center font-bold text-black text-7xl max-sm:text-3xl'>{posts.title}</h1>
                <span className="ml-10 p-4 h-24 text-6xl bg-green-300 rounded-xl font-bold cursor-pointer text-2xl max-sm:text-xl max-sm:w-1/3" onClick={handleSaveforLater}><i class="fa fa-save"></i></span>
            </div>
        <div>
          <div className="flex justify-center items-center">
            <Link to={`/profile/${posts.author_id}`}><span className="text-4xl text-red-800 p-5 hover:underline">{posts.author_name}</span></Link>
            <span className="text-blue-500 text-2xl hover:underline font-bold p-5 cursor-pointer" onClick={handleFollow}>
              Follow
            </span>
          </div>
          <div className=" flex justify-center">
            <span className="text-xl text-gray-600 pb-5 pr-5">
              {posts.reading_time} min
            </span>
            <span className="text-xl text-gray-600 pb- pr-5">
              19 Jan 2023
            </span>
          </div>
          <div className=" flex justify-center">
            <span className="text-xl text-gray-600 pb-5 pr-5">
              Total Likes: {posts.likes_count}
            </span>
            <span className="text-3xl text-red-600 pb- pr-5 font-bold underline hover:cursor-pointer text-purple-700" 
            onClick={ handleLikes}>
              <i class="fa fa-thumbs-up" aria-hidden="true"></i>
            </span>
            <span className="text-3xl text-gray-600 pb- pr-5 font-bold underline hover:cursor-pointer text-purple-700" 
            onClick={ handleDisike}>
          <i class="fa fa-thumbs-down"></i>
            </span>
          </div>
        </div>
        <div className="mt-10 flex justify-center items-center">
          <p className="text-justify w-1/2 max-sm:w-full " >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{posts.text}</ReactMarkdown>
            </p>
        </div>
      <div className="flex max-sm:flex-col justify-center m-10">
      <div className="flex flex-col mt-16 bg-gray-100 p-10 ">
        <p className="text-red-500">Total Comments: {posts.comments_count}</p>
      <h1 className="text-start text-blue-500 mb-5">Comments: </h1>
      <div className="h-96 overflow-y-auto">
      {
        comments.map(com =>{
          return(
            <div className="w-96 bg-gray-50 shadow-md shadow-gray-300 rounded-lg p-5 mt-5 mb-5">
        <h2 className="text-lg bg-gray-100 p-2 rounded-md text-red-600">{com.author_name}
        </h2>
        <p className="text-2xl p-2 text-black font-light">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{com.text}</ReactMarkdown></p>
        <div>
        <span className="pl-2 mr-8 text-gray-600">{com.comment_date}</span>
          {/* <span className="text-gray-600">{com.comment_date}</span> */}
        </div>
      </div>
          )
        })
      }
      </div>
      </div>
      {/* <Comments postId = {posts.id} headers={headers}/> */}
      <div className='p-5 mt-10'>
    <div className="h-auto flex m-auto w-full p-5 rounded-xl shadow-2xl">
    <div className='w-full'>
        <form>
                  <div className="input-block">
                    <label htmlFor="postText" className="input-label">
                    Comment:
                    </label>
                    <CKEditor editor={ClassicEditor} value={comment} onChange={handleEditorChange} />      
                  </div>


                  <div className="modal-buttons">
                    <button className="input-button" onClick={handleComment}>
                      Add Comment
                    </button>
                  </div>
                </form>
        </div>


    </div>
    </div>
      </div>
      </div>

    </>
  );
}

export default PostDetail;

