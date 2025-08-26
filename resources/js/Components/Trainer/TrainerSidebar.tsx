import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  BarChart3,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navSections = [
  {
    heading: "Main",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, link: "/trainer/dashboard" },
    ],
  },
  {
    heading: "Management",
    items: [
      { name: "My Trainees", icon: Users, link: "/trainer/trainees" },
      { name: "My Programs", icon: Dumbbell, link: "/trainer/programs" },
    ],
  },
  {
    heading: "Reports",
    items: [
      { name: "Progress Report", icon: BarChart3, link: "/trainer/progress" },
      { name: "Attendance Logs", icon: ClipboardList, link: "/trainer/attendance" },
    ],
  },
  {
    heading: "Settings",
    items: [
      { name: "Account Settings", icon: Settings, link: "/trainer/settings" },
    ],
  },
];

const TrainerSidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { url } = usePage();
  const { post } = useForm();

  const isActive = (link: string) => url.startsWith(link);

   const handleLogout = () => {
        post('/logout');
    };

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

        {/* Navigation */}
        <nav className="px-3">
          {navSections.map((section, index) => (
            <div key={index} className="mb-6">
              <p className="ml-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {section.heading}
              </p>
              {section.items.map(({ name, icon: Icon, link }) => (
                <Link
                  key={name}
                  href={link}
                  className={`group flex items-center px-3 py-2 rounded-lg mb-1 transition-colors ${
                    isActive(link)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 mr-3 ${
                      isActive(link)
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-blue-500"
                    }`}
                  />
                  <span className="text-sm font-medium">{name}</span>
                </Link>
              ))}
            </div>
          ))}

          {/* Logout Button */}
          <Link
            href="/logout"
            method="post"
            as="button"
            className="group flex items-center px-3 py-2 mt-4 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg w-full transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-red-500" onClick={handleLogout}/>
            <span className="text-sm font-medium">Logout</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default TrainerSidebar;
