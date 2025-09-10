import { UserCog } from 'lucide-react'
import React from 'react'

const Welcome = () => {
    return (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-2xl shadow-md p-6 flex justify-between items-center animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>
                <p className="text-sm text-indigo-100 mt-1">
                    Monitor performance, trainers, and trainees with real-time data.
                </p>
            </div>
            <UserCog className="w-10 h-10 text-white opacity-80" />
        </div>

    )
}

export default Welcome