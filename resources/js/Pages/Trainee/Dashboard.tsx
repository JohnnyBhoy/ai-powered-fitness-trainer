import BodyStatsChart from "@/Components/Trainee/Charts/BodyStatsChart";
import CaloriesChart from "@/Components/Trainee/Charts/CaloriesChart";
import DietProgressChart from "@/Components/Trainee/Charts/DietProgressChart";
import WorkoutProgressChart from "@/Components/Trainee/Charts/WorkoutProgressChart";
import DietTips from "@/Components/Trainee/Dashboard/DietTips";
import TraineeSummary from "@/Components/Trainee/Dashboard/TraineeSummary";
import Authenticated from "@/Pages/Layouts/AuthenticatedLayout";
import { Dumbbell, Flame, Scale, Award, Calendar, Bell, Activity, Apple } from "lucide-react";

const Dashboard = () => {
  return (
    <Authenticated>
      <main className="p-6 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-torq rounded-2xl p-6 shadow-md text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Trainee!</h1>
            <p className="mt-1 text-sm text-blue-100">
              Keep pushing toward your fitness goals — progress is showing!
            </p>
          </div>
          <Bell className="w-6 h-6 text-blue-100" />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-4">
          {[
            { title: "Completed Workouts", value: "18", sub: "this month", icon: <Dumbbell className="text-blue-500 w-6 h-6" /> },
            { title: "Calories Burned", value: "12,400", sub: "this month", icon: <Flame className="text-orange-500 w-6 h-6" /> },
            { title: "Weight Progress", value: "-2.3 kg", sub: "since last check-in", icon: <Scale className="text-green-500 w-6 h-6" /> },
            { title: "Streak", value: "6 Days", sub: "active streak", icon: <Award className="text-purple-500 w-6 h-6" /> },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-4 border hover:shadow-md transition flex items-center gap-3"
            >
              <div className="p-2 rounded-full bg-gray-100">{card.icon}</div>
              <div>
                <h3 className="text-sm text-gray-500">{card.title}</h3>
                <p className="text-xl font-bold text-gray-800">{card.value}</p>
                <span className="text-xs text-gray-400">{card.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout Progress */}
          <div className="bg-white rounded-xl shadow-sm p-4 border h-[350px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
              <Activity className="w-4 h-4 text-blue-500" /> Workout Progress
            </div>
            <WorkoutProgressChart className="flex-1" />
          </div>

          {/* Diet Progress */}
          <div className="bg-white rounded-xl shadow-sm p-4 border h-[350px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
              <Apple className="w-4 h-4 text-green-500" /> Diet Progress
            </div>
            <DietProgressChart className="flex-1" />
          </div>

          {/* Body Stats */}
          <div className="bg-white rounded-xl shadow-sm p-4 border h-[350px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
              <Scale className="w-4 h-4 text-indigo-500" /> Body Stats
            </div>
            <BodyStatsChart className="flex-1" />
          </div>

          {/* Calories Chart */}
          <div className="bg-white rounded-xl shadow-sm p-4 border h-[420px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
              <Flame className="w-4 h-4 text-orange-500" /> Calories Burned
            </div>
            <CaloriesChart className="flex-1" />
          </div>

          {/* Diet Tips */}
          <div className="bg-white rounded-xl shadow-sm p-4 border  h-[300px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
              <Apple className="w-4 h-4 text-green-500" /> Diet Tips
            </div>
            <DietTips className="flex-1" />
          </div>

          {/* Trainee Summary */}
          <div className="bg-white rounded-xl shadow-sm p-4 border h-[300px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
              <Award className="w-4 h-4 text-purple-500" /> Summary
            </div>
            <TraineeSummary className="flex-1" />
          </div>
        </div>

        {/* Compact Footer */}
        <div className="bg-gray-50 rounded-xl p-4 shadow-inner grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            Next workout: <span className="font-semibold">Tomorrow, 6 AM</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            Calories left today: <span className="font-semibold">350 kcal</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-green-500" />
            Current weight: <span className="font-semibold">75.2 kg</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-500" />
            Weekly goal: <span className="font-semibold">5/6 workouts done</span>
          </div>
        </div>
      </main>
    </Authenticated>
  );
};

export default Dashboard;
