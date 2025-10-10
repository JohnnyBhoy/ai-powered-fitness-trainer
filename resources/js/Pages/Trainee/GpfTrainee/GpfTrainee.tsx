import TableContainer from '@/Components/Admin/Tables/TableContainer';
import TableContent from '@/Components/Admin/Tables/TableContent';
import TableHeader from '@/Components/Admin/Tables/TableHeader';
import Update from '@/Components/Trainee/Gpf/Modal/Update';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { GpfTraineeProps } from '@/types/gpf';
import { TABLE_HEAD } from '@/utils/data/TableHead';
import { TABS } from '@/utils/data/Tabs';
import { TraineeData } from '@/utils/data/trainee/gpf/trainee';
import { Head } from '@inertiajs/react';
import {
  Card,
  CardBody
} from "@material-tailwind/react";
import axios from 'axios';
import { useEffect, useState } from 'react';

const GpfTrainee = ({ data }: { data: any }) => {

  // Local states
  const [strictnessLevel, setStrictnessLevel] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(data?.per_page);
  const [pageNumber, setPageNumber] = useState<number>(data?.current_page);
  const [open, setOpen] = useState<boolean>(false);
  const [traineeData, setTraineeData] = useState<GpfTraineeProps>(TraineeData);
  const [traineeDataArray, setTraineeDataArray] = useState<GpfTraineeProps[]>(data?.data);
  const [filter, setFilter] = useState<string>('');
  const [reload, setReload] = useState<boolean>(false);
  const [page, setPage] = useState({
    from: 1,
    to: 10,
    total: 10,
    currentPage: 1,
    lastPage: 1,
  })

  // Data
  const handleOpen = (trainee: any) => {
    setOpen(!open);
    setTraineeData(trainee);
  }

  const TABLE_ROWS = traineeDataArray;

  //Fetch new set of data based on filter
  const newData = async () => {
    const GET_GPF_TRAINEES = import.meta.env.VITE_GET_GPF_TRAINEES;
    const response = await axios.get(GET_GPF_TRAINEES, {
      params: {
        per_page: perPage,
        page_number: pageNumber,
        strictness_level: strictnessLevel,
      }
    });

    if (response?.data?.success) {
      const data = response?.data?.data;

      setTraineeDataArray(data?.data);
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
  }, [perPage, pageNumber, strictnessLevel, reload]);

  return (
    <Authenticated>

      <Head title="GoPeakFit Trainees" />

      <TableContainer>
        <Card className={`dark:bg-gray-900 h-full w-full ${open ? 'hidden' : ''}`}>
          <TableHeader
            perPage={perPage}
            setPerPage={setPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            page={page}
            TABS={TABS}
            filter={filter}
            setFilter={setFilter}
            setStrictnessLevel={setStrictnessLevel}
            traineeType='GoPeakFit'
          />
          <CardBody className="overflow-scroll px-2  dark:bg-gray-900 dark:text-gray-100 ">
            <TableContent
              TABLE_HEAD={TABLE_HEAD}
              TABLE_ROWS={TABLE_ROWS}
              handleOpen={handleOpen}
              filter={filter}
            />
          </CardBody>
        </Card>
      </TableContainer>

      {open && <Update traineeData={traineeData} />}
    </Authenticated >
  )
}

export default GpfTrainee