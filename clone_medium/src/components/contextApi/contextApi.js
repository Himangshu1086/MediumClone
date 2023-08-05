import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext();

function UserProvider({children}) {
    
    const [loading , setLoading] = useState(false)
    const [checkUser , setCheckUser] = useState(true);
    const [comfirmPayment , setConfirmPayment] = useState(true)
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
            
        }
        
      }catch(err){
          console.log(err)
        }
      };


      const fetchPaymentHistory = async()=>{
        try{
          const res = await fetch("/paymentHistory" , {
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
            setConfirmPayment(true)
        }
      }catch(err){
          console.log(err)
        }
      };

    useEffect( ()=>{
        fetchUser();
        fetchPaymentHistory()
        setLoading(false)
    },[])


    if(loading)
      return  <h2 className=''>LOADING...</h2>

  return (
    <UserContext.Provider value={{checkUser , user , comfirmPayment}}>
        {children}
    </UserContext.Provider>
  )
}

export  { UserContext , UserProvider }