import CreateTrainerForm from '@/Components/Admin/Trainer/Create/CreateTrainerForm';
import EditTrainerForm from '@/Components/Admin/Trainer/Edit/EditTrainerForm';
import TrainerTable from '@/Components/Admin/Trainer/TrainerTable';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { useTrainerStore } from '@/stores/useTrainerStore';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';

const Trainer = ({ data }: { data: any }) => {
    // Form data
    const { delete: destroy, processing } = useForm();

    // Global states
    const {
        perPage,
        pageNumber,
        open,
        refetchData,
        setPerPage,
        setPageNumber,
        setOpen,
        setTrainerData,
        setTrainerDataArray,
        setIsEdit,
        setPage,
        setRefetchData,
        setShowAddTrainerForm
    } = useTrainerStore();

    // When component mounts, set initial data from props
    useEffect(() => {
        if (data) {
            setTrainerDataArray(data?.data);
            setPerPage(data?.per_page);
            setPageNumber(data?.current_page);
            setPage({
                from: data?.from ?? 1,
                to: data?.to ?? 10,
                total: data?.total ?? 10,
                currentPage: data?.current_page ?? 1,
                lastPage: data?.last_page ?? 1,
            });
        }
    }, [data]);

    // Handle open modal
    const handleOpen = (trainer: any) => {
        setOpen(!open);
        setTrainerData(trainer);
        setIsEdit(true);
        setShowAddTrainerForm(false);
    };

    // Fetch new set of data based on filter/pagination
    const newData = async () => {
        const GET_TRAINERS = import.meta.env.VITE_GET_TRAINERS;

        try {
            const response = await axios.get(GET_TRAINERS, {
                params: {
                    per_page: perPage,
                    page_number: pageNumber,
                },
            });

            if (response?.data?.success) {
                const data = response.data.data;

                setTrainerDataArray(data?.data || []);
                setPerPage(data?.per_page || 10);
                setPageNumber(data?.current_page || 1);
                setPage({
                    from: data?.from ?? 1,
                    to: data?.to ?? 10,
                    total: data?.total ?? 10,
                    currentPage: data?.current_page ?? 1,
                    lastPage: data?.last_page ?? 1,
                });
            }
        } catch (error) {
            console.error("Failed to fetch trainers:", error);
        }
    };

    // Get new trainers
    useEffect(() => {
        newData();
        setShowAddTrainerForm(false);
        setIsEdit(false);
    }, [perPage, pageNumber]);

    // Delete trainee handler
    const handleRemoveTrainer = (id: number) => {
        if (!confirm('Are you sure you want to delete this trainer?')) return;

        try {
            destroy(route('users.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Trainer  has been deleted successfully!');
                    setRefetchData(!refetchData);
                },
                onError: (errors) => {
                    toast.error('Failed to delete user.');
                    console.error(errors);
                }
            });
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('Something went wrong while deleting the user.');
        }
    }

    return (
        <Authenticated>
            <Head title="GoPeakFit trainers" />
            <TrainerTable
                handleOpen={handleOpen}
                handleRemoveTrainer={handleRemoveTrainer}
            />
            <CreateTrainerForm />
            <EditTrainerForm />
        </Authenticated >
    )
}

export default Trainer