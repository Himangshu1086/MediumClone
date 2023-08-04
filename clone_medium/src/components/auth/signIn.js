import React, { useState } from "react";
import { useFormik } from "formik";
import { signInSchema } from "../form_validation/signin_validation";
import '../../styles/form.css'
import { Link } from "react-router-dom";


const SignUp = () => {
  
  const initialValues = {
    email: "",
    password: "",
  };
  const [formData , setFormData] = useState('')

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signInSchema,
      onSubmit: (values, action) => {
          setFormData(values)
        action.resetForm();
      },
    });
  console.log(
    "🚀 ~ file: signin.js ~ errors",
    errors
  );


  console.log(formData)

  return (
    <>
        <div className="container mt-40">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-right">
              <img src="https://img.freepik.com/premium-vector/young-woman-enjoy-sitting-reading-book-hygge-concept-vector-illustration_194708-2078.jpg" alt="girl-reading-a-book"/>
              </div>
              <div className="modal-left">
                <h1 className="modal-title">Welcome!</h1>
                <p className="modal-desc">
                  To the Sign In page.
                </p>
                
                <form onSubmit={handleSubmit}>
                  
                  <div className="input-block">
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
    
                  <div className="modal-buttons">
                    <button className="input-button" type="submit">
                      Sign In
                    </button>
                  </div>
                </form>
                <p className="sign-up">
                  Don't have an account? <Link to='/signup'>Sign up </Link>
                </p>
              </div>
              
            </div>
          </div>
        </div>
    </>
  );
};

export default SignUp;