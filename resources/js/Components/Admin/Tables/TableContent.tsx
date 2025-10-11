import NoRecordFound from '@/Components/NoRecordFound';
import Badge from '@/Components/ui/badge/Badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/Components/ui/table';
import { GpfTraineeProps } from '@/types/gpf';
import { getStrictnessLevel } from '@/utils/functions/helperFunctions';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { PencilIcon } from 'lucide-react';
import moment from 'moment';

type TableContentProps = {
    TABLE_HEAD: Object[],
    TABLE_ROWS: any,
    handleOpen: CallableFunction,
    filter: string,
}

const TableContent = ({ TABLE_HEAD, TABLE_ROWS, handleOpen, filter }: TableContentProps) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Table Header */}
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            {TABLE_HEAD.map((head: any, i: number) => (
                                <TableCell
                                    isHeader
                                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    key={i}
                                >
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
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
                                ?.map((trainee: GpfTraineeProps, i: number) => (
                                    <TableRow key={i} className="">
                                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {trainee.first_name} {trainee?.last_name}
                                        </TableCell>
                                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {trainee.email}
                                        </TableCell>
                                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {trainee.city}, {trainee.state}
                                        </TableCell>
                                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            <Badge
                                                size="sm"
                                                color={
                                                    trainee.trainer_id === null
                                                        ? "success"
                                                        : trainee.trainer_id != null
                                                            ? "warning"
                                                            : "error"
                                                }
                                            >
                                                {trainee.trainer_id == null ? "GoPeakFit" : "Non GoPeakFit"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {moment(trainee.created_at).format('MMMM D, YYYY hA')}
                                        </TableCell>
                                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {getStrictnessLevel(trainee.strictness_level) ?? 'Chill'}
                                        </TableCell>
                                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            <Tooltip content="Edit Trainee">
                                                <IconButton variant="text" onClick={() => handleOpen(trainee)} >
                                                    <PencilIcon className="h-4 w-4 dark:bg-gray-900 dark:text-gray-100 " />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TableContent