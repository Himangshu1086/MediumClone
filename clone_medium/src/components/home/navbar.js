

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {




  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 785) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div>
      <nav className={`bg-${scrolled ? 'white' : 'yellow-500'} p-4 border-gray-200`}   style={{borderBottom:'1px solid black'}}>
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-8 ">
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
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-row p-4">
              <li>
                <Link
                  to="/"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 text-black hover:text-blue-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/ourstory"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 text-gray-900 hover:text-blue-700"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/write"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 text-gray-900 hover:text-blue-700"
                >
                  Write
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 bg-blue-950 hover:bg-blue-900 text-white rounded-3xl "
                >
                  <span className="p-10 rounded-2xl">Sign In</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  class="block py-2 pl-3 text-2xl pr-4 text-gray-900 mr-8 hover:text-blue-700"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
