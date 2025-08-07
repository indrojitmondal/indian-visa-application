import React, { useContext, useState } from 'react';

import { GoCheck } from "react-icons/go";
import Authentication from './Forms/Authentication';
import Registration from './Forms/Registration';
import AuthProvider, { AuthContext } from '../../providers/AuthProvider';
const Application = () => {
    const [phone, setPhone]=useState('');

    
    const { user } = useContext(AuthContext);
    const [reg, setReg]=useState('');
    console.log(phone);
    return (
        <div className='w-[90%] mx-auto'>
            < h1 className='uppercase font-bold text-2xl py-4 text-center'>Indian Visa Application form</h1>
          
          
          

          <Authentication ></Authentication>
            
        
           

        </div>
    );
};

export default Application;