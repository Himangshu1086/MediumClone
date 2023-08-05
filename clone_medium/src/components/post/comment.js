import React from 'react'
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function Comments({postId}) {

    const [name , setName] = useState('')
    const [comment , setComment ] = useState('');

    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setComment(data)
    };


   const handleComment = async() =>{
      console.log(name , comment)

      const expt = await fetch("/addcomment" ,{
                method:"POST" ,
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name , comment , postId})
              });
            
              const data = await expt.json();
              
              if(data.status === 501 || !data)
              {
                window.alert("Invalid Credentials");
                console.log("Invalid Credentials");
            }
                if(data.error){
                  window.alert("Invalid Credentials")
                }
              else
              {
                  console.log("login successful");
                //  window.location.reload();
                  
              }
   }
    


  return (
    <div className='p-5 mt-10'>
    <div className="h-auto flex m-auto w-full p-5 rounded-xl shadow-2xl">
    <div className='w-full'>
        <form>
                  <div className="input-block">
                    <label htmlFor="Title" className="input-label">
                    Name:
                    </label>
                    <input
                      value={name}
                      onChange={(e) =>{setName(e.target.value)}}
                    />
                  </div>

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
