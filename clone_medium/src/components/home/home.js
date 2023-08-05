import React from "react";
import PostList from '../home/postList'
import { Link } from "react-router-dom";
import Recomendation from "./recomendation";

function Home() {
  return (
    <div className="">

      <div className="bg-yellow-500" style={{borderBottom:'1px solid black'}}>
        <div className="flex justify-between ">
          <div className="ml-60 flex flex-col items-start justify-center">
            <h1 style={{fontSize:'80px'}}>Stay curious.</h1>
            <p className="m-4 text-3xl">Discover stories, thinking, and expertise from writers on any topic.</p>
            <button className="m-4 text-4xl rounded-3xl p-6 bg-black text-white hover:bg-blue-900" ><Link to='/write'>Write Article</Link></button>
          </div>
          <div>
            <img  src="https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"/>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
      <PostList/>
      <Recomendation/>
      </div>

    </div>
  );
}

export default Home;