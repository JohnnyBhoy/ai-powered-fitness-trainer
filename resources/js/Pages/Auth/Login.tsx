import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Toaster } from 'sonner';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow justify-center place-items-center">
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}
                    <div className="mt-10 flex flex-col lg:flex-row justify-center items-stretch gap-2 lg:gap-2 w-full max-w-6xl pb-10">
                        {/* Image Section */}
                        <div className="relative w-full lg:w-1/2 flex justify-center items-center order-2 lg:order-1">
                            <div className="w-full flex justify-center items-center relative">
                                {/* Main Image */}
                                <img
                                    src="/images/registration.png"
                                    alt="Fitness Images"
                                    className="rounded-xl w-3/4 object-contain"
                                />

                                {/* Notification Image */}
                                <img
                                    src="/images/main-subimg1.png"
                                    alt="Workout Notification"
                                    className="rounded-xl absolute top-20 md:left-8  transform-translate-x-1/2 md:h-20 w-28 left-10"
                                />

                                {/* Rating Image */}
                                <img
                                    src="/images/main-subimg2.png"
                                    alt="Rating"
                                    className="rounded-xl absolute bottom-[-40px] md:right-20  transform-translate-x-1/2 right-5 md:w-48 w-32"
                                />
                            </div>
                        </div>

                        <div className='w-full lg:w-1/2 lg:bg-slate-50 px-10 lg:px-16 py-10 rounded-xl lg:shadow-md text-left order-1 lg:order-2 flex flex-col justify-center'>

                            <div className="grid place-items-center mb-10 space-y-2">
                                <ApplicationLogo />
                                <h3 className='text-slate-500'>Login to start your session</h3>
                            </div>

                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4 block flex justify-between">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    'remember',
                                                    (e.target.checked || false) as false,
                                                )
                                            }
                                        />
                                        <span className="ms-2 text-sm text-gray-600">
                                            Remember me
                                        </span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>

                                <div className="mt-4 flex items-center justify-between">

                                    <Link href="register">
                                        <SecondaryButton disabled={processing}>
                                            Create Account
                                        </SecondaryButton>
                                    </Link>


                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Log in
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
