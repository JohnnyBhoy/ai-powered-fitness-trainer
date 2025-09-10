import NoRecordFound from '@/Components/NoRecordFound';
import { GpfTraineeProps } from '@/types/gpf';
import { getStrictnessLevel } from '@/utils/functions/helperFunctions';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Chip, IconButton, Tooltip, Typography } from '@material-tailwind/react';
import { PencilIcon } from 'lucide-react';
import React from 'react'

type TableContentProps = {
    TABLE_HEAD: Object[],
    TABLE_ROWS: any,
    handleOpen: CallableFunction,
    filter: string,
}

const TableContent = ({TABLE_HEAD, TABLE_ROWS, handleOpen, filter } : TableContentProps) => {
    return (
        <table className=" w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                    {TABLE_HEAD.map((head, index) => (
                        <th
                            key={index}
                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                        >
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                            >
                                {head}{" "}
                                {index !== TABLE_HEAD.length - 1 && (
                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                )}
                            </Typography>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {TABLE_ROWS?.length == 0
                    ? <NoRecordFound />
                    : TABLE_ROWS
                        ?.filter((trainee: GpfTraineeProps) => trainee?.first_name?.includes(filter)
                            || trainee?.email?.includes(filter)
                            || trainee?.last_name?.includes(filter)
                            || trainee?.user_name?.includes(filter)
                            || trainee?.city?.includes(filter)
                            || trainee?.state?.includes(filter)
                        )
                        ?.map(
                            (trainee: GpfTraineeProps, index: number) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast
                                    ? "py-2 px-4"
                                    : "py-2 px-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-semibold"
                                                >
                                                    {trainee.first_name} {trainee.last_name}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {trainee.email}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {trainee.city}, {trainee.state?.slice(0, 20)}
                                                </Typography>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {trainee.phone_number ?? "Not specify"}
                                                </Typography>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {trainee.age ?? 0}
                                                </Typography>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={trainee.fitness_level ?? 'Not specify'}
                                                    color={"green"}
                                                />
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={getStrictnessLevel(trainee.strictness_level) ?? 'Chill'}
                                                    color={"blue-gray"}
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit Trainee">
                                                <IconButton variant="text" onClick={() => handleOpen(trainee)} >
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
            </tbody>
        </table>
    )
}

export default TableContent