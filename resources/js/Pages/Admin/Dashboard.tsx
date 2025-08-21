import MonthlyUsersWithTrainerChart from '@/Components/Admin/Charts/MonthlyUsersWithTrainerChart';
import MonthlyUserWithoutTrainerChart from '@/Components/Admin/Charts/MonthlyUserWithoutTrainerChart';
import Stats from '@/Components/Admin/Dashboard/Stats';
import LatestUsers from '@/Components/Admin/Tables/LatestUsers';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Cards } from '@/types/admin';
import { Head } from '@inertiajs/react';

type DashboardProps = {
  monthlyGpfTrainerCount: any,
  monthlyTrainerCount: any,
  monthlyTraineeCount: any,
  latestUsers: any,
  gpfUsersCount: any,
  traineeCount: any,
  trainerCount: any,
}

const Dashboard = ({ monthlyGpfTrainerCount, monthlyTrainerCount, monthlyTraineeCount, latestUsers, gpfUsersCount, traineeCount, trainerCount }: DashboardProps) => {
  //Prepare data for charts
  const monthlyGoPeakFitTrainer: number[] = Object.values(monthlyGpfTrainerCount);
  const monthlyTrainer: number[] = Object.values(monthlyTrainerCount);
  const monthlyTraineeAddedByTrainer: number[] = Object.values(monthlyTraineeCount);

  console.log(latestUsers);

  //Cards data
  const cards: Cards[] = [{
    id: 1,
    title: 'Trainers',
    count: trainerCount,
    text: 'Trainers with Trainees',
    icon: '/images/trainers/trainer.png',
    link: '/admin/trainers',
  }, {
    id: 2,
    title: 'Trainees Under Trainer',
    count: traineeCount,
    text: 'Trainee Under Trainers Program',
    icon: '/images/trainee/trainee.png',
     link: '/admin/non-gpf-trainees',
  }, {
    id: 3,
    title: 'Trainees Under GoPeakFit AI',
    count: gpfUsersCount,
    text: 'Trainees Under GPF Program',
    icon: '/images/gpf_trainee/gpf_trainee.jpg',
     link: '/admin/gpf-trainees',
  }];

  return (
    <Authenticated>

      <Head title="Dashboard" />

      <Stats cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:px-6 px-3 py-2 gap-6">
        <MonthlyUsersWithTrainerChart
          trainees={monthlyGoPeakFitTrainer}
        />
        <MonthlyUserWithoutTrainerChart
          trainees={monthlyTraineeAddedByTrainer}
          trainer={monthlyTrainer}
        />
      </div>

      <div className="grid grid-cols-1">
        <LatestUsers users={latestUsers} />
      </div>

    </Authenticated>
  )
}

export default Dashboard