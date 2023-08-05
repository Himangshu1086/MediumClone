
// Payment protected Routes 

import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../contextApi/contextApi';

const PrivateRoute = () => {
    const {comfirmPayment } = useContext(UserContext);
    // const checkUser = false
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return comfirmPayment ? <Outlet /> : <div><h1 className='text-center mt-96'>You have reached your daily limit. Please make payment to enjoy the content!</h1></div>;
}

export default PrivateRoute