import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router';

const ApplicationInfo = () => {
    const { user, setUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const amount = parseInt(data.familyNumber) * 200;
        const updatedUser = {
            ...user,
            mission: data.mission,
            fileNumber: data.fileNumber,
            ivacCenter: data.ivacCenter,
            visaType: data.visaType,
            familyNumber: data.familyNumber,
            visaDetails: data.visaDetails,
            calculatedAmount: amount
        };
        console.log(updatedUser);
        setUser(updatedUser);
         navigate('/application-form/personal');
    };

    const fileNumber = watch('fileNumber');
    const familyNumber = watch('familyNumber') || 0;
    const calculatedAmount = parseInt(familyNumber) * 200;

    return (
        <div>
            <form className="flex mt-3 flex-col space-y-1" onSubmit={handleSubmit(onSubmit)}>

                {/* Mission */}
                <div className='flex flex-col'>
                    <label className='uppercase mt-2'>Select a Mission</label>
                    <select
                        className='border px-4 py-2 w-[70%] my-3 border-gray-400 outline-none rounded-md'
                        {...register('mission', { required: 'Please select a mission' })}
                    >
                        <option value="Dhaka">Dhaka</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>
                    {errors.mission && <span className='text-red-500'>{errors.mission.message}</span>}
                </div>

                {/* File Number */}
                <div className='flex flex-col'>
                    <label className='uppercase'>
                        Enter your Web File Number
                        <span className='uppercase text-red-500'>
                            &nbsp; (Your visa application is valid for 15 calendar days.)
                        </span>
                    </label>
                    <input
                        type="text"
                        className='border px-4 py-2 w-[70%] my-3 border-gray-400 outline-none rounded-md'
                        {...register('fileNumber', { required: 'Enter your file number' })}
                    />
                    {errors.fileNumber && <span className='text-red-500'>{errors.fileNumber.message}</span>}
                </div>

                {/* Confirm File Number */}
                <div className='flex flex-col'>
                    <label className='uppercase'>
                        Confirm your Web File Number
                    </label>
                    <input
                        type="text"
                        className='border px-4 py-2 w-[70%] my-3 border-gray-400 outline-none rounded-md'
                        {...register('confirmFileNumber', {
                            required: 'Enter your file number again',
                            validate: (value) =>
                                value === fileNumber || "File numbers do not match",
                        })}
                    />
                    {errors.confirmFileNumber && <span className='text-red-500'>{errors.confirmFileNumber.message}</span>}
                </div>

                {/* IVAC Center */}
                <div className='flex flex-col'>
                    <label className='uppercase'>Select your IVAC Center</label>
                    <select
                        className='border px-4 py-2 w-[70%] my-3 border-gray-400 outline-none rounded-md'
                        {...register('ivacCenter', { required: 'Please select your IVAC Center' })}
                    >
                        <option value="IPVAC,Dhaka">IPVAC, Dhaka</option>
                        <option value="IPVAC,Khulna">IPVAC, Khulna</option>
                        <option value="IPVAC,Barishal">IPVAC, Barishal</option>
                        <option value="IPVAC,Rajshahi">IPVAC, Rajshahi</option>
                    </select>
                    {errors.ivacCenter && <span className='text-red-500'>{errors.ivacCenter.message}</span>}
                </div>

                {/* Visa Type */}
                <div className='flex flex-col'>
                    <label className='uppercase'>
                        Visa Type
                        <span className='text-red-500 uppercase'>
                            &nbsp; (Match this with your visa application)
                        </span>
                    </label>
                    <select
                        className='border px-4 py-2 w-[70%] my-3 border-gray-400 outline-none rounded-md'
                        {...register('visaType', { required: 'Please select your Visa Type' })}
                    >
                        <option value="MEDICAL/ MEDICAL ATTENDANT VISA">MEDICAL/ MEDICAL ATTENDANT VISA</option>
                        <option value="STUDENT VISA">STUDENT VISA</option>
                        <option value="BUSINESS VISA">BUSINESS VISA</option>
                        <option value="TOURIST VISA">TOURIST VISA</option>
                    </select>
                    {errors.visaType && <span className='text-red-500'>{errors.visaType.message}</span>}
                </div>

                {/* Family Number */}
                <div className='flex flex-col'>
                    <label className='uppercase'>Number of Family Members / Co-applicant</label>
                    <input
                        type="number"
                        className='border px-4 py-2 w-[70%] my-3 border-gray-400 outline-none rounded-md'
                        {...register('familyNumber', {
                            required: 'Enter your family number',
                            min: { value: 0, message: "Value must be 0 or more" },
                        })}
                    />
                    {errors.familyNumber && <span className='text-red-500'>{errors.familyNumber.message}</span>}
                </div>

                {/* Visa Purpose Details */}
                <div className='flex flex-col'>
                    <label className='uppercase'>VISA Purpose Details</label>
                    <textarea
                        className='border px-4 py-2 w-[70%] my-3 border-gray-400 outline-none rounded-md'
                        {...register('visaDetails', {
                            required: 'Write visa details'
                        })}
                    />
                    {errors.visaDetails && <span className='text-red-500'>{errors.visaDetails.message}</span>}
                </div>

                {/* Amount Calculation */}
                <div className='mt-4 font-semibold'>
                    <p className='uppercase'>Total Amount</p>
                    <p>BDT {calculatedAmount}</p>
                </div>

                {/* Submit */}
                <div className='mt-4'>
                    <input className='btn btn-success' type='submit' value='Save and Next' />
                </div>
            </form>
        </div>
    );
};

export default ApplicationInfo;
