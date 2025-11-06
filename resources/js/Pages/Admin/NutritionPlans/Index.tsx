import PageBreadcrumb from '@/common/PageBreadCrumb';
import MembersNutritionListsTable from '@/Components/Admin/NutritionPlan/MembersNutritionListsTable';
import Update from '@/Components/Admin/NutritionPlan/Update';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { useNutritionStore } from '@/stores/useNutritionStore';
import { Plan } from '@/types/weekly-nutrition';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Index({ plans }: { plans: Plan[] }) {
  const { setShowUpdatePlan } = useNutritionStore();

  useEffect(() => {
    setShowUpdatePlan(false);
  }, []);

  return (
    <Authenticated>
      <Head title="GoPeakFit Trainees Lists Table, Workout and Diet Expert Coach" />
      <PageBreadcrumb pageTitle="GoPeakFit Trainees Nutrition Lists" />
      <MembersNutritionListsTable plans={plans} />
      <Update />
    </Authenticated>
  );
}
