import React, { FormEventHandler } from 'react'
import { Eye, EyeSlashFill } from 'react-bootstrap-icons'

type AdminLoginProps = {
    submit: FormEventHandler,
    data: {
        email: string,
        password: string,
    },
    errors: Partial<Record<"email" | "password", string>>,
    setShowPassword: CallableFunction,
    showPassword: boolean,
    setData: CallableFunction,
    processing: boolean,
}

const AdminLoginForm = ({ submit, data, errors, showPassword, setShowPassword, setData, processing }: AdminLoginProps) => {
    return (

        <form onSubmit={submit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            <div className=''>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                {showPassword
                    ? <EyeSlashFill
                        className='absolute z-50 mt-4 ml-[22rem]'
                        onClick={() => setShowPassword(false)}
                        size={20}
                    />
                    : <Eye
                        className='absolute z-50 mt-4 ml-[22rem]'
                        onClick={() => setShowPassword(true)}
                        size={20}
                    />}

                <input
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="relative mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:outline-none mb-4"
                />
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full py-3 px-4 bg-torq text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
                {processing ? 'Signing in...' : 'Login'}
            </button>
        </form>
    )
}

export default AdminLoginForm