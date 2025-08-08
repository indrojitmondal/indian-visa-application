import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import { GoCheck } from 'react-icons/go';
import { useNavigate } from 'react-router';

const Authentication = () => {
    const { user,setUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data.phone)
       // setPhone(data.phone);
        const user={
            phone: data.phone
        }

        setUser(user);
        
          navigate('/application-form/registration');
    }
    return (
        <div>
              {/* <button className='btn btn-primary'> <GoCheck />  Authentication </button>
             */}
             <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
             <label htmlFor="Enter your phone number" className='uppercase mt-2'>Enter your phone number <span className='text-red-500'>*(PLEASE ENSURE SAME MOBILE NUMBER HERE AS PROVIDED IN THE ONLINE APPLICATION FORM)</span> </label>   
            <input 
              className='border px-4 py-2 w-[70%] my-3 border-gray-400 outline-none rounded-md'
                    type="tel"
                    placeholder=""
                    {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^(?:\+88|88)?01[3-9]\d{8}$/,
                            message: "Invalid Bangladeshi phone number",
                        },
                    })}
                />
                {errors.phone && <span>{errors.phone.message}</span>}

                <div>
                    <input className='btn btn-success ' type="submit" value={'Proceed'} />

                </div>
            </form>
        </div>
    );
};

export default Authentication;