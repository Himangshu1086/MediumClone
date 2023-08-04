
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/signIn'
import SignUp from './components/auth/signUp'
import Navbar from './components/home/navbar';
import AddPost from './components/post/addPost';
import Profile from './components/profile/profile'
import PostDetail from './components/post/postDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <div>
      <div className='sticky top-0'>
      <Navbar/>
      </div>
       <Routes>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/signin' element = {<SignIn/>}/>
        <Route path='/signup' element = {<SignUp/>}/>
        <Route path='/write' element = {<AddPost/>}/>
        <Route path=':id' element={<PostDetail/>}/>
        <Route path="/" element={<App/>}/>
      </Routes>
     </div>
    </BrowserRouter>
  </React.StrictMode>
);

