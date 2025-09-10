import {
    ArrowTrendingUpIcon,
    ClipboardIcon,
    Cog6ToothIcon,
    FireIcon,
    HomeIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import ApplicationLogo from "../ApplicationLogo";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const { url, props } = usePage();
    const user = props.auth?.user || { name: "Trainee", email: "trainee@example.com" };

    const [reportsOpen, setReportsOpen] = useState(false);
    const [communityOpen, setCommunityOpen] = useState(false);

    const isActive = (link: string) => url.startsWith(link);

    const navItems = [
        { name: "Dashboard", icon: HomeIcon, link: "/trainee/dashboard" },
        { name: "Workouts", icon: FireIcon, link: "/trainee/workout" },
        { name: "Nutrition", icon: ClipboardIcon, link: "/trainee/nutrition" },
        { name: "Progress", icon: ArrowTrendingUpIcon, link: "/trainee/progress" },
        { name: "Settings", icon: Cog6ToothIcon, link: "/trainee/profile" },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:static md:block md:h-full md:sticky md:top-0`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 text-blue-600">
                    <ApplicationLogo />
                    <button className="md:hidden" onClick={onClose}>
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Profile Card */}
                <div className="flex flex-col items-center p-4 bg-blue-50 mx-4 rounded-xl mb-6 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
                        {user.first_name?.charAt(0).toUpperCase()}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-gray-800">{user.first_name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                {/* Scrollable Navigation */}
                <div className="flex-1 overflow-y-auto px-3 pb-6">
                    {/* Core navigation */}
                    {navItems.map(({ name, icon: Icon, link }) => {
                        const active = isActive(link);
                        return (
                            <Link
                                key={name}
                                href={link}
                                className={`group flex items-center px-4 py-2.5 mb-2 rounded-lg font-medium transition-all relative
                                    ${active
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                    }`}
                            >
                                {active && (
                                    <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r"></span>
                                )}
                                <Icon
                                    className={`h-5 w-5 mr-3 transition-colors ${active
                                            ? "text-blue-600"
                                            : "text-gray-400 group-hover:text-blue-500"
                                        }`}
                                />
                                <span className="text-sm">{name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 w-full border-t p-4 text-xs text-gray-400 text-center">
                    © {new Date().getFullYear()} GoPeakFit Trainee
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
