import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import image from '../../styles/image.webp'
import { Link} from 'react-router-dom';
import axios from 'axios';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import Playlist from '../playlist/playlist';

function QuickLinkPage() {

  const jwtToken = localStorage.getItem('jwtToken');
  const headers = {
    'authToken': jwtToken,
  };
  const navigate = useNavigate()
  const {userId , link } = useParams()
  const [draftPost , setDraftPost ] = useState([])
  const [saveForLater , setSaveForLater ] = useState([])
  const [followers , setFollowers ] = useState([])
  const [loading , setLoading ] = useState(true)


  const fetchDraftPost = async() =>{
    axios.get('http://127.0.0.1:3000/draft/get/all' ,  {headers})
      .then((response) => {
        setDraftPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }

  const fetchSaveForLetter = async() =>{
    axios.get('http://127.0.0.1:3000/author/savedPosts' ,  {headers})
      .then((response) => {
        setSaveForLater(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }




  useEffect(() => {

    window.scrollTo(0, 0);
    if(link === 'Draft')
      fetchDraftPost()
    else if(link === 'Save for Later')
      fetchSaveForLetter();
    setLoading(false);

  }, [])


  

    const posts = [
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

const handleDeleteDraft = async(id) =>{
      await axios.delete(`http://127.0.0.1:3000/draft/publish/${id}` , {headers})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
      navigate('/profile')
}

const handleEdit = (id)=>{
    navigate('/write' , {state:{draft_id:id}})
}


const DraftList = () =>{
  return <>
  <div>
       <h1 className='text-blue-950 font-bold text-3xl mb-5 mt-20 text-center'> Articles on {link}: </h1>
       <div className="flex flex-wrap mr-10 w-full justify-center ">
        {draftPost.length === 0 ?
        <><h1 className='mt-60 text-gray-400 font-light'>No Articles in Draft</h1></>:<></>}
          {draftPost.map((post) => {
            return (
              <div className=' flex max-sm:flex-col max-sm:w-3/5 p-5 justify-center bg-gray-100 shadow-lg shadow-black-500/50 mb-8 mr-4 w-1/3 
               hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95'>
                <div className='flex justify-center'>
                  <div className="w-60 h-60 max-sm:w-full m-2 flex justify-center  overflow-hidden">
                    <img
                      className="rounded-lg"
                      src={post.image}
                      alt="feature_photo"
                    />
                  </div>
                </div>


                <div className="p-2 m-2 rounded-md w-96 h-80">
                  <div className="p-2 font-bold text-lg text-bold">
                    <h3>{post.author_name}</h3>
                  </div>
                  <div className="w-full text-left h-24 mb-5 overflow-hidden">
                    <h2 className=' text-2xl font-bold'>{post.title}</h2>
                  </div>
                  <div className="w-full text-justify max-sm:w-4/5 mt-1 mb-1 h-20 overflow-hidden">
                    <p className='text-lg'><ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.text}</ReactMarkdown></p>
                  </div>

                  <div className="w-full mt-4 max-sm:mt-10">
                  {/* <span className="mr-3 font-light">19 Jan 2023</span>
                    <span className="mr-3 font-light">25 min</span> */}
                    <span>Topic: </span><span className="mr-3 font-bold text-blue-500"> {post.topic}</span>
                  </div>
                  <div className='mt-5'>
                    <button onClick={()=>{handleEdit(post.id)}} className='text-xl bg-gray-400 p-3 mr-5 rounded-lg'
                    >Edit</button>
                    <button className='text-xl bg-red-500 p-3 rounded-lg' onClick={()=>{
                      handleDeleteDraft(post.id)
                    }}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  </>
}


const SaveForLaterList = () =>{
  return <>
  <div>
       <h1 className='text-blue-950 font-bold text-3xl mb-5 mt-20 text-center'> Articles on {link}</h1>
       <div className="flex flex-wrap mr-10 w-full justify-center ">
       {saveForLater.length === 0 ?
        <><h1 className='mt-60 text-gray-400 font-light'>No Articles in Save For Later</h1></>:<></>}
          {saveForLater.map((post) => {
            return (
              <Link to={`/${post.post_id}`} className=' flex max-sm:flex-col max-sm:w-3/5 p-5 justify-center bg-gray-100 shadow-lg shadow-black-500/50 mb-8 mr-4 w-1/3 
               hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95'>
                <div className='flex justify-center'>
                  <div className="w-60 h-60 max-sm:w-full m-2 flex justify-center  overflow-hidden">
                    <img
                      className="rounded-lg"
                      src={post.featured_image}
                      alt="feature_photo"
                    />
                  </div>
                </div>


                <div className="p-2 m-2 rounded-md w-96 h-72">
                  <div className="p-2 font-bold text-lg text-bold">
                    <h3>{post.author_name}</h3>
                  </div>
                  <div className="w-full text-left h-24 mb-5 overflow-hidden">
                    <h2 className=' text-2xl font-bold'>{post.post_title}</h2>
                  </div>
                  <div className="w-full text-justify max-sm:w-4/5 mt-1 mb-1 h-20 overflow-hidden">
                    <p className='text-lg'><ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.text}</ReactMarkdown></p>
                  </div>

                  <div className="w-full mt-4 max-sm:mt-10">
                  <span className="mr-3 font-light">19 Jan 2023</span>
                    <span className="mr-3 font-light">25 min</span>
                    <span className="mr-3 font-bold text-blue-500">{post.topic}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
    </div>
  </>
}


const Others = () =>{
  return <>
  <div>
       <h1 className='text-blue-950 font-bold text-3xl mb-5 mt-20 text-center'> Articles on {link}</h1>
       <div className="flex flex-wrap mr-10 w-full justify-center ">
          {posts.map((post) => {
            return (
              <Link to={`/`} className=' flex max-sm:flex-col max-sm:w-3/5 p-5 justify-center bg-gray-100 shadow-lg shadow-black-500/50 mb-8 mr-4 w-1/3 
               hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95'>
                <div className='flex justify-center'>
                  <div className="w-60 h-60 max-sm:w-full m-2 flex justify-center  overflow-hidden">
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
                  <div className="w-full text-left h-24 mb-5 overflow-hidden">
                    <h2 className=' text-2xl font-bold'>{post.Title}</h2>
                  </div>
                  <div className="w-full text-justify max-sm:w-4/5 mt-1 mb-1 h-20 overflow-hidden">
                    <p className='text-lg'><ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.postData}</ReactMarkdown></p>
                  </div>

                  <div className="w-full mt-4 max-sm:mt-10">
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
  </>
}


const Follow = () =>{
  const fakeFollowers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    // ... add more fake followers here
  ];
  return (
<div className="w-96 mt-0 mb-0 ml-auto mr-auto flex flex-col">
<h1 className="text-center mt-40">Followers</h1>
      {fakeFollowers.map(follower => (
        <div key={follower.id} className="flex shadow-lg shadow-gray-400 p-10 mb-10 items-center">
          <div className="flex-1 font-bold ">{follower.id}</div>
          <i class="fa fa-user fa-lg"></i>
          <div className="flex-1 pl-10">
            <div className="font-bold">{follower.name}</div>
            <div className="text-green-500">{follower.email}</div>
          </div>
        </div>
      ))}
    </div>
  )
}





if(loading)
return <>Loading...</>

if(link==='Draft')
return <><DraftList/></>
if(link === 'Save for Later' ) 
return <><SaveForLaterList/></>

if(link === 'Followers')
return <><Follow/></>

if(link === 'Revision history')
return <><Others/></>

if(link === 'List')
return <><Playlist/></>

}

export default QuickLinkPage








  
