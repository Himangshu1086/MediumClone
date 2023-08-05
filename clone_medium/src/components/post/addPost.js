import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { PostSchema } from '../form_validation/post_validation';
import { useFormik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserContext } from '../contextApi/contextApi';
import { useNavigate } from 'react-router-dom';


export default function AddPost() {


  // HANDLE OF ADD POST
  
    // const addPost = async(values , postdata )=>{

    //     const expt = await fetch("/addPost" ,{
    //         method:"POST" ,
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({values , postdata})
    //       });
        
    //       const data = await expt.json();
          
    //       if(data.status === 501 || !data)
    //       {
    //         window.alert("Invalid Credentials");
    //         console.log("Invalid Credentials");
    //     }
    //         if(data.error){
    //           window.alert("Invalid Credentials")
    //         }
    //       else
    //       {
    //           console.log("login successful");
    //           nagivate.("/");
              
    //       }
    // }


    //HANDLE SAVE AS DRAFT

    // const addToDraft = async(formData , postdata )=>{

    //     const expt = await fetch("/saveDraft" ,{
    //         method:"POST" ,
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({formData , postdata})
    //       });
        
    //       const data = await expt.json();
          
    //       if(data.status === 501 || !data)
    //       {
    //         window.alert("Invalid Credentials");
    //         console.log("Invalid Credentials");
    //     }
    //         if(data.error){
    //           window.alert("Invalid Credentials")
    //         }
    //       else
    //       {
    //           console.log("login successful");
    //           nagivate.("/");
              
    //       }
    // }

    const [postdata , setPostdata] = useState('')


    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setPostdata(data)
      };
    


    const [formData , setFormData] = useState('')

    const initialValues = {
        Title: "",
        Topic: "",
        FeaturedImage: "",
        Date:"",
        Time:"",
        Author:"",
      };

      const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues,
        validationSchema: PostSchema,
        onSubmit: (values, action) => {
          setFormData(values)
          // addPost(values , postdata)
          action.resetForm();
        },
      });


      const handleSaveForDraft = () =>{
          // addToDraft(formData , postdata);
      }



      console.log(postdata , formData)

  return (
    <div className='p-5 mt-10'>
    <div className="h-auto flex flex-col m-auto w-3/5 p-5 rounded-xl shadow-2xl">
       <div><h1 className=" border-b-2 pb-4 border-blue-400 px-10 m-10 text-4xl mt-10 text-black text-center">
            Add Post 
        </h1></div>
    <div>
        <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label htmlFor="Title" className="input-label">
                    Title
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="Title"
                      id="Title"
                      placeholder="Title"
                      value={values.Title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.Title && touched.Title ? (
                      <p className="form-error">{errors.Title}</p>
                    ) : null}
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
                      value={values.Topic}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.Topic && touched.Topic ? (
                      <p className="form-error">{errors.Topic}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="FeaturedImage" className="input-label">
                    Featured Image
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="FeaturedImage"
                      id="FeaturedImage"
                      placeholder="Featured Image"
                      value={values.FeaturedImage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.FeaturedImage && touched.FeaturedImage ? (
                      <p className="form-error">{errors.FeaturedImage}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="Author" className="input-label">
                    Author 
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="Author"
                      id="Author"
                      placeholder="Author"
                      value={values.Author}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.Author && touched.Author ? (
                      <p className="form-error">{errors.Author}</p>
                    ) : null}
                  </div>

                  <div className="input-block">
                    <label htmlFor="postText" className="input-label">
                    Post Text
                    </label>
                    <CKEditor editor={ClassicEditor} onChange={handleEditorChange} />
                    {errors.postText && touched.postText ? (
                      <p className="form-error">{errors.postText}</p>
                    ) : null}
                    
                  </div>


                  <div className="modal-buttons">
                    <button className="input-button" type="submit">
                      Add Post
                    </button>
                  </div>
                </form>
                <button className="input-button mt-10" onClick={handleSaveForDraft} type="submit">
                      Save as Draft
                    </button>
        </div>


    </div>
    </div>
  )
}
