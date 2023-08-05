
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { PostSchema } from '../form_validation/post_validation';
import { useFormik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserContext } from '../contextApi/contextApi';
import { useLocation, useNavigate } from 'react-router-dom';


export default function EditPost() {

    const location = useLocation();
    const post = location.state;
    
    console.log(post)


  const navigate = useNavigate();
  const {checkUser, user } = useContext(UserContext);
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
    if(checkUser)
      setLoading(false);
      else
        navigate('/signin')
  },[])




    const [postdata , setPostdata] = useState('')

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setPostdata(data)
      };
    

    const [formData , setFormData] = useState('')

    const initialValues = {
        Title: post.Title,
        Topic: post.Topic,
        FeaturedImage: post.FeaturedImage,
        Date:"",
        Time:"",
        Author:post.Author,
      };

      const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues,
        validationSchema: PostSchema,
        onSubmit: async(values, action) => {
          setFormData(values)

          try {
            const response = await fetch('/editPost', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'id':post.id
              },
              body: JSON.stringify({values , postdata}),
            });
      
            const data = await response.json();
            console.log(data); // Response data from the server after the POST request
          } catch (error) {
            console.error('Error:', error);
          }
          action.resetForm();
          navigate('/profile')
        },
      });


      if(loading)
      return<><h1>loading...</h1></>

      console.log(postdata , formData)

  return (
    <div className='p-5 mt-10'>
    <div className="h-auto flex flex-col m-auto w-3/5 p-5 rounded-xl shadow-2xl">
       <div><h1 className=" border-b-2 pb-4 border-blue-400 px-10 m-10 text-4xl mt-10 text-black text-center">
            Edit Post 
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
                    <CKEditor editor={ClassicEditor} data={post.postData} onChange={handleEditorChange} />
                    {errors.postText && touched.postText ? (
                      <p className="form-error">{errors.postText}</p>
                    ) : null}
                    
                  </div>


                  <div className="modal-buttons">
                    <button className="input-button" type="submit">
                      Edit Post
                    </button>
                  </div>
                </form>
        </div>


    </div>
    </div>
  )
}
