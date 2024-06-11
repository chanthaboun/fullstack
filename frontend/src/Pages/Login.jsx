import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import '../Styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [formData, setFormData] = useState({
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
        axios.post('http://localhost:5000/login', formData)
            .then(res => {
                console.log(res.data);
                if (res.data.status === 'ok') {
                    toast.success('ລົງທະບຽນສຳເລັດ!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    setTimeout(() => {
                        navigate('/home')
                    }, 3000)
                } else {
                    toast.error('ຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດບໍ່ຖືກຕ້ອງ', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                  
                }
            })
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-business-login animate-background">
            <div className="max-w-md w-full bg-white p-8 rounded shadow-md animate-fade-in">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Username"
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
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-700">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
