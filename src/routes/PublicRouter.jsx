import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PublicRouter({ children }) {
    const token = localStorage.getItem('accessToken');
    if(token) {
        return <Navigate to='/' />
    } 
    return children;
}

PublicRouter.protoTypes = {
    children: PropTypes.object.isRequired,
}

export default PublicRouter