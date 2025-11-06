import PageBreadcrumb from '@/common/PageBreadCrumb';
import Create from '@/Components/Admin/Trainees/GoPeakFit/Create';
import Update from '@/Components/Trainee/Forms/Update';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { useGpfStore } from '@/stores/useGpfStore';
import { useTraineeStore } from '@/stores/useTraineeStore';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';
import GpfTable from '../GpfTrainee/GpfTable';
import TableHeader from '@/Components/Admin/Trainees/GoPeakFit/TableHeader';
import { Button } from '@material-tailwind/react';

const GpfTrainee = ({ data }: { data: any }) => {
  // Constants
  const GET_NON_GPF_TRAINEES = import.meta.env.VITE_GET_NON_GPF_TRAINEES;

  //Global states from store
  const { refetchData, showAddTraineeForm } = useGpfStore();
  const {
    loading,
    strictnessLevel,
    perPage,
    pageNumber,
    setTraineeDataArray,
    setPerPage,
    setPageNumber,
    page,
    setPage,
    setLoading,
    updateTrainee,
    setUpdateTrainee
  } = useTraineeStore();


  // Fetch new set of data based on filter
  const newData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(GET_NON_GPF_TRAINEES, {
        params: {
          per_page: perPage,
          page_number: pageNumber,
          strictness_level: strictnessLevel,
        },
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
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }


  }

  // Get new data everytime filter strictnes level, and pagination change
  useEffect(() => {
    newData();
    setUpdateTrainee(false);
  }, [perPage, pageNumber, strictnessLevel, refetchData]);

  return (
    <Authenticated>

      <Head title="GoPeakFit Trainees Lists Table, Workout and Diet Expert Coach" />
      <div className={`${(updateTrainee || showAddTraineeForm) && 'hidden'}`}>

        <PageBreadcrumb pageTitle="GoPeakFit Trainees" />
        {/*<Card className="h-full w-full dark:bg-gray-900">
          <TraineeTable />
        </Card> */}
        <TableHeader />
        <div className="space-y-6">
          {loading ? <div className='flex justify-center mt-[15%]'>
            <Button variant="outline" className="dark:bg-gray-700 p-3.5" loading={true}>
              Loading Trainees
            </Button>
          </div> : <GpfTable />}
        </div>
      </div>

      {updateTrainee && <Update />}

      {showAddTraineeForm && <Create />}

    </Authenticated>
  )
}

export default GpfTrainee