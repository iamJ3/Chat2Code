import { use, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import axios from '../config/axios';
import { UserContext } from '../context/User.context';
import { useContext } from 'react';

const Register = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const {setUser} = useContext(UserContext); // Assuming you want to set user context after registration

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('/users/register', { email, password })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token); // Store the token in localStorage
                setUser(response.data.user); // Set user context
                navigate('/');
            })
            .catch((error) => {
                console.error('Registration failed:', error.response ? error.response.data : error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-gray-700 p-10 rounded-3xl shadow-2xl text-white">
                <h1 className="text-4xl font-bold text-center mb-6">Register</h1>
                <p className="text-center text-gray-400 mb-8 text-sm">Create a new account</p>

                <form onSubmit={submitHandler} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-300 block mb-1">Email</label>
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-3 rounded-xl border border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => setemail(e.target.value)}
                                placeholder="email@example.com"
                                className="bg-transparent outline-none w-full text-sm placeholder-gray-500 text-white"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-300 block mb-1">Password</label>
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-3 rounded-xl border border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500">
                            <Lock className="w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder='password'
                                onChange={(e) => setpassword(e.target.value)}
                                className="bg-transparent outline-none w-full text-sm placeholder-gray-500 text-white"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 text-white font-bold py-3 rounded-xl shadow-lg"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-400 hover:underline font-medium">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
