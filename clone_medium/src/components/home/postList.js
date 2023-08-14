import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../styles/image.webp";
import TopPost from "./topPost";
import Topic from "./topic";
import axios from "axios";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import DisplayDate from "../displayDate";


function PostList() {

  const navigate = useNavigate();
  const [posts , setPosts ] = useState([])
  const [searchText , setSearchText] = useState('');
  const [filterDate , setFilterDate] =useState('');
  // const [filterAuthor , setFilterAuthor] = useState('');
  const [authors , setAuthors] = useState([])
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors()
    fetchPosts()
    setLoading(false)
  
}, [])

//searchText , filterAuthor , filterDate

  const fetchPosts = () =>{
    axios.get('http://127.0.0.1:3000/posts/all')
    .then((response) => {
      setPosts(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    })
  }

  const fetchAuthors = () =>{
    axios.get('http://127.0.0.1:3000/author/showAll')
    .then((response) => {
      setAuthors(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    })
  }


 




  const handleSearch = async(e)=>{
    setSearchText(e.target.value)
    await axios.get(`http://127.0.0.1:3000/posts/search?search=${searchText}`)
    .then((response) => {
      setPosts(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    })
  }

  const handleFilterAuthor = async(e)=>{

    await axios.get(`http://127.0.0.1:3000/get/post/author/${e.target.value}`)
    .then((response) => {
      setPosts(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    })
  }

  const handleFilterLikeComment = async(e)=>{
    await axios.get(`http://127.0.0.1:3000/get/post/filter/likesAndComments/${e.target.value}`)
    .then((response) => {
      setPosts(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    })
  }

  const handleFilterDate = async(e)=>{
    setFilterDate(e.target.value)
    await axios.get(`http://127.0.0.1:3000/get/post/filter/date/${e.target.value}`)
    .then((response) => {
      setPosts(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    })
  }



  if(loading)
    return <>Loading...</>


console.log(posts)


  return (
    <>
    <div className="flex justify-center m-20 max-sm:m-0 max-sm:p-10">
   <div className="border-b-2 w-full">
   <TopPost/>
   </div>
    </div>
      <div className="flex max-sm:flex-wrap max-sm:justify-start max-sm:full  max-sm:m-5 
      justify-center m-10 ml-28 mr-28 p-5 max-sm:ml-0
       max-sm:mr-0 border-2 rounded-2xl border-gray-400 hover:border-blue-500">
        <input className="p-5 rounded-lg shadow-lg shadow-gray-400 w-1/3 max-sm:w-2/3 max-sm:p-3 max-sm:m-2  text-2xl m-10 border-none" value={searchText} onChange={handleSearch} type="text" placeholder="Search..." />
        <select
              className="p-5 rounded-lg shadow-lg shadow-gray-400 w-72 
              max-sm:w-1/3 max-sm:p-2 max-sm:m-2  text-2xl m-10 border-none" 
             onChange={handleFilterAuthor} 
               placeholder="Filter by Author..."
            >
              <option value=''>Filter by Author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
        <div className="flex justify-center items-center">
        <span className="text-blue-900 text-xl max-sm:text-lg font-bold">Filter by date: </span>
        <input className="p-5 rounded-lg shadow-lg shadow-gray-400 w-72 
        max-sm:w-full max-sm:p-2 max-sm:m-2  text-2xl m-10 border-none"  
        value={filterDate} onChange={handleFilterDate} 
        type="date" placeholder="Filter by Date..." />
        <select
              className="p-5 rounded-lg shadow-lg shadow-gray-400 w-72 
              max-sm:w-1/3 max-sm:p-2 max-sm:m-2  text-2xl m-10 border-none" 
             onChange={handleFilterLikeComment} 
               placeholder="Filter by Like and Comment..."
            >
              <option value=''>Filter by ...</option>
                <option  value='likes'> Likes   </option>
                <option  value='comments'> Comments   </option>
            </select>
        </div>
      </div>

    <div className="flex max-sm:ml-10 max-sm:mt-5 justify-start  ml-20">
    <h1 className='text-blue-950 font-bold text-3xl mb-5 '>Explore Amazing Articles</h1>
    </div>
      <div className="flex max-sm:flex-col max-sm:m-5 max-sm:mt-0 justify-center m-20  mt-5 ">

        <div className="flex flex-col justify-center items-start mr-10 max-sm:mr-0" >
          <div className="flex flex-col max-sm:m-5 max-sm:mr-0 justify-center items-start mr-10 ">
          {posts.map((post) => {
            return (
              <Link to ={`/${post.id}`} className="flex max-sm:flex-col-reverse p-10 max-sm:p-5 justify-center items-center w-full  mb-8 bg-gray-100 shadow-md shadow-gray-300  hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95">
                <div className="p-4 m-4 rounded-md w-full">
                  <div className="p-2 font-bold text-2xl max-sm:text-xl text-gray-600 max-sm:p-0">
                    <h2>{post.author_name}</h2>
                  </div>
                  <div className="w-full text-left pr-10 max-sm:pr-0">
                    <h1 className="font-bold text-4xl max-sm:text-3xl">{post.title}</h1>
                  </div>
                  <div className="w-full text-justify mt-1 mb-1 max-sm:mt-2 max-sm:mb-0 max-sm:h-12 pr-10 h-16 overflow-hidden">
                    <p className="text-gray-600 max-sm:text-2xl"><ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.text}</ReactMarkdown></p>
                  </div>

                  <div className="w-full mt-16">
                    <span className="mr-3 font-light"> <DisplayDate publishedAt={post.published_at} /></span>
                    <span className="mr-3 font-light">{post.reading_time} min</span>
                    <span className="mr-3 font-bold text-blue-500">{post.topic}</span>
                    <span className="mr-10 ml-10 font-bold text-2xl text-red-500">
                      <i class="fa fa-thumbs-up mr-1"></i> {post.likes_count}</span>
                    <span className="mr-3 text-2xl font-bold text-green-500">
                    <i class="fa fa-comment mr-1"></i> {post.comments_count}</span>
                  </div>
                </div>

                <div>
                  <div className="w-full flex justify-center items-center overflow-hidden">
                    <img
                      className="min-w-2/3 h-64 flex-shrink-0 rounded-lg"
                      src={post.image}
                      alt="featurePhoto"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
          </div>
        </div>

          <div className="h-96 w-2/3 sticky top-36 max-sm:h-auto max-sm:w-full max-sm:static">
           <Topic/>
          </div>
      </div>
    </>
  );
}

export default PostList;


