
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
import { UserProvider } from './components/contextApi/contextApi';
import TopicList from './components/topic_list/topicList';
import OthersProfile from './components/profile/OthersProfile';
import QuickLinkPage from './components/profile/quickLinkPage';
import EditPost from './components/post/editPost';
import ProtectedRoute from './components/protected_route/protectRoute';
import PaymentProtect from './components/protected_route/paymentProtect'
import Payment from './components/home/Payment';
import EditDraft from './components/post/editDraft';
import Playlist from './components/playlist/playlist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  
  <React.StrictMode>
    <UserProvider>
    <BrowserRouter>
     <div>
      <div className='sticky top-0'>
      <Navbar/>
      </div>
       <Routes>
        <Route path="/" element={<App/>}/>
        <Route path='/topiclist/:topic' element = {<TopicList/>}/>
        <Route path='/profile/:author' element = {<OthersProfile/>}/>
        <Route path='/editPost/:postId' element = {<EditPost/>}/>
        <Route exact path='/' element={<ProtectedRoute/>}>
          <Route path='/profile' element = {<Profile/>}/>
        </Route>
        <Route exact path='/' element={<ProtectedRoute/>}>
          <Route path='/draft/edit/:draft_id' element = {<EditDraft/>}/>
        </Route>
        <Route path='/signin' element = {<SignIn/>}/>
        <Route path='/signup' element = {<SignUp/>}/>
        <Route exact path='/' element={<ProtectedRoute/>}>
          <Route path='/write' element = {<AddPost/>}/>
        </Route>
        <Route exact path='/' element={<PaymentProtect/>}>
          <Route path='/:id' element={<PostDetail/>}/>
        </Route>
        
       <Route exact path='/' element={<ProtectedRoute/>}>
          <Route exact path='/:userId/:link' element={<QuickLinkPage/>}/>
        </Route>
        <Route path='/payment' element = {<Payment/>} />
      </Routes>
     </div>
    </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

