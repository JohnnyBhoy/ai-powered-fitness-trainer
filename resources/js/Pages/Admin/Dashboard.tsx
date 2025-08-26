import MonthlyUsersWithTrainerChart from '@/Components/Admin/Charts/MonthlyUsersWithTrainerChart';
import MonthlyUserWithoutTrainerChart from '@/Components/Admin/Charts/MonthlyUserWithoutTrainerChart';
import Stats from '@/Components/Admin/Dashboard/Stats';
import LatestUsers from '@/Components/Admin/Tables/LatestUsers';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Cards } from '@/types/admin';
import { Head, Link } from '@inertiajs/react';
import {
  UserCog,
  Users,
  Dumbbell,
  FileBarChart2,
  PlusCircle,
  Settings,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

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
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-2xl shadow-md p-6 flex justify-between items-center animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>
            <p className="text-sm text-indigo-100 mt-1">
              Monitor performance, trainers, and trainees with real-time data.
            </p>
          </div>
          <UserCog className="w-10 h-10 text-white opacity-80" />
        </div>

        {/* Stats Overview */}
        <Stats cards={cards} />

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-wrap gap-4 justify-between hover:shadow-md transition">
          <Link
            href="/admin/trainers/create"
            className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"
          >
            <PlusCircle className="w-4 h-4" /> Add Trainer
          </Link>
          <Link
            href="/admin/reports"
            className="flex items-center gap-2 px-4 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
          >
            <FileBarChart2 className="w-4 h-4" /> Generate Reports
          </Link>
          <Link
            href="/admin/programs"
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
          >
            <Dumbbell className="w-4 h-4" /> Manage Programs
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" /> Monthly GPF Trainees
            </h2>
            <MonthlyUsersWithTrainerChart trainees={monthlyGoPeakFitTrainer} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" /> Trainee & Trainer Growth
            </h2>
            <MonthlyUserWithoutTrainerChart
              trainees={monthlyTraineeAddedByTrainer}
              trainer={monthlyTrainer}
            />
          </div>
        </div>

        {/* Latest Users */}
        <LatestUsers users={latestUsers} />
      </main>
    </Authenticated>
  );
};

export default Dashboard;
