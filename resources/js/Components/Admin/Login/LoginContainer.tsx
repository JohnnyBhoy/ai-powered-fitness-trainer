import React, { ReactNode } from 'react'

const LoginContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md lg:bg-white rounded-xl lg:shadow-lg p-8">
                {children}
            </div>
        </div>
    )
}

export default LoginContainer