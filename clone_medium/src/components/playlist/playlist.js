import axios from 'axios';
import React, { useState , useEffect} from 'react'
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';

function Playlist() {

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'authToken': jwtToken,
    };


const [createList , setCreateList] = useState('')
const [loading , setLoading] = useState(true);
const [lists , setLists ] = useState([])
const [posts , setPosts] = useState([]);
const [selectedListId, setSelectedListId] = useState(null);



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


useEffect (()=>{
    fetchList();
    setLoading(false)
},[])



 const handleListCreate = ()=>{
    console.log(createList)
     axios.post('http://127.0.0.1:3000/playlists/create' , {'name':createList} , {headers} )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });
    setCreateList("")
 }

 const handleListPost = (list_id)=>{
    setSelectedListId(list_id);
    axios.get(`http://127.0.0.1:3000//playlists/show/playlist/post/${list_id}` , {headers} )
    .then((response) => {
        setPosts(response.data)
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });
 }

if(loading)
return <>Loading...</>

  return (
    <div className='flex flex-col justify-center items-center w-4/5 m-auto'>
        <div className='p-10 w-full flex flex-col'>
            <div className='flex'>
                <input
                value={createList}
                onChange = {(e)=>{setCreateList(e.target.value)}}
                 type='text' placeholder='create List...' className='p-5 shadow-md shadow-gray-400 rounded-lg w-full text-xl text-black m-5'/>
                <button onClick={handleListCreate} className='bg-blue-400 rounded-lg w-20 text-2xl m-5 p-5'>
                    <i class="fa fa-plus"></i>
                </button>
            </div>


            <div>
                <div className='mt-10'>
                {
                    lists.map(list =>{
                        return <>
                        <span onClick={(e)=>{handleListPost(list.id)}} className = {`p-3 rounded-lg cursor-pointer w-60
                        ${ selectedListId === list.id ? 'bg-green-500' : '' } mr-10 m-2 border-b-2 border-green-500 text-2xl`}>{list.name}</span>
                        </>
                    })
                }
                </div>
            </div>
            
            <div>
       <h1 className='text-blue-950 font-bold text-3xl mb-5 max-sm:mt-5 mt-20'>Post:</h1>
       <div className="flex mr-10 w-full overflow-x-auto ">
          {posts.map((post) => {
            return (
              <Link to={`/${post.id}`} className=' flex max-sm:flex-col p-5 max-sm:justify-start justify-center bg-gray-100 shadow-lg shadow-black-500/50 mb-8 mr-4 w-1/3 max-sm:w-full  hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95'>
                <div className='flex justify-center'>
                  <div className= "w-60 h-60 m-2   max-sm:w-full max-sm:h-30 flex justify-center overflow-hidden">
                    <img
                      className="rounded-lg"
                      src={post.image}
                      alt="feature_photo"
                    />
                  </div>
                </div>


                <div className="p-2 m-2 rounded-md w-96 h-72">
                  <div className="p-2 font-bold text-lg text-bold">
                    <h3>{post.author_name}</h3>
                  </div>
                  <div className="w-full text-left h-16 overflow-hidden">
                    <h2 className=' text-2xl font-bold'>{post.title}</h2>
                  </div> <span classname="font-bold">...</span>
                  <div className="w-full text-justify  mt-3 mb-1 h-20 overflow-hidden">
                    <p className='text-lg'>
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.text}</ReactMarkdown></p>
                  </div>
                  <span classname="font-bold">...</span>
                  <div className="w-full mt-4">
                  <span className="mr-3 font-light">29 Jan 2023</span>
                    <span className="mr-3 font-light">{post.reading_time} min</span>
                    <span className="mr-3 font-bold text-blue-500">{post.topic}</span>
                  </div>
                </div>
            
            </Link>
            );
          })}
        </div>
    </div>
        </div>
    </div>
  )
}

export default Playlist