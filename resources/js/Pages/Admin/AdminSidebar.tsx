import ApplicationLogo from "@/Components/ApplicationLogo";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Grid1x2 } from "react-bootstrap-icons";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const navItems = [
    { name: "GPF Trainees", icon: UserGroupIcon, link: "gpf-trainees" },
    { name: "Trainers", icon: UserCircleIcon, link: "trainers" },
    { name: "Trainees w/ Trainer", icon: UserPlusIcon, link: "trainees" },
];

const AdminSidebar = ({ isOpen, onClose }: SidebarProps) => {
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

                <nav className="">
                    <Link
                        key={0}
                        href="/admin/dashboard"
                        className="group flex items-center px-6 py-2 mt-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                        <Grid1x2 className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                        <span className="text-md font-medium">Dashboard</span>
                    </Link>
                    <li className="list-none ml-6 mt-6 mb-2 font-bold text-slate-500">Users</li>
                    {navItems.map(({ name, icon: Icon, link }) => (
                        <Link
                            key={name}
                            href={link}
                            className="group flex items-center px-6 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                            <Icon className="h-7 w-7 mr-3 text-gray-400 group-hover:text-blue-500" />
                            <span className="text-md font-medium">{name}</span>
                        </Link>
                    ))}
                </nav>

            </aside>
        </>
    );
};

export default AdminSidebar;
