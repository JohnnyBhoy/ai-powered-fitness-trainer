import {
    ArrowTrendingUpIcon,
    ClipboardIcon,
    Cog6ToothIcon,
    FireIcon,
    HomeIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "../ApplicationLogo";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const { url, props } = usePage();
    const user = props.auth?.user || { first_name: "Trainee", email: "trainee@example.com" };

    const isActive = (link: string) => url.startsWith(link);

    const navItems = [
        { name: "Dashboard", icon: HomeIcon, link: "/trainee/dashboard" },
        { name: "Workouts", icon: FireIcon, link: "/trainee/workout" },
        { name: "Diet", icon: ClipboardIcon, link: "/trainee/nutrition" },
        { name: "Progress", icon: ArrowTrendingUpIcon, link: "/trainee/progress" },
        { name: "Settings", icon: Cog6ToothIcon, link: "/trainee/settings" },
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
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:static md:block md:h-full md:sticky md:top-0`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 text-torq">
                    <ApplicationLogo />
                    <button className="md:hidden" onClick={onClose}>
                        <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-torq" />
                    </button>
                </div>

                {/* Profile Card */}
                <div className="flex flex-col items-center p-6 bg-torq/10 mx-4 rounded-2xl mb-6 shadow-md">
                    <div className="w-20 h-20 rounded-full bg-torq/20 flex items-center justify-center text-2xl font-bold text-torq">
                        <img
                            src="https://lh3.googleusercontent.com/a-/ALV-UjWT9_ul-BFTX-kdugK8cK3nS3rrpuCvVgc3dye3AIyl7lhwpzTe=s88-w88-h88-c-k-no" alt="avatar"
                            className="rounded-full border-2 border-gray-300"
                        />
                    </div>
                    <p className="mt-3 text-base font-semibold text-gray-800">{user.first_name}</p>
                    <p className="text-sm text-gray-500 break-all">{user.email}</p>
                </div>

                {/* Scrollable Navigation */}
                <div className="flex-1 overflow-y-auto px-4 pb-6">
                    {navItems.map(({ name, icon: Icon, link }) => {
                        const active = isActive(link);
                        return (
                            <Link
                                key={name}
                                href={link}
                                className={`group flex items-center px-5 py-3 mb-3 rounded-xl font-medium transition-all relative
                                    ${active
                                        ? "bg-torq/20 text-torq shadow-sm"
                                        : "text-gray-700 hover:bg-torq/10 hover:text-torq hover:scale-105"
                                    }`}
                            >
                                {active && (
                                    <span className="absolute left-0 top-0 h-full w-1.5 bg-torq rounded-r"></span>
                                )}
                                <Icon
                                    className={`h-6 w-6 mr-4 transition-colors ${active
                                        ? "text-torq"
                                        : "text-gray-400 group-hover:text-torq"
                                        }`}
                                />
                                <span className="text-base font-medium">{name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 w-full border-t p-6 text-sm text-gray-400 text-center">
                    © {new Date().getFullYear()} GoPeakFit Trainee
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
