import Update from '@/Components/Trainee/Gpf/Modal/Update';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { GpfTraineeProps } from '@/types/gpf';
import { TraineeData } from '@/utils/data/trainee/gpf/trainee';
import { getStrictnessLevel } from '@/utils/functions/helperFunctions';
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
    Chip,
    IconButton,
    Input,
    Tab,
    Tabs,
    TabsHeader,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import { useState } from 'react';

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


const Trainees = ({ trainees }: { trainees: any }) => {
  //Local states
  const [strictnessLevel, setStrictnessLevel] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [traineeData, setTraineeData] = useState<GpfTraineeProps>(TraineeData);
  const [traineeDataArray, setTraineeDataArray] = useState<GpfTraineeProps[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [reload, setReload] = useState<boolean>(false);
  const [page, setPage] = useState({
    from: 1,
    to: 10,
    total: 10,
    currentPage: 1,
    lastPage: 1,
  })

  const handleOpen = (trainee: any) => {
    setOpen(!open);
    setTraineeData(trainee);
  }

  const TABLE_HEAD = ["Name / Email", "Address", "Phone Number", "Age", "Fitness Level", "Strictness Level", "Action"];

  const TABLE_ROWS = traineeDataArray;

  return (
    <Authenticated>

      <Head title="GoPeakFit Trainees" />

      <div className="bg-slate-300 p-6">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-3 flex items-center justify-between gap-6">
              <div>
                <Typography variant="h5" color="blue-gray">
                 My Trainees
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
              <Tabs value={0} className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value} onClick={() => setStrictnessLevel(value)}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>


              <Typography variant="small" color="blue-gray" className="font-normal">
                Showing {page.from}-{page.to} of {trainees?.length} Trainees
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
                {trainees
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
                        <tr key={trainee.id}>
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
                                {trainee.phone_number}
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
                                {trainee.age}
                              </Typography>
                            </div>
                          </td>

                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={trainee.fitness_level}
                                color={"green"}
                              />
                            </div>
                          </td>

                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={getStrictnessLevel(trainee.strictness_level)}
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
          </CardBody>
        </Card>

        <Update
          open={open}
          handleOpen={handleOpen}
          traineeData={traineeData}
          setReload={setReload}
          reload={reload}
        />
      </div>
    </Authenticated >
  )
}

export default Trainees