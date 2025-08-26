import FreeTrialBadge from '@/Components/Trainee/Dashboard/FreeTrialBadge';
import Sidebar from '@/Components/Trainee/Sidebar';
import TrainerSidebar from '@/Components/Trainer/TrainerSidebar';
import AdminSidebar from '@/Pages/Admin/AdminSidebar';
import { getSubscriptions } from '@/utils/api/subscription';
import { getRole } from '@/utils/functions';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Link, useForm, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { Bell, Search } from 'react-bootstrap-icons';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { post } = useForm();
    const trialEnds = new Date('2025-05-20'); // trial ends in 5 days
    const today = new Date();
    const remainingDays = Math.ceil((trialEnds.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const page = usePage();
    const role = getRole();

    console.log('role:', role);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Get subscription
    useEffect(() => {
        getSubscriptions(user?.id)
            .then(setSubscriptions)
            .catch(console.error);
    }, [user?.id]);

    const handleLogout = () => {
        post('/logout');
    };

    const capitalizeFirstLetter = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex h-screen overflow-x-hidden bg-gray-100">

                {/* Sidebar Component */}
                {role == 1 ? <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    : role == 2 ? <TrainerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                        : <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                }


                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
                        {/* Mobile Hamburger Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <Bars3Icon className="h-6 w-6 text-gray-600" />
                        </button>

                        {/* Header Title */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {role !=3 ? null :
                                subscriptions?.includes('premium') ?
                                    null : <FreeTrialBadge />}
                        </div>



                        {/* Profile Dropdown */}

                        <div className="flex gap-6 place-items-center">
                            <div className="relative hidden lg:inline">
                                <Search className='absolute ml-[13rem] mt-[.7rem]' />
                                <input
                                    type="text"
                                    className='rounded-full border border-slate-300 shadow-sm w-[15rem]'
                                    placeholder='Search...'
                                />
                            </div>

                            <Bell size={24} />
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center focus:outline-none"
                                >
                                    <img
                                        src="https://lh3.googleusercontent.com/a-/ALV-UjWT9_ul-BFTX-kdugK8cK3nS3rrpuCvVgc3dye3AIyl7lhwpzTe=s88-w88-h88-c-k-no"
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50">
                                        <Link
                                            href="/profile"
                                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <Cog6ToothIcon className="h-5 w-5 mr-2 text-gray-500" />
                                            Account Settings
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2 text-gray-500" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </header>

                    {header && (
                        <header className="bg-white shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
