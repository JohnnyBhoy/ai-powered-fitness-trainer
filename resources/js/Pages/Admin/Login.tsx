import { useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';

export default function Login() {
    //Local state
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.login.submit'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-6">
                    <img src="/logos/header-logo.png" alt="company logo" className='h-18 mb-4' />
                    <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
                    <p className="text-sm text-gray-500">Sign in to access the admin panel</p>
                </div>

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
            </div>
        </div>
    );
}
