import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRouter({ children }) {
    const token = localStorage.getItem('accessToken');
    if(!token) {
        return <Navigate to='/login' />
    } 
    return children;
}

PrivateRouter.protoTypes = {
    children: PropTypes.object.isRequired,
}

export default PrivateRouter