import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import defaultAvatar from '../../../assets/user.png';
import { GoCheck } from 'react-icons/go';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registration = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(defaultAvatar);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue('image', event.target.files);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        setValue('image', event.target.files, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                const userData = {
                    name: data.name,
                    email: data.email,
                    image: res.data.data.display_url,
                    phone: user?.phone,
                    password: data.password,
                };
                setUser(userData);
                console.log('Uploaded Data:', userData);
                navigate('/application-form/info');
            }
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    const password = watch("password");

    return (
        <div className=''>
            <div className="">
                <form className="flex mt-3 flex-col space-y-1" onSubmit={handleSubmit(onSubmit)}>
                    {/* Image upload */}
                    <div className="flex flex-col">
                        <label className="font-semibold uppercase">
                            Upload Your Photo{' '}
                            <span className="text-red-500 text-sm">
                                *(Max Size: 2MB, Format: JPG, PNG, JPEG)
                            </span>
                        </label>
                        <img
                            src={previewImage}
                            alt="Avatar"
                            onClick={handleAvatarClick}
                            className="w-32 h-32 mt-2 cursor-pointer object-cover border-2 border-gray-300"
                        />
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            {...register('image', {
                                required: 'Image is required',
                                validate: {
                                    fileSize: (files) =>
                                        files && files[0]?.size < 2 * 1024 * 1024 || 'Max size is 2MB',
                                },
                            })}
                            onChange={handleImageChange}
                            ref={(el) => {
                                fileInputRef.current = el;
                            }}
                            className="hidden"
                        />
                        {errors.image && (
                            <span className="text-red-500 text-sm">{errors.image.message}</span>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className='flex flex-col'>
                        <label className='mt-2 font-semibold uppercase'>Your phone number</label>
                        <input
                            readOnly
                            className='border font-bold px-4 py-2 w-[70%] my-3 border-gray-400 outline-none rounded-md'
                            type="tel"
                            placeholder={user?.phone}
                        />
                    </div>

                    {/* Name */}
                    <div className='flex flex-col'>
                        <label className='mt-2 font-semibold uppercase'>Enter your Full Name</label>
                        <input
                            className='border px-4 py-2 w-[70%] my-2 border-gray-400 outline-none rounded-md'
                            type="text"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>

                    {/* Email */}
                    <div className='flex flex-col'>
                        <label className='mt-2 font-semibold uppercase'>Enter email address</label>
                        <input
                            className='border px-4 py-2 w-[70%] my-2 border-gray-400 outline-none rounded-md'
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    {/* Password */}
                    <div className='flex flex-col'>
                        <label className='mt-2 font-semibold uppercase'>Enter new password</label>
                        <input
                            className='border px-4 py-2 w-[70%] my-2 border-gray-400 outline-none rounded-md'
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div className='flex flex-col'>
                        <label className='mt-2 font-semibold uppercase'>Confirm password</label>
                        <input
                            className='border px-4 py-2 w-[70%] my-2 border-gray-400 outline-none rounded-md'
                            type="password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <input className="btn btn-success mt-2" type="submit" value="Proceed" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
