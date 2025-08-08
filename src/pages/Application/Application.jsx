import React, { useContext, useEffect, useState } from 'react';
import { GoCheck } from "react-icons/go";
import Authentication from './Forms/Authentication';
import Registration from './Forms/Registration';
import { AuthContext } from '../../providers/AuthProvider';
import { Outlet, useLocation } from 'react-router'; // ✅ should be 'react-router-dom'
const steps = [
    { number: 1, label: 'Application Info', path: '/application-form/info' },
    { number: 2, label: 'Personal Info', path: '/application-form/personal' },
    { number: 3, label: 'Overview', path: '/application-form/overview' },
    { number: 4, label: 'Payment', path: '/application-form/payment' }
];
const Application = () => {
    const [phone, setPhone] = useState('');
    const { user } = useContext(AuthContext);
    const [auth, setAuth] = useState(true);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    // ✅ Fix re-render issue with useEffect
    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname === '/application-form') {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [location.pathname]); // ✅ dependency: runs only when path changes

    return (
        <div className='w-[90%] mx-auto'>
            <h1 className='uppercase font-bold text-2xl py-4 text-center'>Indian Visa Application form</h1>

            <div className="flex items-center gap-4 py-4 flex-wrap">
                {/* Step 0: Auth or Registration */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                        <GoCheck />
                    </div>
                    <span>{auth ? 'Authentication' : 'Registration'}</span>
                </div>

                {/* Numbered steps */}
                {steps.map((step) => (
                    <div key={step.number} className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${isActive(step.path) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                        >
                            {step.number}
                        </div>
                        <span className={`${isActive(step.path) ? 'text-blue-600 font-semibold' : ''}`}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>


            {auth && <Authentication />}


            <Outlet />
        </div>
    );
};

export default Application;
