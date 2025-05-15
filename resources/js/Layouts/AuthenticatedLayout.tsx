import FreeTrialBadge from '@/Components/Trainee/Dashboard/FreeTrialBadge';
import Sidebar from '@/Components/Trainee/Sidebar';
import { getSubscriptions } from '@/utils/api/subscription';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Link, useForm, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { post } = useForm()
    const trialEnds = new Date('2025-05-20'); // trial ends in 5 days
    const today = new Date();
    const remainingDays = Math.ceil((trialEnds.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const page = usePage();

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

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

    console.log(subscriptions);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex h-screen overflow-x-hidden bg-gray-100">
                {/* Sidebar Component */}
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

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
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold text-gray-700">{capitalizeFirstLetter(page.url?.replace('/', ''))}</h1>
                            {subscriptions?.includes('premium') ? null : <FreeTrialBadge />}
                        </div>



                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center focus:outline-none">
                                <h3 className='text-slate-800 font-bold mr-2'>{user?.first_name} {user?.last_name}</h3>
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
                    </header>
                    {/* <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={route('dashboard')}>
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    href={route('progress')}
                                    active={route().current('progress')}
                                >
                                    Progress
                                </NavLink>

                                <NavLink
                                    href={route('conversation')}
                                    active={route().current('conversation')}
                                >
                                    Conversations
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                              <img src="/images/male.png" alt="Go Peak Fit" className="h-10 shadow-sm border rounded mr-3"/>
                                                {user.first_name} {user?.last_name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.first_name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            */}

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
