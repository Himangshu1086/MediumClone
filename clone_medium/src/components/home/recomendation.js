import React, { useEffect, useState } from "react";
import image from "../../styles/image.webp";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function Recomendation() {


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
  ];




  const [posts , setPosts] = useState([])
  const [loading , setLoading] = useState(true);

  const fetchTopPost = async() =>{
    await axios.get('http://127.0.0.1:3000/get/topPosts')
    .then((response) => {
      if(response.data==[])
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
      <div className="m-20 ">
        <div>
          <h1 className="text-black font-bold text-3xl mb-8 max-sm:ml-10 max-sm:mt-5 max-sm:mb-5 ">
            Recomended for you
          </h1>
        </div>

        <div className="flex flex-wrap w-full justify-start max-sm:justify-center mr-10 max-sm:mr-0">
          {posts.map((post) => {
            return (
                <Link to={post.id}  className="flex max-sm:flex-col max-sm:w-full p-5 justify-center w-1/5 mb-8 mr-4 bg-gray-100 shadow-lg shadow-black-500/50  hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95">
                  <div className="flex justify-center">
                    <div className="w-60 h-60 max-sm:w-full m-2 flex justify-center  overflow-hidden">
                      <img
                        className="min-w-1/3 rounded-lg"
                        src={post.image}
                        alt="featurePhoto"
                      />
                    </div>
                  </div>

                  <div className="p-2 m-2 rounded-md w-full h-72 overflow-hidden">
                    <div className="p-2 max-sm:p-0  text-gray-600 font-bold text-lg text-bold">
                      <h3>{post.author_name}</h3>
                    </div>
                    <div className="w-full text-left overflow-hidden h-16 overflow-hidden">
                      <h2 className=" text-2xl font-bold">{post.title}</h2>
                    </div>
                    <div className="w-full text-justify  mt-1 mb-1 h-20 overflow-hidden">
                      <p className="text-lg text-gray-600">
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.text}</ReactMarkdown>
                      </p>
                    </div>

                    <div className="w-full mt-3 text-gray-600">
                      <span className="mr-3 font-light">31 July 2023</span>
                      <span className="mr-3 font-light">{post.reading_time}</span>
                      <br />
                      <span className="mr-3 font-bold text-blue-400 ">{post.topic}</span>
                    </div>
                  </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Recomendation;
