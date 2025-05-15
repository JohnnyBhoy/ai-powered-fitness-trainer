import {
    HomeIcon,
    FireIcon,
    ClipboardIcon,
    ArrowTrendingUpIcon,
    Cog6ToothIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import ApplicationLogo from "../ApplicationLogo";
import { Link } from "@inertiajs/react";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const navItems = [
    { name: "Dashboard", icon: HomeIcon, link: "dashboard" },
    { name: "Workouts", icon: FireIcon, link: "workout"},
    { name: "Meals", icon: ClipboardIcon, link: "meals"},
    { name: "Progress", icon: ArrowTrendingUpIcon, link: "progress"},
    { name: "Settings", icon: Cog6ToothIcon, link: "profile"},
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
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
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} F
          md:translate-x-0 md:static md:block md:h-full md:sticky md:top-0`}
            >
                <div className="flex items-center justify-between p-6 text-2xl font-bold text-blue-600">
                    <ApplicationLogo />
                    <button className="md:hidden" onClick={onClose}>
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <nav>
                    {navItems.map(({ name, icon: Icon, link}) => (
                        <Link
                            key={name}
                            href={link}
                            className="group flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                            <Icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-500"/>
                            <span className="text-md font-medium">{name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
