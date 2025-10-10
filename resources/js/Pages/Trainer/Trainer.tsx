import TableContainer from '@/Components/Admin/Tables/TableContainer';
import TableContent from '@/Components/Admin/Tables/TableContent';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { TrainersProps } from '@/types/gpf';
import { trainer } from '@/utils/data/trainer/trainer';
import {
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { Head } from '@inertiajs/react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Typography
} from "@material-tailwind/react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

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

    return (
        <Authenticated>

            <Head title="GoPeakFit trainers" />

            <TableContainer>
                <Card className="h-full w-full bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="rounded-none bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300"
                    >
                        {/* Header */}
                        <div className="mb-3 flex items-center justify-between gap-6">
                            <div>
                                <Typography
                                    variant="h5"
                                    color="blue-gray"
                                    className="text-gray-900 dark:text-gray-100 font-semibold"
                                >
                                    Trainers List
                                </Typography>
                                <Typography
                                    color="gray"
                                    className="mt-1 font-normal text-gray-600 dark:text-gray-400"
                                >
                                    See information about all Trainers
                                </Typography>
                            </div>

                            {/* Pagination + Select */}
                            <div className="flex flex-col gap-2 sm:flex-row items-center">
                                <select
                                    name="strictness-level"
                                    id="strictness-level"
                                    className="
            rounded-lg border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            px-3 py-2 text-sm focus:outline-none focus:ring-2
            focus:ring-blue-500 dark:focus:ring-torq transition-all
          "
                                    onChange={(e: any) => setPerPage(e.target.value)}
                                >
                                    <option value={perPage}>{perPage}</option>
                                    <option value={10}>10</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                    {page?.total > 100 && <option value={page.total}>All</option>}
                                </select>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outlined"
                                        size="sm"
                                        onClick={() =>
                                            setPageNumber(page.currentPage == 1 ? 1 : page.currentPage - 1)
                                        }
                                        className="
              border-gray-300 dark:border-gray-700 
              text-gray-700 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800 transition
            "
                                    >
                                        <ChevronLeft />
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="sm"
                                        onClick={() =>
                                            setPageNumber(
                                                page.currentPage == page.lastPage
                                                    ? page.currentPage
                                                    : page.currentPage + 1
                                            )
                                        }
                                        className="
              border-gray-300 dark:border-gray-700 
              text-gray-700 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800 transition
            "
                                    >
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Search & Info */}
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-gray-700 dark:text-gray-300"
                            >
                                Showing {page.from}-{page.to} of {page.total} Trainers
                            </Typography>

                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-gray-700 dark:text-gray-300"
                            >
                                Page {page.currentPage} of {page.lastPage}
                            </Typography>

                            <div className="w-full md:w-72">
                                <Input
                                    value={filter}
                                    onChange={(e: any) => setFilter(e.target.value)}
                                    label="Search"
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                    className="
            dark:[&>input]:bg-gray-800 
            dark:[&>input]:text-gray-100 
            dark:[&>label]:text-gray-400 
            dark:[&>div>svg]:text-gray-400
          "
                                />
                            </div>
                        </div>
                    </CardHeader>

                    {/* Table */}
                    <CardBody className="overflow-auto px-2 bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
                        <TableContent
                            TABLE_HEAD={TABLE_HEAD}
                            TABLE_ROWS={TABLE_ROWS}
                            handleOpen={handleOpen}
                            filter={filter}
                        />
                    </CardBody>
                </Card>

            </TableContainer>
        </Authenticated >
    )
}

export default Trainer