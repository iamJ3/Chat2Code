import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/User.context';
import { LucideLock, Mail } from 'lucide-react';
import axios from '../config/axios'; // Adjust the path as necessary
const Login = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const { setUser } = useContext(UserContext); // Assuming you want to set user context after login
    // const setUser = useContext(UserContext).setUser; // u can use .setuser and {setuser} to call funtion

    const Navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('/users/login', {
            email,
            password
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem('token', response.data.token); // ✅ Store fresh token
            // Store the token in localStorage
            setUser(response.data.user); // Set user context
            Navigate('/')
        }).catch((error) => {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-gray-700 p-10 rounded-3xl shadow-2xl text-white">
                <h2 className="text-4xl font-extrabold text-center mb-8 tracking-tight">
                    Welcome Back

                </h2>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="text-sm mb-1 block font-medium text-gray-300">Email</label>
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => setemail(e.target.value)}
                                placeholder="Enter your email"
                                className="bg-transparent focus:outline-none w-full text-sm placeholder-gray-500 text-white"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm mb-1 block font-medium text-gray-300">Password</label>
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500">
                            <LucideLock className="w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => setpassword(e.target.value)}
                                placeholder="password"
                                className="bg-transparent focus:outline-none w-full text-sm placeholder-gray-500 text-white"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-200 text-white font-semibold py-2 rounded-lg shadow-md"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-indigo-400 hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
