import PageBreadcrumb from '@/common/PageBreadCrumb';
import Create from '@/Components/Admin/Trainees/GoPeakFit/Create';
import Update from '@/Components/Trainee/Forms/Update';
import Authenticated from "@/Pages/Layouts/AuthenticatedLayout";
import { useGpfStore } from '@/stores/useGpfStore';
import { useTraineeStore } from '@/stores/useTraineeStore';
import { Head, router, useForm } from "@inertiajs/react";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import GpfTable from './GpfTable';
import { Button } from '@material-tailwind/react';
import TableHeader from '@/Components/Admin/Trainees/GoPeakFit/TableHeader';

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

      <Head title="GoPeakFit Trainees Lists Table, Workout and Diet Expert Coach" />
      <div className={`${(updateTrainee || showAddTraineeForm) && 'hidden'}`}>

        <PageBreadcrumb pageTitle="GoPeakFit Trainees" />
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
  );
}

export default GpfTrainee;