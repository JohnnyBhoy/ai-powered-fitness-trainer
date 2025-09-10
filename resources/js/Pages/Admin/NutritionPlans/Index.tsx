import AddPlan from '@/Components/Admin/NutritionPlan/AddPlan';
import Header from '@/Components/Admin/NutritionPlan/Header';
import Table from '@/Components/Admin/NutritionPlan/Table';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

type Trainee = {
  id: number;
  name: string;
  goal: string;
};

type NutritionPlan = {
  id: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  start_date: string;
  end_date?: string;
  trainee: Trainee;
};

type Props = {
  plans: NutritionPlan[];
};

export default function Index({ plans }: Props) {

  return (
    <Authenticated>
      <Head title="Nutrition Plans" />
      <div className="max-w-6xl mx-auto py-10">
        <Header title="Nutrition Plans"/>
        <AddPlan />
        <Table plans={plans} />
      </div>
    </Authenticated>
  );
}
