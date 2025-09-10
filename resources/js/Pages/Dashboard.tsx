import BodyStatsChart from "@/Components/Trainee/Charts/BodyStatsChart";
import CaloriesChart from "@/Components/Trainee/Charts/CaloriesChart";
import DietProgressChart from "@/Components/Trainee/Charts/DietProgressChart";
import WorkoutProgressChart from "@/Components/Trainee/Charts/WorkoutProgressChart";
import DietTips from "@/Components/Trainee/Dashboard/DietTips";
import TraineeSummary from "@/Components/Trainee/Dashboard/TraineeSummary";
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const Dashboard = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext("2d");
        if (!ctx) return;

        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                    {
                        label: "Workout Duration (min)",
                        data: [30, 45, 40, 50, 60, 55, 35],
                        backgroundColor: "rgba(59, 130, 246, 0.2)",
                        borderColor: "rgba(59, 130, 246, 1)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            myChart.destroy();
        };
    }, []);


    return (
        <Authenticated>
            {/* Main Scrollable Area */}
            <main className="p-6 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Workout Progress Chart */}
                    <WorkoutProgressChart />
                    {/* Diet Progress Chart */}
                    <DietProgressChart />
                    {/* Body Stats Chart */}
                    <BodyStatsChart />
                    {/* Calories Burned vs Consumed Chart */}
                    <CaloriesChart />
                    {/* Diet Tips */}
                    <DietTips />
                    {/* Trainer Summary */}
                    <TraineeSummary />
                </div>
            </main>
        </Authenticated>
    );
};

export default Dashboard;
