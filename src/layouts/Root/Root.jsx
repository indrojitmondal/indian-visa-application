import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const Root = ({children}) => {
    return (
        <div className=''>

            <Navbar></Navbar>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Root;