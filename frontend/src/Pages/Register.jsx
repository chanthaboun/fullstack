import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import '../Styles/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate()
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/register', formData)
            .then(res => {
                toast.success('ລົງທະບຽນສຳເລັດ!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(() =>{
                    navigate('/login')
                }, 3000)
               
            })
            .catch(err => {
                console.error('There was an error!', err);
                toast.error('ລົງທະບຽນຍັງບໍ່ສຳເລັດ', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
               
            });
    };

    console.log(formData)
    return (
        <div className="min-h-screen flex items-center justify-center bg-business animate-background">
            <div className="max-w-md w-full bg-white p-8 rounded shadow-md animate-fade-in">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4 relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4 relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6 relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-700">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
