import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div className='bg-primary text-white text-xl'>
            <div className='w-[90%] py-5 mx-auto flex  justify-between'>
             <div>
                <h1 className='uppercase'>Indian Visa Application</h1>
             </div>

             < div className='flex items-center gap-4'>
                 <Link>Home</Link>
                 <Link to={'/application-form'}>Application</Link>
               
             </div>
             < div className='flex items-center gap-4'>
                
                 <Link>Sign In</Link>
                 <Link>Dashboard</Link>
             </div>
        </div>
        </div>
    );
};

export default Navbar;