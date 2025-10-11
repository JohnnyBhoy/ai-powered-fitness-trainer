import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/Components/ui/table";
import { useProgramStore, useTrialProgramStore } from "@/stores/useProgramStore";
import { WeeklyProgram } from "@/types/weekly-program";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Check2Square } from "react-bootstrap-icons";
import ProgramData from "./ProgramData";


const WeeklyPrograms = () => {
    const { update } = useProgramStore();
    const { setTrialPrograms, trialPrograms } = useTrialProgramStore();
    const [trialProgram, setTrialProgram] = useState<WeeklyProgram[]>(trialPrograms);
    const { weeklyPrograms } = useProgramStore();

    const HEADERS = ["Day", "Warm-up", "Workout", "Cool-down", "Alignment"];

    // ✅ FIXED: use functional update to always get the latest state
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

    // ✅ Debounce the final sync
    useEffect(() => {
        const debounce = setTimeout(() => {
            setTrialPrograms(trialProgram);
        }, 1000);

        return () => clearTimeout(debounce);
    }, [trialProgram]);


    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="overflow-hidden rounded-xl dark:border-gray-800 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]"
        >
            <div className="overflow-hidden rounded-xl bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table className="rounded-xl">
                        {/* Table Header */}
                        <TableHeader className="rounded-xl border dark:border-gray-800 dark:border-white/[0.05]">
                            <TableRow>
                                {HEADERS.map((header, i) => (
                                    <TableCell key={i} className="text-center px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 dark:bg-gray-800 border border-black-200 bg-torq text-white  dark:border-gray-700">
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]  dark:border-gray-800  dark:border-gray-700" >
                            {weeklyPrograms.map((program: WeeklyProgram, i: number) => (
                                <TableRow key={i}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 border border-black-200  dark:border-gray-700">
                                        <div className="flex flex-col text-cenyter place-items-center">
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </motion.div>
    )
}

export default WeeklyPrograms;