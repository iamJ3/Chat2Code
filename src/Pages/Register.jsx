import {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOffIcon } from 'lucide-react';
import axios from '../config/axios';
import { UserContext } from '../context/User.context';
import { useToast } from '../context/Toast.context';
import { useContext } from 'react';

const Register = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [showPassword, setshowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext); // Assuming you want to set user context after registration
    const { showError, showSuccess } = useToast();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/users/register', { email, password });
            
            if (response.data.success) {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                showSuccess('Registration successful!');
                navigate('/home');
            } else {
                showError(response.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            
            if (error.response?.status === 503) {
                showError('Database connection failed. Please try again later.');
            } else if (error.response?.data?.message) {
                showError(error.response.data.message);
            } else if (error.response?.data?.success === false) {
                showError(error.response.data.message || 'Registration failed');
            } else {
                showError('Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
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
                                type={showPassword ? "text" : "password"}
                                name="password"
                                minLength={6}
                                title="Password must be 6-20 characters"
                                autoComplete="current-password"
                                maxLength={20}
                                placeholder='password'
                                onChange={(e) => setpassword(e.target.value)}
                                className="bg-transparent outline-none w-full text-sm placeholder-gray-500 text-white"
                                required
                            />
                            <button onClick={() => setshowPassword(!showPassword)}>   
                                
                                            {showPassword ? <Eye/> : <EyeOffIcon/>}


                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full transition-all duration-200 text-white font-bold py-3 rounded-xl shadow-lg ${
                            isLoading 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {isLoading ? 'Creating Account...' : 'Register'}
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
