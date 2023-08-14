import React from 'react'
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';


export default function Comments({postId , headers}) {

    const [comment , setComment ] = useState('');

    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setComment(data)
    };


   const handleComment = async(e) =>{
    e.preventDefault()
    const Comment = {
      post_id: postId,
      text: comment
    }
    axios.post('http://127.0.0.1:3000/comment/create', Comment, { headers })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log('cannot put there');
      console.error('Error fetching posts:', error);

    });
    setComment('')
   }
    


  return (
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
  )
}
