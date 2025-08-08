import React, { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router';

const PersonalInfo = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fileNumbers: Array.from({ length: parseInt(user.familyNumber || 0) }, () => ({
                fileNumber: '',
                confirmFileNumber: '',
            })),
        }
    });

    const { fields } = useFieldArray({
        control,
        name: "fileNumbers"
    });

    const onSubmit = (data) => {
        // Extract only the fileNumber from each pair after validation
        const validFileNumbers = data.fileNumbers.map(item => item.fileNumber);

        const updatedUser = {
            ...user,
            familyFileNumbers: validFileNumbers, // only the file numbers, not the confirm fields
        };

        console.log(updatedUser);
        setUser(updatedUser);
        // navigate('/application-form/personal');
    };

    return (
        <div>
            <form className="flex mt-3 flex-col space-y-1" onSubmit={handleSubmit(onSubmit)}>
                {/* User Info (Read-only) */}
                <div className='flex flex-col'>
                    <label className='mt-2 font-semibold uppercase'>Your Full Name</label>
                    <input readOnly className='border font-semibold px-4 py-2 w-[70%] my-2 border-gray-400 outline-none rounded-md' type="text" placeholder={user.name} />
                </div>

                <div className='flex flex-col'>
                    <label className='mt-2 font-semibold uppercase'>Your Email Address</label>
                    <input readOnly className='border font-semibold px-4 py-2 w-[70%] my-2 border-gray-400 outline-none rounded-md' type="text" placeholder={user.email} />
                </div>

                <div className='flex flex-col'>
                    <label className='mt-2 font-semibold uppercase'>Your Contact Number</label>
                    <input readOnly className='border font-semibold px-4 py-2 w-[70%] my-2 border-gray-400 outline-none rounded-md' type="text" placeholder={user.phone} />
                </div>

                <div className='flex flex-col'>
                    <label className='mt-2 font-semibold uppercase'>Web File Number</label>
                    <input readOnly className='border font-semibold px-4 py-2 w-[70%] my-2 border-gray-400 outline-none rounded-md' type="text" placeholder={user.fileNumber} />
                </div>

                <div>
                    <label className='mt-2 font-semibold uppercase'>Family Members: {user.familyNumber}</label>
                </div>

                {/* Family Members File Inputs */}
                {fields.map((field, index) => {
                    const fileNumber = watch(`fileNumbers.${index}.fileNumber`);
                    return (
                        <div key={field.id}>
                            <h3 className='mt-4 font-bold uppercase'>Family Member {index + 1}</h3>

                            {/* File Number */}
                            <div className='flex flex-col'>
                                <label className='uppercase'>Enter Web File Number</label>
                                <input
                                    type="text"
                                    className='border px-4 py-2 w-[70%] my-2 border-gray-400 outline-none rounded-md'
                                    {...register(`fileNumbers.${index}.fileNumber`, {
                                        required: 'Enter file number'
                                    })}
                                />
                                {errors?.fileNumbers?.[index]?.fileNumber && (
                                    <span className='text-red-500'>
                                        {errors.fileNumbers[index].fileNumber.message}
                                    </span>
                                )}
                            </div>

                            {/* Confirm File Number */}
                            <div className='flex flex-col'>
                                <label className='uppercase'>Confirm Web File Number</label>
                                <input
                                    type="text"
                                    className='border px-4 py-2 w-[70%] my-2 border-gray-400 outline-none rounded-md'
                                    {...register(`fileNumbers.${index}.confirmFileNumber`, {
                                        required: 'Confirm the file number',
                                        validate: value =>
                                            value === fileNumber || "File numbers do not match"
                                    })}
                                />
                                {errors?.fileNumbers?.[index]?.confirmFileNumber && (
                                    <span className='text-red-500'>
                                        {errors.fileNumbers[index].confirmFileNumber.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}

                <div className='mt-4'>
                    <input className='btn btn-success' type='submit' value='Save and Next' />
                </div>
            </form>
        </div>
    );
};

export default PersonalInfo;
