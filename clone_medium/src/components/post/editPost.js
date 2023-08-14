import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { PostSchema } from '../form_validation/post_validation';
import { useFormik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserContext } from '../contextApi/contextApi';
import { useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
const jwtToken = localStorage.getItem('jwtToken');


const headers = {
  'authToken': jwtToken,
};

export default function AddPost() {

const navigate = useNavigate()
const [title, setTitle] = useState('');
const [topic, setTopic] = useState('');
const [imageFile, setImageFile] = useState(null); // State to store the selected image file
const [text, setText] = useState('');
const [loading , setLoading] = useState(true);
const {postId } = useParams();

const handleEditorChange = (event, editor) => {
  const data = editor.getData();
  setText(data)
};



useEffect(() => {
    
  axios.get(`http://127.0.0.1:3000/get/post/${postId}`)
    .then((response) => {
      setTitle(response.data.title);
      setTopic(response.data.topic);
      setText(response.data.text);
      setImageFile(response.data.imageFile);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
  
    });
    setLoading(false)
}, []);



const handleImageChange = (e) => {
const file = e.target.files[0];
const formData = new FormData();
formData.append('image', file, 'filename.jpg', { charset: 'utf-8' });

axios.post('http://127.0.0.1:3000/upload',formData,{headers}).then((response)=>{
    setImageFile(response.data.file_url);
})
.catch((error)=>{
    console.log("hello");
    console.error(error);
})
setImageFile(file);
};


// handle topic 
const handleTopic = (e) =>{
  e.preventDefault()
  axios.post('http://127.0.0.1:3000/topic/create', {'name':topic} , {headers} )
  .then((response) => {
    console.log('Post saved!', response.data);
  })
  .catch((error) => {
    console.error('Error saving post:', error);
  });
  // setLoading(false)

}

  // HANDLE OF ADD POST
  
    const addPost = async(e)=>{
      e.preventDefault()
      axios.get('http://127.0.0.1:3000/topic/showAll')
  .then((response) => {
    const postData = {
      title: title,
      topic: topic,
      text: text,
      topic_id:response.data.find( item => item.name === topic).id,
      author_id:1,
      featured_image:imageFile
    };

    axios.put(`http://127.0.0.1:3000/edit/post/${postId}`, postData , {headers})
    .then((res) => {
      console.log('Post saved!', res.data);
    })
    .catch((error) => {
      console.error('Error saving post:', error);
    });
    navigate('/');
  })
  .catch((error) => {
    console.error('Error fetching posts:', error);
  });
      
    }


if(loading)
return <>Loading...</>


  return (
    <div className='p-5 mt-10'>
    <div className="h-auto flex flex-col m-auto w-3/5 p-5 rounded-xl shadow-2xl">
       <div><h1 className=" border-b-2 pb-4 border-blue-400 px-10 m-10 text-4xl mt-10 text-black text-center">
            Edit Post 
        </h1></div>
    <div>
        <form>
                  <div className="input-block">
                    <label htmlFor="Title" className="input-label">
                    Title
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Title"
                      value={title}
                      onChange={(e)=>{setTitle(e.target.value)}}
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="Topic" className="input-label">
                    Topic
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="Topic"
                      id="Topic"
                      placeholder="Topic"
                      value={topic}
                      onChange={(e)=>{setTopic(e.target.value)}}
                    />
                    <button className='bg-blue-400 text-black rounded-xl p-2 w-32 m-2' onClick={handleTopic}>Add Topic</button>
                  </div>
                    <div className="input-block">
                    <label htmlFor="FeaturedImage" className="input-label">
                    Featured Image
                    </label>
                    <input
                      type="file"
                      accept = "image/*"
                      id="FeaturedImage"
                      placeholder="Featured Image"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="input-block">
                    <label htmlFor="postText" className="input-label">
                    Post Text
                    </label>
                    <CKEditor editor={ClassicEditor} data={text} onChange={handleEditorChange} />
                  </div>


                  <div className="modal-buttons">
                    <button className="input-button" onClick ={addPost}>
                      Edit Post
                    </button>
                  </div>
                    
                </form>
        </div>


    </div>
    </div>
  )
}
