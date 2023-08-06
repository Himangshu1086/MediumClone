import React from "react";
import PostList from '../home/postList'
import { Link } from "react-router-dom";
import Recomendation from "./recomendation";

function Home() {
  return (
    <div className="">

      <div className="bg-yellow-500" style={{borderBottom:'1px solid black'}}>
        <div className="flex justify-between ">
          <div className="sm:ml-60 ml-20 flex flex-col items-start justify-center ">
            <h1 className="max-sm:leading-none max-sm:text-7xl max-sm:pt-20 home-text" >Stay curious.</h1>
            <p className="m-4 text-3xl max-sm:text-3xl max-sm:w-4/5 max-sm:m-1 max-sm:mt-5">Discover stories, thinking, and expertise from writers on any topic.</p>
            <button className="m-4 text-4xl rounded-3xl p-6 max-sm:mb-10 max-sm:text-xl max-sm:p-4 max-sm:m-1 max-sm:mt-5 max-sm:rounded-lg bg-black text-white hover:bg-blue-900" ><Link to='/write'>Write Article</Link></button>
          </div>
          <div className="flex  max-sm:hidden">
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
