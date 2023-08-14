

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { UserContext } from "../contextApi/contextApi";




const Navbar = () => {

  const {checkUser , user} = useContext(UserContext)
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [scrolled, setScrolled] = useState(false);
  // const [checkUser , setCheckUser] = useState(true);


  
  const handleScroll = () => {
    if (window.scrollY > 785) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };






  useEffect(() => {
    // // get the user data verification
    // fetchUser();
    // on scroll change the bg color of navbar
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);





  //logout function
const logout = (e)=>{
  e.preventDefault()
  localStorage.removeItem('jwtToken')
  // useNavigate.push("/");
  window.location.reload();
}




  return (
    <div>
      <nav className={`bg-${scrolled ? 'white' : 'yellow-500'} bg-yellow-500 p-4 border-gray-200 ease-in duration-300`}   style={{borderBottom:'1px solid black'}}>
        <div class="max-w-screen-xl max-sm:w-full flex flex-wrap items-center justify-between mx-auto p-8 ">
          <Link to="/" class="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1618034100983-e1d78be0dc80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=973&q=80"
              class="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span class="self-center text-4xl font-bold whitespace-nowrap dark:text-black">
              Medium
            </span>
          </Link>
          <div class="hidden max-sm:block  w-full md:block md:w-auto max-sm:mt-5 ">
            <ul class="font-medium flex flex-row p-4 max-sm:p-0">
              <li>
                <Link
                  to="/"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 max-sm:pr-1 max-sm:py-1 max-sm:mr-1 max-sm:text-lg text-black hover:text-blue-400"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/ourstory"
                  class="block max-sm:hidden py-2 pl-3 text-2xl pr-4 mr-8 max-sm:pr-1 max-sm:py-1 max-sm:mr-1 max-sm:text-lg text-gray-900 hover:text-blue-700"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/write"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 max-sm:pr-1 max-sm:py-1 max-sm:mr-1 max-sm:text-lg text-gray-900 hover:text-blue-700"
                >
                  Write
                </Link>
              </li>
              {
                checkUser ? <></>:
                <li>
                <Link
                  to="/signin"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 max-sm:pr-1 max-sm:py-1 max-sm:mr-1 max-sm:text-lg bg-blue-950 hover:bg-blue-900 text-white rounded-3xl "
                >
                  <span className="p-10 rounded-2xl max-sm:p-2 max-sm:rounded-lg max-sm:w-full">Sign In</span>
                </Link>
              </li>
              }
              <li>
                <Link
                  to='/payment'
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 max-sm:pr-1 max-sm:py-1 max-sm:mr-1 max-sm:text-lg bg-green-700 hover:bg-green-600 text-white rounded-3xl "
                >
                  <span className="p-10 rounded-2xl" >Subscriptions</span>
                </Link>
              </li>

              
    { checkUser ?
              <><li>
                <Link
                  to="/profile"
                  class="block py-2 pl-3 text-2xl pr-4 max-sm:pr-1 max-sm:py-1 max-sm:mr-1 max-sm:text-lg text-gray-900 mr-8 hover:text-blue-700"
                >
                  Profile
                </Link>
              </li>


              <li>
                <Link
                  to="/" onClick={logout}
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 max-sm:pr-1 max-sm:py-1 max-sm:mr-1 max-sm:text-lg bg-black hover:bg-gray-700 text-white rounded-3xl "
                >
                  <span className="p-10 rounded-2xl">Logout</span>
                </Link>
              </li>
              </> : 
              <></>
    }

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
