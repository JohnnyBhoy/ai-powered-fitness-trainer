import Create from '@/Components/Admin/Trainees/GoPeakFit/Create';
import TraineeTable from '@/Components/Admin/Trainees/TraineeTable';
import Update from '@/Components/Trainee/Forms/Update';
import Authenticated from "@/Pages/Layouts/AuthenticatedLayout";
import { useGpfStore } from '@/stores/useGpfStore';
import { useTraineeStore } from '@/stores/useTraineeStore';
import { Head, router, useForm } from "@inertiajs/react";
import {
  Card
} from "@material-tailwind/react";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Trial",
    value: "Trial",
  },
  {
    label: "Subscribed",
    value: "Subscribed",
  },
];

const TABLE_HEAD = ["Name", "Email", "Address", "Goal", "Current Weight", "Goal Weight", "Strictness Level", "Action"];

const GpfTrainee = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


  // Form Data
  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    user_name: '',
    password: '',
    role: 3,
    is_promo: 0,
    trainer_id: undefined,
    city: '',
    state: '',
    phone_number: '',
    age: '',
    sex: '',
    current_weight: '',
    goal_weight: '',
    fitness_level: '',
    equipment_access: '',
    food_allergies: '',
    strictness_level: 1,
  });

  const optionalInputs = ["is_promo"];

  // Create trainee
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Data validation
    for (const [key, value] of Object.entries(data)) {
      if (value == "" && !optionalInputs?.includes(key)) {
        return toast.error(`${key} is required.`);
        break;
      }
    }

    try {
      post('/admin/trainee/store', {
        onSuccess: () => {
          reset();
          toast.success('Trainee created successfully.');

          setShowAddTraineeForm(false);
          setUpdateTrainee(false);

          router.visit('/admin/gpf-trainees');
        },
        onError: (error: any) => {
          toast.error(Object.values(error));
          console.log('errro:', error);
        }
      });
    } catch (error) {
      toast.error('Unable to save trainee, please try again.')
    }
  };


  const [size, setSize] = useState(null);

  const handleOpen = (value: any) => setSize(value);

  // Constants
  const GET_GPF_TRAINEES = import.meta.env.VITE_GET_GPF_TRAINEES;

  //Global states from store
  const { refetchData, showAddTraineeForm, setShowAddTraineeForm } = useGpfStore();
  const {
    strictnessLevel,
    perPage,
    pageNumber,
    loading,
    setTraineeDataArray,
    traineeDataArray,
    setPerPage,
    setPageNumber,
    page,
    setPage,
    setLoading,
    updateTrainee,
    setUpdateTrainee,
    setTraineeData,
    setShowProgram,
    setShowNutrition,
    setShowPrompt,
  } = useTraineeStore();


  // Fetch new set of data based on filter
  const newData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(GET_GPF_TRAINEES, {
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

  const TABLE_ROWS = traineeDataArray;


  // Get new data everytime filter strictnes level, and pagination change
  useEffect(() => {
    newData();
    setUpdateTrainee(false);
    setShowAddTraineeForm(false);
  }, [perPage, pageNumber, strictnessLevel, refetchData]);

  // Open update trainee form
  const handleEditTrainee = (trainee: any) => {
    setUpdateTrainee(true);
    setTraineeData(trainee);
    setShowProgram(false);
    setShowNutrition(false);
    setShowPrompt(false);
  }

  return (
    <Authenticated>

      <Head title="GoPeakFit Trainees" />
      <div className={`${(updateTrainee || showAddTraineeForm) && 'hidden'} border border-gray-200 dark:border-gray-800 dark:bg-white/[0.03]`}>

        <Card className="h-full w-full dark:bg-gray-900">
          <TraineeTable />
        </Card>
      </div>
      {updateTrainee && <Update />}

      {showAddTraineeForm && <Create />}

    </Authenticated>
  );
}

export default GpfTrainee;

{/**           {/*<div className="flex justify-between pt-6 px-6">
            <h3 className='font-bold dark:text-gray-300'>Total : {traineeDataArray?.length ?? 0} Trainees</h3>
            <div className="relative flex ">
              <Search className='absolute m-2 dark:bg-black dark:text-white/90' size={18} />
              <input placeholder='Search trainee...' className='dark:bg-black text-sm p-1 dark:text-white/90 rounded pl-7' />
              <button
                onClick={() => setShowAddTraineeForm(true)}
                className='ml-3 bg-black border border-gray-500 rounded py-1 px-3 text-gray-300 flex gap-2 place-items-center'>
                <UserPlus size={16} />Add Trainee
              </button>
            </div>
          </div> 
<CardBody className="overflow-scroll">
  {loading ? <div className='flex place-items-center justify-center dark:text-white/90'>
    <Loader className='animate-spin grid place-items-center mr-1' /> Loading trainees...
  </div>
    : TABLE_ROWS?.length == 0 ? (
      <h1 className='font-bold text-lg text-center'>No trainee found.</h1>
    ) : (
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header 
                    <TableHeader className="border-gray-100 dark:border-gray-800 border border-1 border-gray-700">
                      <TableRow>
                        {TABLE_HEAD?.map((header, i) => (
                          <TableCell
                            isHeader
                            className="py-3 font-medium dark:text-gray-200 text-center text-theme-xs dark:text-white/90 border border-gray-300 border-1 border-gray-700"
                            key={i}
                          >
                            <div className="flex gap-7 place-items-center justify-center">
                              {header}
                              <ChevronsUpDown size={12} />
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHeader>

                    {/* Table Body

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {traineeDataArray.map((trainee, i) => (
                        <TableRow key={i} className="">
                          <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-white/90 border border-1 border-gray-700 pl-2">
                            {trainee.first_name} {trainee?.last_name}
                          </TableCell>
                          <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-white/90 border border-1 border-gray-700 pl-2">
                            {trainee.email}
                          </TableCell>
                          <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-white/90 border border-1 border-gray-700 pl-2">
                            {trainee.city?.substring(0, 20)}, {trainee.state?.substring(0, 20)}
                          </TableCell>
                          <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-white/90 border border-1 border-gray-700 pl-2">
                            {trainee?.goal?.substring(0, 20)}
                          </TableCell>
                          <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-white/90 border border-1 border-gray-700 pl-2">
                            {trainee?.current_weight} lbs
                          </TableCell>
                          <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-white/90 border border-1 border-gray-700 pl-2">
                            {trainee?.goal_weight} lbs
                          </TableCell>
                          <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-white/90 border border-1 border-gray-700 pl-2">
                            {getStrictnessLevel(trainee?.strictness_level)}
                          </TableCell>
                          <TableCell className="py-3 flex justify-center text-gray-500 text-theme-sm dark:text-gray-400 border border-1 border-gray-700">
                            <Edit onClick={() => handleEditTrainee(trainee)} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

          </CardBody>  */}