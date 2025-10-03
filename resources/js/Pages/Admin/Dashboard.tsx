import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { Cards } from '@/types/admin';
import { Head } from '@inertiajs/react';
import EcommerceMetrics from "@/Components/Ecommerce/EcommerceMetrics";
import MonthlySalesChart from "@/Components/Ecommerce/MonthlySalesChart";
import StatisticsChart from "@/Components/Ecommerce/StatisticsChart";
import MonthlyTarget from "@/Components/Ecommerce/MonthlyTarget";
import RecentOrders from "@/Components/Ecommerce/RecentOrders";
import DemographicCard from "@/Components/Ecommerce/DemographicCard";

type DashboardProps = {
  monthlyGpfTrainerCount: any;
  monthlyTrainerCount: any;
  monthlyTraineeCount: any;
  latestUsers: any;
  gpfUsersCount: any;
  traineeCount: any;
  trainerCount: any;
};

const Dashboard = ({
  monthlyGpfTrainerCount,
  monthlyTrainerCount,
  monthlyTraineeCount,
  latestUsers,
  gpfUsersCount,
  traineeCount,
  trainerCount,
}: DashboardProps) => {
  const monthlyGoPeakFitTrainer: number[] = Object.values(monthlyGpfTrainerCount);
  const monthlyTrainer: number[] = Object.values(monthlyTrainerCount);
  const monthlyTraineeAddedByTrainer: number[] = Object.values(monthlyTraineeCount);

  const cards: Cards[] = [
    {
      id: 1,
      title: 'Trainers',
      count: trainerCount,
      text: 'Active Trainers managing clients',
      icon: '/images/trainers/trainer.png',
      link: '/admin/trainers',
    },
    {
      id: 2,
      title: 'Trainees Under Trainers',
      count: traineeCount,
      text: 'Actively monitored by trainers',
      icon: '/images/trainee/trainee.png',
      link: '/admin/non-gpf-trainees',
    },
    {
      id: 3,
      title: 'Trainees with GPF AI',
      count: gpfUsersCount,
      text: 'Engaged with AI-driven programs',
      icon: '/images/gpf_trainee/gpf_trainee.jpg',
      link: '/admin/gpf-trainees',
    },
  ];

  return (
    <Authenticated>
      <Head title="Admin Dashboard" />
      <main className='mx-auto max-w-(--breakpoint-2xl)'>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <EcommerceMetrics />

            <MonthlySalesChart />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <MonthlyTarget />
          </div>

          <div className="col-span-12">
            <StatisticsChart />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <DemographicCard />
          </div>

          <div className="col-span-12 xl:col-span-7">
            <RecentOrders />
          </div>
        </div>
      </main>
    </Authenticated>
  );
};

export default Dashboard;
