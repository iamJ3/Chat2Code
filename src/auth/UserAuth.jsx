import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User.context.jsx'
 import { Loader2 } from "lucide-react";

const UserAuth = ({ children }) => {

    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()




    useEffect(() => {
        if (user) {
            setLoading(false)
        }

        if (!token) {
            navigate('/login')
        }

        if (!user) {
            navigate('/login')
        }

    }, [])

if (loading) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner Icon */}
                <Loader2 className="animate-spin text-indigo-400" size={48} />
                
                {/* Text */}
                <p className="text-slate-200 text-lg font-medium animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}


    return (
        <>
            {children}
        </>
    )
}

export default UserAuth