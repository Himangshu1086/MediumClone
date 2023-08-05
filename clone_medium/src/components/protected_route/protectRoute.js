

// ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contextApi/contextApi';

const PrivateRoute = () => {
    const {checkUser , user} = useContext(UserContext);
    // const checkUser = false
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return checkUser ? <Outlet /> : <Navigate to="/signin"/>;
}

export default PrivateRoute