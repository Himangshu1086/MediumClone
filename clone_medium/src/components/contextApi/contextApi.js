import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext();

function UserProvider({children}) {
    
    const [loading , setLoading] = useState(false)
    const [checkUser , setCheckUser] = useState(true);
    const [user , setUser] = useState(true);
    
    const fetchUser = async () =>{
        try{
          const res = await fetch("/userLoggedIn" , {
          method:"GET" ,
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
          } , 
          credentials:"include"
        });
      
        const data = await res.json();
        if(data.user)
        {
            setCheckUser(true)
            setUser(data)
            setLoading(false)
        }
        
      }catch(err){
          console.log(err)
        }
      };




    useEffect( ()=>{
        fetchUser();
    },[])


    if(loading)
    return  <h2 className=''>LOADING...</h2>

  return (
    <UserContext.Provider value={{checkUser , user}}>
        {children}
    </UserContext.Provider>
  )
}

export  { UserContext , UserProvider }