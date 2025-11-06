import { TableBody, TableCell, TableRow } from "@/Components/ui/table";
import { useProgramStore, useTrialProgramStore } from "@/stores/useProgramStore";
import { WeeklyProgram } from "@/types/weekly-program";
import getCurrentPage from "@/utils/functions/helperFunctions";
import { motion } from "framer-motion";
import { ChevronsUpDown, Edit } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Check2Square } from "react-bootstrap-icons";
import ProgramData from "./ProgramData";
import { useTraineeStore } from "@/stores/useTraineeStore";


const WeeklyPrograms = () => {
    // CurrentPage
    const currentPage = getCurrentPage();

    // Global states
    const { setTrialPrograms, trialPrograms, editTrialByDay, setEditTrialByDay } = useTrialProgramStore();
    const { weeklyPrograms, update, setUpdate, setDailyProgram } = useProgramStore();
    const { showProgram } = useTraineeStore();

    // Local states
    const [trialProgram, setTrialProgram] = useState<WeeklyProgram[]>(trialPrograms);

    // Constants data table header
    const HEADERS = ["Day", "Warm-up", "Workout", "Cool-down", "Alignment", "Action"];

    // FIXED: use functional update to always get the latest state
    const setNewTrialProgram = useCallback(
        (id: number, e: React.ChangeEvent<HTMLInputElement>): void => {
            e.preventDefault();

            const { name, value } = e.target;

            // Always use the latest state
            setTrialProgram((prevPrograms) =>
                prevPrograms.map((program) =>
                    program.id === id ? { ...program, [name]: value } : program
                )
            );
        },
        [] // no deps needed since we use functional state update
    );

    // Set trial program after 1sec user input (Debounce functions)
    useEffect(() => {
        const debounce = setTimeout(() => {
            setTrialPrograms(trialProgram);
        }, 1000);

        return () => clearTimeout(debounce);
    }, [trialProgram]);

    // Store daily program and show update daily program form
    const handleEditProgram = (program: WeeklyProgram) => {
        currentPage == 'five-days-trail' ? setEditTrialByDay(true) : null;
        setDailyProgram(program);
    }

    const activeProgram = currentPage == 'five-days-trail' ? trialProgram : weeklyPrograms;

    console.log(trialProgram);
    console.log(weeklyPrograms);
    console.log(currentPage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`${editTrialByDay ? "hidden" : ""} overflow-hidden dark:border-gray-800 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-lg`}
        >
            <div className={`${showProgram ? '' : 'hidden'} overflow-hidden bg-white dark:border-white/[0.05] dark:bg-white/[0.03]`}>
                <div className="max-w-full overflow-x-auto">
                    <table className="min-w-full  undefined">
                        {/* Table Header */}
                        <thead>
                            <tr>
                                {HEADERS.map((head, i) => (
                                    <th
                                        key={i}
                                        className=" px-4 py-3 border border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                                        <div className="flex items-center justify-center gap-6 cursor-pointer">
                                            <div className="gap-3">
                                                <span className="font-medium text-theme-xs dark:text-gray-400">
                                                    {head?.toUpperCase()}
                                                </span>
                                            </div>
                                            <button className="flex flex-col gap-0.5" onClick={() => { }}>
                                                <ChevronsUpDown size={12} className='dark:text-gray-700'
                                                />
                                            </button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]  dark:border-gray-900  dark:border-gray-700 dark:bg-gray-900" >
                            {weeklyPrograms?.map((program: WeeklyProgram, i: number) => (
                                <TableRow key={i}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 border border-black-200  dark:border-gray-700 w-[25%]">
                                        <div className="flex flex-col text-center place-items-center">
                                            {update ? (
                                                <input
                                                    value={program?.day}
                                                    type="text"
                                                    name="day"
                                                    className="rounded p-1 w-full dark:bg-white/[0.03]"
                                                    onChange={(e) => setNewTrialProgram(program.id, e)}
                                                />
                                            ) : <h3 className="font-bold text-2xl">{program.day}</h3>}

                                            <ProgramData
                                                value={program?.focus}
                                                rows={3}
                                                name="focus"
                                                onChange={(e: any) => setNewTrialProgram(program.id, e)}
                                            />

                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 border border-black-200 dark:border-gray-700 w-[20%]">
                                        <ProgramData
                                            value={program?.warm_up}
                                            rows={3}
                                            name="warm_up"
                                            onChange={(e: any) => setNewTrialProgram(program.id, e)}
                                        />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 border border-black-200 w-[30%]  dark:border-gray-700">
                                        {update ? (
                                            <textarea
                                                value={program?.workout}
                                                rows={4}
                                                className="rounded p-1 mt-2 text-xs w-full dark:bg-white/[0.03]"
                                                name="workout"
                                                onChange={(e: any) => setNewTrialProgram(program.id, e)}
                                            />
                                        ) : Array.isArray(program.workout) ?
                                            program.workout?.map((item, i) => (
                                                <ul key={i}>
                                                    <li className="flex gap-1 place-items-center">
                                                        <Check2Square className="text-green-500" />{item}
                                                    </li>
                                                </ul>
                                            )) :
                                            program.workout?.split(",")?.map((item, i) => (
                                                <ul key={i}>
                                                    <li className="flex gap-1 place-items-center">
                                                        <Check2Square className="text-green-500" />{item}
                                                    </li>
                                                </ul>
                                            ))}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 border border-black-200 dark:border-gray-700 w-[15%]">
                                        <ProgramData
                                            value={program?.cool_down}
                                            rows={4}
                                            name="cool_down"
                                            onChange={(e: any) => setNewTrialProgram(program.id, e)}
                                        />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 border border-black-200 dark:border-gray-700 w-[15%]">
                                        <ProgramData
                                            value={program?.alignment}
                                            rows={4}
                                            name="alignment"
                                            onChange={(e: any) => setNewTrialProgram(program.id, e)}
                                        />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 border border-black-200 dark:border-gray-700 w-[5%]">
                                        <button
                                            onClick={() => handleEditProgram(program)}
                                            className="flex gap-2 dark:bg-gray-700 bg-torq p-2 text-white rounded-lg hover:bg-blue-300 shadow">
                                            <Edit size={16} />
                                            Update
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </table>
                </div>
            </div>
        </motion.div>
    )
}

export default WeeklyPrograms;