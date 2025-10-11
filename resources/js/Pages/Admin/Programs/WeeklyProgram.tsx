import ProgramData from '@/Components/Admin/Programs/WeeklyProgram/ProgramData';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { WeeklyProgramLists } from '@/types/program';
import { Head } from '@inertiajs/react';
import { ChevronDown, Pencil, Search, Trash, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';

const HEADERS = ["Name", "Goal", "Program", "Week Number", "Created Data", "Action"];

const WeeklyProgram = ({ programs }: { programs: WeeklyProgramLists[] }) => {
    const [showProgramData, setShowProgramData] = useState<boolean>(false);
    const [activeProgramData, setActiveProgramData] = useState<string>("");

    const handleOpenProgramData = (data: string) => {
        setShowProgramData(true);
        setActiveProgramData(data);
        console.log(JSON.parse(data));
    }

    if (showProgramData) {
        return <ProgramData programData={activeProgramData} />
    }

    console.log(programs);

    return (
        <Authenticated>
            <Head title="All Program" />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">
                <div className="px-6 py-5">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                        Weekly Program
                    </h3>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                    <div className="space-y-6">
                        <div className="overflow-hidden  rounded-xl  bg-white  dark:bg-white/[0.03]">
                            <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Show
                                    </span>
                                    <div className="relative z-20 bg-transparent">
                                        <select className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                                            <option
                                                value="10"
                                                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                            >
                                                10
                                            </option>
                                            <option
                                                value="8"
                                                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                            >
                                                8
                                            </option>
                                            <option
                                                value="5"
                                                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                            >
                                                5
                                            </option>
                                        </select>
                                        <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                                            <ChevronDown size={16} />
                                        </span>
                                    </div>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        {" "}
                                        entries{" "}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <div className="relative">
                                        <button className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
                                            <Search size={18} />
                                        </button>
                                        <input
                                            x-model="search"
                                            placeholder="Search..."
                                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
                                            type="text"
                                        />
                                    </div>
                                    <button className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 ">
                                        Download
                                        <svg
                                            className="fill-current"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clip-rule="evenodd"
                                                d="M10.0018 14.083C9.7866 14.083 9.59255 13.9924 9.45578 13.8472L5.61586 10.0097C5.32288 9.71688 5.32272 9.242 5.61552 8.94902C5.90832 8.65603 6.3832 8.65588 6.67618 8.94868L9.25182 11.5227L9.25182 3.33301C9.25182 2.91879 9.5876 2.58301 10.0018 2.58301C10.416 2.58301 10.7518 2.91879 10.7518 3.33301L10.7518 11.5193L13.3242 8.94866C13.6172 8.65587 14.0921 8.65604 14.3849 8.94903C14.6777 9.24203 14.6775 9.7169 14.3845 10.0097L10.5761 13.8154C10.4385 13.979 10.2323 14.083 10.0018 14.083ZM4.0835 13.333C4.0835 12.9188 3.74771 12.583 3.3335 12.583C2.91928 12.583 2.5835 12.9188 2.5835 13.333V15.1663C2.5835 16.409 3.59086 17.4163 4.8335 17.4163H15.1676C16.4102 17.4163 17.4176 16.409 17.4176 15.1663V13.333C17.4176 12.9188 17.0818 12.583 16.6676 12.583C16.2533 12.583 15.9176 12.9188 15.9176 13.333V15.1663C15.9176 15.5806 15.5818 15.9163 15.1676 15.9163H4.8335C4.41928 15.9163 4.0835 15.5806 4.0835 15.1663V13.333Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="max-w-full overflow-x-auto custom-scrollbar">
                                <div>
                                    <table className="min-w-full  undefined">
                                        <thead>
                                            <tr>
                                                {HEADERS.map((head, i) => (
                                                    <th
                                                        key={i}
                                                        className=" px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                                        <div className="flex items-center justify-between cursor-pointer">
                                                            <div className="gap-3">
                                                                <span className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                                                                    {head}
                                                                </span>
                                                            </div>
                                                            <button className="flex flex-col gap-0.5">
                                                                <svg
                                                                    className="text-gray-300 dark:text-gray-700"
                                                                    width="8"
                                                                    height="5"
                                                                    viewBox="0 0 8 5"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                                <svg
                                                                    className="text-gray-300 dark:text-gray-700"
                                                                    width="8"
                                                                    height="5"
                                                                    viewBox="0 0 8 5"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {programs?.map((program, i) => (
                                                <tr>
                                                    <td className=" px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                        <div className="flex gap-3">
                                                            <div className="mt-1">
                                                                <label className="flex items-center space-x-3 group cursor-pointer ">
                                                                    <div className="relative w-5 h-5">
                                                                        <input
                                                                            className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60 
          "
                                                                            type="checkbox"
                                                                        />
                                                                    </div>
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                                    {program?.first_name} {program?.last_name}
                                                                </p>
                                                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                                    {program?.email}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                                        <span>
                                                            {program?.goal}
                                                        </span>
                                                    </td>
                                                    <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                                        {program?.program_name}
                                                    </td>
                                                    <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                                        {program?.week_number}
                                                    </td>
                                                    <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">
                                                            {moment(program.created_at).format('MMMM D, YYYY hA')}
                                                        </span>
                                                    </td>
                                                    <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                                        <div className="flex items-center w-full gap-3">
                                                            <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                                                                <Trash2 size={16} />
                                                            </button>
                                                            <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                                                                <Pencil size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                                    <div className="pb-3 xl:pb-0">
                                        <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                                            Showing 1 to 5 of 10 entries
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <button
                                            disabled
                                            className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
                                        >
                                            Previous
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <button className="px-4 py-2 rounded bg-brand-500 text-white flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                                                1
                                            </button>
                                            <button className="px-4 py-2 rounded text-gray-700 dark:text-gray-400 flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                                                2
                                            </button>
                                        </div>
                                        <button className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default WeeklyProgram