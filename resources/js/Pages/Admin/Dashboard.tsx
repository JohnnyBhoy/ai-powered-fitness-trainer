import DemographicCard from "@/Components/Admin/Dashboard/DemographicCard";
import MonthlyTrainersChart from "@/Components/Admin/Dashboard/MonthlyTraineesChart";
import MonthlyTarget from "@/Components/Admin/Dashboard/MonthlyUsers";
import RecentOrders from "@/Components/Admin/Dashboard/RecentTrainees";
import StatisticsChart from "@/Components/Admin/Dashboard/StatisticsChart";
import TrainersMetrics from "@/Components/Admin/Dashboard/TrainersMetrics";
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useTraineeStore } from "@/stores/useTraineeStore";
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

const Dashboard = () => {
  const { fetchDashboardData } = useDashboardStore();

  // Get data every 7 seconds
  useEffect(() => {
    fetchDashboardData();

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchDashboardData();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  const { showProgram } = useTraineeStore();

  console.log('program status in dashboard : ', showProgram);


  return (
    <Authenticated>
      <Head title="Admin Dashboard" />
      <main className='mx-auto max-w-(--breakpoint-2xl)'>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <TrainersMetrics />

            <MonthlyTrainersChart />
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
