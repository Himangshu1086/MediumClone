import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../../styles/image.webp";
import TopPost from "./topPost";
import Topic from "./topic";


function PostList() {

  const [posts , setPosts ] = useState('')
  const [searchText , setSearchText] = useState('');
  const [filterDate , setFilterDate] =useState('');
  const [filterAuthor , setFilterAuthor] = useState('');
  const [loading , setLoading] = useState(true);


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



const postss = [
    {
      id:"1",
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
      id:"2",
      Title: "Sample Post 2",
      Author: "John Smith",
      Date: "August 3, 2023",
      Time: "12 min",
      Topic: "College",
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
      FeaturedImage: image,
      postData: "This is the content of Sample Post 3...",
    },
    {
      id:"2",
      Title: "Sample Post 2",
      Author: "John Smith",
      Date: "August 3, 2023",
      Time: "12 min",
      Topic: "College",
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
      FeaturedImage: image,
      postData: "This is the content of Sample Post 3...",
    }
  ]



  useEffect(() => {
    setPosts(postss)
    setLoading(false)

  // fetchPosts()
  
}, [searchText , filterAuthor , filterDate])



  const handleSearch = (e)=>{
    setSearchText(e.target.value)
    //POST REQUEST API call for the search with the particular search text

    // the response for the GET API lets say data  --->   setPost(data);

  }

  const handleFilterAuthor = (e)=>{
    setFilterAuthor(e.target.value)
    //POST REQUEST API call for the filter with the particular filter tag
    // the response for the POST API lets say data  --->   setPost(data);

  }

  const handleFilterDate = (e)=>{
    setFilterDate(e.target.value)
    // POST REQUEST API call for the filter with the particular filter tag

    // the response for the POST API lets say data  --->   setPost(data);

  }



  if(loading)
    return <>Loading...</>


console.log(posts);


  return (
    <>
    <div className="flex justify-center m-20 ">
   <div className="border-b-2 w-full">
   <TopPost/>
   </div>
    </div>
      <div className="flex justify-center m-10 ml-28 mr-28 p-5 bg-blue-200">
        <input className="p-5 rounded-lg shadow-lg shadow-gray-400 w-1/3 text-2xl m-10 border-none" value={searchText} onChange={handleSearch} type="text" placeholder="Search..." />
        <input className="p-5 rounded-lg shadow-lg shadow-gray-400 w-72 text-2xl m-10 border-none" value={filterAuthor} onChange={handleFilterAuthor} type="text" placeholder="Filter by Author..." />
        <div className="flex justify-center items-center">
        <span className="text-blue-900 text-xl font-bold">Filter by date: </span>
        <input className="p-5 rounded-lg shadow-lg shadow-gray-400 w-72 text-2xl m-10 border-none"  value={filterDate} onChange={handleFilterDate} type="date" placeholder="Filter by Date..." />
        </div>
      </div>
    <div className="flex justify-start  ml-20">
    <h1 className='text-blue-950 font-bold text-3xl mb-5 '>Explore Amazing Articles</h1>
    </div>
      <div className="flex justify-center m-20 mt-5 ">

        <div className="flex flex-col justify-center items-start mr-10" >
          <div className="flex flex-col justify-center items-start mr-10 ">
          {posts.map((post) => {
            return (
              <Link to ={post.id} className="flex p-10 justify-center items-center w-full  mb-8 bg-gray-100 shadow-md shadow-gray-300  hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95">
                <div className="p-4 m-4 rounded-md w-full">
                  <div className="p-2 font-bold text-2xl">
                    <h2>{post.Author}</h2>
                  </div>
                  <div className="w-full text-left pr-10">
                    <h1 className="font-bold text-4xl">{post.Title}</h1>
                  </div>
                  <div className="w-full text-justify mt-1 mb-1 pr-10 h-16">
                    <p className="text-gray-600">{post.postData}</p>
                  </div>

                  <div className="w-full mt-16">
                    <span className="mr-3 font-light">{post.Date}</span>
                    <span className="mr-3 font-light">{post.Time}</span>
                    <span className="mr-3 font-bold text-blue-500">{post.Topic}</span>
                  </div>
                </div>

                <div>
                  <div className="w-full flex justify-center items-center overflow-hidden">
                    <img
                      className="min-w-2/3 h-64 flex-shrink-0 rounded-lg"
                      src={post.FeaturedImage}
                      alt="featurePhoto"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
          </div>
        </div>

          <div className="h-96 w-2/3 sticky top-36">
           <Topic/>
          </div>
      </div>
    </>
  );
}

export default PostList;


