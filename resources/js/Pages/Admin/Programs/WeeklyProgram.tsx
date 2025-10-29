import Update from '@/Components/Admin/Programs/TrialProgram/Update';
import ProgramData from '@/Components/Admin/Programs/WeeklyProgram/ProgramData';
import WeeklyPrograms from '@/Components/Trainee/Forms/Program/WeeklyProgram';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { useProgramStore } from '@/stores/useProgramStore';
import { WeeklyProgramLists } from '@/types/program';
import { jsonFormatter } from '@/utils/functions';
import { Head } from '@inertiajs/react';
import { ArrowLeft, ChevronDown, Pencil, Search, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';

const HEADERS = ["Trainee Name", "Trainee Goal", "Program Name", "Week", "Program Started", "Action"];

const WeeklyProgram = ({ programs }: { programs: WeeklyProgramLists[] }) => {
    // Local states
    const [showProgramData, setShowProgramData] = useState<boolean>(false);
    const [activeProgramData, setActiveProgramData] = useState<string>("");
    const [filter, setFilter] = useState<string>("");
    const [showProgram, setShowProgram] = useState<boolean>(false);

    // Global states
    const { setWeeklyPrograms, weeklyPrograms } = useProgramStore();

    const handleOpenProgramData = (data: string) => {
        setShowProgramData(true);
        setActiveProgramData(data);
        console.log(JSON.parse(data));
    }

    if (showProgramData) {
        return <ProgramData programData={activeProgramData} />
    }

    // Filters
    const filters = (program: WeeklyProgramLists) => {
        return program?.first_name
            ?.toLowerCase()
            ?.includes(filter) ||
            program?.last_name
                ?.toLowerCase()
                ?.includes(filter)
    }


    //  Show weekly program
    const handleShowWeeklyProgram = (program: any) => {
        setShowProgram(true);
        const data = jsonFormatter(program);

        setWeeklyPrograms(JSON.parse(data));
    }

    return (
        <Authenticated>
            <Head title="All Program" />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">
                <div className="border-t border-gray-100 dark:border-gray-800">
                    <div className={`${showProgram ? 'hidden' : ''}`}>
                        <div className="overflow-hidden  rounded-xl  bg-white  dark:bg-white/[0.03]">
                            <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Show
                                    </span>
                                    <div className="relative z-20 bg-transparent">
                                        <select className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">

                                            {[programs?.length, 10, 50, 100]?.map(item => (
                                                <option
                                                    key={item}
                                                    value={item}
                                                    className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                                >
                                                    {item}
                                                </option>
                                            ))}

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
                                            <Search size={16} />
                                        </button>
                                        <input
                                            x-model="search"
                                            placeholder="Search..."
                                            value={filter}
                                            onChange={(e: any) => setFilter(e.target.value)}
                                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-full overflow-x-auto custom-scrollbar">
                                <div>
                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                {HEADERS.map((head, i) => (
                                                    <th
                                                        key={i}
                                                        className=" px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                                        <div className="flex items-center justify-center gap-6 cursor-pointer">
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
                                            {programs
                                                ?.filter(filters)
                                                ?.map((program, i) => (
                                                    <tr key={i}>
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
                                                                        {program?.email ?? 'Not Specify'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                                            <span>
                                                                {program?.goal ?? 'Not Specify'}
                                                            </span>
                                                        </td>
                                                        <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                                            {program?.program_name ?? 'Not specify'}
                                                        </td>
                                                        <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                                            {program?.week_number ?? 1}
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
                                                                    <Pencil size={16}
                                                                        onClick={() => handleShowWeeklyProgram(program?.program_data)} />
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
                                            Showing 1 to 5 of {programs?.length ?? 0} entries
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
                                            <button className="px-4 py-2 rounded bg-gray-800 text-white flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
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
                    {showProgram && <div className="flex justify-between p-3">
                        <h6 className='dark:text-gray-200 font-bold'>Program Name : {weeklyPrograms[0]?.program_name}</h6>
                        <button className='flex place-items-center gap-1 pb-2 dark:text-gray-200' onClick={() => setShowProgram(false)}>
                            <ArrowLeft size={16} /> back
                        </button>
                    </div>}
                    {showProgram && <WeeklyPrograms />}
                      <Update />
                </div>
            </div>
        </Authenticated>
    );
}

export default WeeklyProgram