import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext();

function UserProvider({children}) {
    
    const [loading , setLoading] = useState(false)
    const [checkUser , setCheckUser] = useState(false);
    const [comfirmPayment , setConfirmPayment] = useState(true)
    const [user , setUser] = useState();
    
    const fetchUser = async () =>{    
      const jwtToken = localStorage.getItem('jwtToken');
      const headers = {
        'authToken': jwtToken
      };    
        if(jwtToken)
        {
            setCheckUser(true)  
        }

        await axios.get('http://127.0.0.1:3000/author/my/details',{headers})
        .then((response) => {
          setUser(response.data);
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    }


      const fetchPaymentHistory = async()=>{
       
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