import Authenticated from '@/Layouts/AuthenticatedLayout';
import { TrainersProps } from '@/types/gpf';
import { trainer } from '@/utils/data/trainer/trainer';
import {
    ChevronUpDownIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Head } from '@inertiajs/react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    IconButton,
    Input,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

const TABS = [
    {
        label: "All",
        value: 0,
    },
    {
        label: "Chill",
        value: 1,
    },
    {
        label: "Balanced",
        value: 2,
    },
    {
        label: "Strict",
        value: 3,
    },
];


const Trainer = ({ data }: { data: any }) => {
    //Local states
    const [perPage, setPerPage] = useState<number>(data?.per_page);
    const [pageNumber, setPageNumber] = useState<number>(data?.current_page);
    const [open, setOpen] = useState<boolean>(false);
    const [trainerData, setTrainerData] = useState<TrainersProps>(trainer);
    const [trainerDataArray, settrainerDataArray] = useState<TrainersProps[]>(data?.data);
    const [filter, setFilter] = useState<string>('');
    const [page, setPage] = useState({
        from: 1,
        to: 10,
        total: 10,
        currentPage: 1,
        lastPage: 1,
    })

    const handleOpen = (trainer: any) => {
        setOpen(!open);
        setTrainerData(trainer);
    }

    const TABLE_HEAD = ["Id", "Name / Email", "Username", "No of Trainees", "Trainees", "Programs", "Created Date", "Action"];
    const TABLE_ROWS = trainerDataArray;

    //Fetch new set of data based on filter
    const newData = async () => {
        const GET_TRAINERS = import.meta.env.VITE_GET_TRAINERS;
        const response = await axios.get(GET_TRAINERS, {
            params: {
                per_page: perPage,
                page_number: pageNumber,
            }
        });

        if (response?.data?.success) {
            const data = response?.data?.data;
            settrainerDataArray(data?.data);
            setPerPage(data?.per_page);
            setPageNumber(data?.current_page);
            setPage({
                ...page, from: data?.from,
                to: data?.to,
                total: data?.total,
                currentPage: data.current_page,
                lastPage: data.last_page,
            })
        }
    }

    //Get new data everytime filter strictnes level, and pagination change
    useEffect(() => {
        newData();
    }, [perPage, pageNumber]);

    console.log('trainerDataArray', trainerDataArray);

    return (
        <Authenticated>

            <Head title="GoPeakFit trainers" />

            <div className="bg-slate-300 p-6">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-3 flex items-center justify-between gap-6">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Trainers list
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    See information about all Trainers
                                </Typography>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row">

                                <select
                                    name="strictness-level"
                                    id="strictness-level"
                                    className='rounded-lg border border-1 border-slate-900 w-auto'
                                    onChange={(e: any) => setPerPage(e.target.value)}
                                >
                                    <option value={perPage}>{perPage} per page</option>
                                    <option value={10}>10 per page</option>
                                    <option value={50}>50 per page</option>
                                    <option value={100}>100 per page</option>
                                    <option value={page.total}>Show all {page.total} </option>
                                </select>

                                <Button variant="outlined" size="sm" onClick={() => setPageNumber(page.currentPage == 1 ? 1 : page.currentPage - 1)}>
                                    Previous
                                </Button>
                                <Button variant="outlined" size="sm" onClick={() => setPageNumber(page.currentPage == page.lastPage ? page.currentPage : page.currentPage + 1)}>
                                    Next
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Showing {page.from}-{page.to} of {page.total} Trainers
                            </Typography>

                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Page {page.currentPage} of {page.lastPage}
                            </Typography>

                            <div className="w-full md:w-72">
                                <Input
                                    value={filter}
                                    onChange={(e:any) => setFilter(e.target.value)}
                                    label="Search"
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll px-2">
                        <table className=" w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
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
                                {TABLE_ROWS
                                    ?.filter((trainer: TrainersProps) => trainer?.first_name?.includes(filter)
                                        || trainer?.email?.includes(filter)
                                        || trainer?.last_name?.includes(filter)
                                        || trainer?.user_name?.includes(filter)
                                    )
                                    ?.map(
                                        (trainer: TrainersProps, index: number) => {
                                            const isLast = index === TABLE_ROWS.length - 1;
                                            const classes = isLast
                                                ? "py-2 px-4"
                                                : "py-2 px-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={trainer.id}>
                                                    <td className={classes}>
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {trainer.id}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-semibold"
                                                            >
                                                                {trainer.first_name} {trainer.last_name}
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal opacity-70"
                                                            >
                                                                {trainer.email}
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
                                                                {trainer.user_name}
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
                                                                {trainer?.trainees?.length}
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
                                                                {trainer?.trainees?.length == 0 ? (
                                                                        <h4 className='text-xs'>No trainee added</h4>
                                                                ) : trainer?.trainees?.map((trainee: any) => (
                                                                    <h4 className='text-xs'>{trainee.first_name} {trainee.last_name}</h4>
                                                                ))}
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
                                                                N/A
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
                                                                {moment(trainer?.created_at).format('MMMM D, YYYY hA')}
                                                            </Typography>
                                                        </div>
                                                    </td>

                                                    <td className={classes}>
                                                        <Tooltip content="Edit trainer">
                                                            <IconButton variant="text" onClick={() => handleOpen(trainer)} >
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
                    </CardBody>
                </Card>

            </div>
        </Authenticated >
    )
}

export default Trainer