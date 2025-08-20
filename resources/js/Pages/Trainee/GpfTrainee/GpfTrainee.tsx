import Authenticated from '@/Layouts/AuthenticatedLayout';
import { getStrictnessLevel } from '@/utils/functions/helperFunctions';
import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Head } from '@inertiajs/react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
import { useEffect, useState } from 'react';

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Chill",
    value: "1",
  },
  {
    label: "Balanced",
    value: "2",
  },
  {
    label: "Strict",
    value: "3",
  },
];


const GpfTrainee = ({ data }: { data: any }) => {

  //Local states
  const [strictnessLevel, setStrictnessLevel] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(data?.per_page);
  const [pageNumber, setPageNumber] = useState<number>(data?.current_page);
  
  console.log('data: ', data);

  const TABLE_HEAD = ["Name / Email", "Address", "Phone Number", "Age", "Fitness Level", "Strictness Level", "Action"];

  const TABLE_ROWS = data.data;

  useEffect(() => {
    
  },[perPage, pageNumber, strictnessLevel]);


  return (
    <Authenticated>

      <Head title="GoPeakFit Trainees" />

      <div className="bg-slate-300 p-6">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-3 flex items-center justify-between gap-6">
              <div>
                <Typography variant="h5" color="blue-gray">
                  GoPeakFit Members list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members under GoPeakFit
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  view all
                </Button>
                <Button className="flex items-center gap-3" size="sm">
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <Input
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
                {TABLE_ROWS.map(
                  (e:any, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "py-2 px-4"
                      : "py-2 px-4 border-b border-blue-gray-50";

                    return (
                      <tr key={e.id}>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {e.first_name} {e.last_name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {e.email}
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
                              {e.city}, {e.state?.slice(0,20)}
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
                              {e.phone_number}
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
                              {e.age}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={e.fitness_level}
                              color={"green"}
                            />
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={getStrictnessLevel(e.strictness_level)}
                              color={"blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
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
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Showing {data.from}-{data?.to} of {data.total} trainees
            </Typography>

             <Typography variant="small" color="blue-gray" className="font-normal">
              Page {data.from} of {data.last_page}
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>

      </div>
    </Authenticated>
  )
}

export default GpfTrainee