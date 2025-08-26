import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import {
  ChartBarIcon, Cog6ToothIcon, CalendarDaysIcon, BanknotesIcon,
  UserGroupIcon, UserCircleIcon, UserPlusIcon, ClipboardDocumentListIcon,
  ChartPieIcon, ClipboardDocumentCheckIcon, ChevronDownIcon, ChevronRightIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { Grid1x2 } from "react-bootstrap-icons";
import clsx from "clsx";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navSections = [
  {
    title: "Dashboard",
    items: [{ name: "Overview", icon: Grid1x2, link: "/admin/dashboard" }],
  },
  {
    title: "Members",
    items: [
      { name: "All Members", icon: UserGroupIcon, link: "/admin/gpf-trainees" },
      { name: "GPF Trainees", icon: UserGroupIcon, link: "/admin/gpf-trainees" },
      { name: "Trainees w/ Trainer", icon: UserPlusIcon, link: "/admin/non-gpf-trainees" },
      { name: "Trainers", icon: UserCircleIcon, link: "/admin/trainers" },
    ],
  },
  {
    title: "Scheduling",
    items: [
      { name: "Class Schedule", icon: CalendarDaysIcon, link: "/admin/class-schedule" },
      { name: "Trainer Availability", icon: ClipboardDocumentCheckIcon, link: "/admin/trainer-availability" },
      { name: "Bookings", icon: ClipboardDocumentListIcon, link: "/admin/bookings" },
    ],
  },
  {
    title: "Programs & Workouts",
    items: [
      { name: "Workout Programs", icon: ClipboardDocumentListIcon, link: "/admin/workout-programs" },
      { name: "Meal Plans", icon: ClipboardDocumentListIcon, link: "/admin/meal-plans" },
      { name: "Progress Tracking", icon: ChartBarIcon, link: "/admin/progress-tracking" },
    ],
  },
  {
    title: "Reports & Analytics",
    items: [
      { name: "Attendance Reports", icon: ChartBarIcon, link: "/admin/attendance-reports" },
      { name: "Revenue & Payments", icon: BanknotesIcon, link: "/admin/revenue" },
      { name: "Trainer Performance", icon: ChartPieIcon, link: "/admin/trainer-performance" },
      { name: "Member Progress", icon: ChartPieIcon, link: "/admin/member-progress" },
    ],
  },
  {
    title: "Administration",
    items: [
      { name: "User Roles & Permissions", icon: Cog6ToothIcon, link: "/admin/roles" },
      { name: "Settings", icon: Cog6ToothIcon, link: "/admin/settings" },
    ],
  },
];

const AdminSidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { url } = usePage();
  const [openSections, setOpenSections] = useState<string[]>(["Dashboard", "Members"]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title)
        ? prev.filter((sec) => sec !== title)
        : [...prev, title]
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:block md:h-full md:sticky md:top-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center space-x-2 py-1">
            <ApplicationLogo />
          </div>
          <button className="md:hidden" onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto h-[calc(100%-120px)] pb-4">
          <nav className="mt-4">
            {navSections.map(({ title, items }) => {
              const isOpenSection = openSections.includes(title);

              return (
                <div key={title} className="mb-2">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(title)}
                    className="flex items-center justify-between px-6 py-3 w-full text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <span className="uppercase text-xs tracking-wider">{title}</span>
                    {isOpenSection ? (
                      <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {/* Dropdown Items */}
                  {isOpenSection  && (
                    <div className="ml-4 mt-1 space-y-1">
                      {items.map(({ name, icon: Icon, link }) => (
                        <Link
                          key={name}
                          href={link}
                          className={clsx(
                            "group flex items-center px-4 py-2 text-gray-600 rounded-md transition-colors",
                            url.startsWith(link)
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "hover:bg-blue-50 hover:text-blue-600"
                          )}
                        >
                          <Icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                          <span className="text-sm">{name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t p-4 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} GoPeakFit Admin
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
