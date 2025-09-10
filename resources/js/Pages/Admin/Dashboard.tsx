import MonthlyUsersWithTrainerChart from '@/Components/Admin/Charts/MonthlyUsersWithTrainerChart';
import MonthlyUserWithoutTrainerChart from '@/Components/Admin/Charts/MonthlyUserWithoutTrainerChart';
import QuickActions from '@/Components/Admin/Dashboard/QuickActions';
import Stats from '@/Components/Admin/Dashboard/Stats';
import Welcome from '@/Components/Admin/Dashboard/Welcome';
import LatestUsers from '@/Components/Admin/Tables/LatestUsers';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { Cards } from '@/types/admin';
import { Head } from '@inertiajs/react';

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
      <main className="space-y-6 p-4 lg:p-6">
        <Welcome />
        <Stats cards={cards} />
        <QuickActions />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyUsersWithTrainerChart trainees={monthlyGoPeakFitTrainer} />
          <MonthlyUserWithoutTrainerChart
            trainees={monthlyTraineeAddedByTrainer}
            trainer={monthlyTrainer}
          />
        </div>
        <LatestUsers users={latestUsers} />
      </main>
    </Authenticated>
  );
};

export default Dashboard;
