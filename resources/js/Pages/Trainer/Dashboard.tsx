import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Users, Dumbbell, Activity, Flame, ClipboardList, CheckSquare, CheckCircle } from "lucide-react";
import { GpfTraineeProps } from '@/types/gpf';

type DashboardProps = {
    trainees: GpfTraineeProps,
    programs: [],
}

const TrainerDashboard = ({trainees, programs} : DashboardProps) => {
    const sessionsChartRef = useRef<HTMLCanvasElement | null>(null);
    const workoutTypeChartRef = useRef<HTMLCanvasElement | null>(null);

    // Weekly sessions chart
    useEffect(() => {
        const ctx = sessionsChartRef.current?.getContext('2d');
        if (!ctx) return;

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Sessions Conducted',
                        data: [2, 4, 3, 5, 4, 6, 3],
                        backgroundColor: 'rgba(16, 185, 129, 0.6)',
                        borderColor: 'rgba(5, 150, 105, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } },
            },
        });

        return () => myChart.destroy();
    }, []);

    // Simplified Workout type distribution chart
    useEffect(() => {
        const ctx = workoutTypeChartRef.current?.getContext('2d');
        if (!ctx) return;

        const pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Strength', 'Cardio', 'HIIT'],
                datasets: [
                    {
                        label: 'Workout Distribution',
                        data: [50, 30, 20], // simplified distribution
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.7)', // Blue - Strength
                            'rgba(16, 185, 129, 0.7)', // Green - Cardio
                            'rgba(239, 68, 68, 0.7)',  // Red - HIIT
                        ],
                        borderColor: 'white',
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14,
                                weight: 'bold',
                            },
                        },
                    },
                },
            },
        });

        return () => pieChart.destroy();
    }, []);

    return (
        <Authenticated>
            <main className="p-6 space-y-6 overflow-y-auto">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Active Trainees</p>
                            <h2 className="text-2xl font-bold">18</h2>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <Dumbbell className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Sessions This Week</p>
                            <h2 className="text-2xl font-bold">23</h2>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                            <Activity className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Avg Progress</p>
                            <h2 className="text-2xl font-bold">72%</h2>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <Flame className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Calories Burned (Weekly)</p>
                            <h2 className="text-2xl font-bold">48,500</h2>
                        </div>
                    </div>
                </div>


                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Weekly Sessions */}
                    <div className="bg-white p-4 rounded-2xl shadow">
                        <h2 className="text-lg font-semibold mb-2">Weekly Training Sessions</h2>
                        <div className="w-full h-96">
                            <canvas ref={sessionsChartRef}></canvas>
                        </div>
                    </div>
                    {/* Workout Type Pie Chart */}
                    <div className="bg-white p-4 rounded-2xl shadow">
                        <h2 className="text-lg font-semibold mb-2">Workout Type Distribution</h2>
                        <div className="w-full h-96 grid place-items-center">
                            <canvas ref={workoutTypeChartRef}></canvas>
                        </div>
                    </div>
                </div>

                {/* Trainee Leaderboard */}
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-gray-600" />
                        Trainee Progress Leaderboard
                    </h2>

                    <div className="space-y-3">
                        {[
                            { name: "John Doe", progress: 90 },
                            { name: "Maria Santos", progress: 85 },
                            { name: "James Lee", progress: 78 },
                        ].map((trainee, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                {/* Profile Circle */}
                                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full">
                                    {trainee.name.charAt(0)}
                                </div>

                                <div className="flex-1">
                                    <p className="font-medium">{trainee.name}</p>
                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${trainee.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <span className="font-bold text-gray-700">{trainee.progress}%</span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Attendance Report */}
                    <div className="bg-white p-4 rounded-2xl shadow">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Session Attendance
                        </h2>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                                    <th className="p-3">Trainee</th>
                                    <th className="p-3">Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "John Doe", attendance: 95 },
                                    { name: "Maria Santos", attendance: 88 },
                                    { name: "James Lee", attendance: 80 },
                                ].map((trainee, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-3">{trainee.name}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 text-sm rounded-full font-semibold ${trainee.attendance >= 90
                                                    ? "bg-green-100 text-green-700"
                                                    : trainee.attendance >= 80
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {trainee.attendance}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {/* Notes & Reminders */}
                    <div className="bg-white p-4 rounded-2xl shadow">
                        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <CheckSquare className="w-5 h-5 text-gray-600" />
                            Trainer Notes
                        </h2>

                        <ul className="mt-3 space-y-2">
                            {[
                                { note: "Prepare new HIIT program for advanced trainees.", color: "text-blue-600" },
                                { note: "Schedule feedback session with Maria.", color: "text-green-600" },
                                { note: "Plan a weekend group workout event.", color: "text-orange-600" },
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <CheckCircle className={`w-4 h-4 ${item.color}`} />
                                    <span>{item.note}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </main>
        </Authenticated>
    );
};

export default TrainerDashboard;
