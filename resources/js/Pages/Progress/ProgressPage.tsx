import React from 'react';
import { Head } from '@inertiajs/react';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';

type Props = {
    progress: {
        workoutsCompleted: number;
        mealsLogged: number;
        startingWeight: number;
        currentWeight: number;
        goalWeight: number;
    };
    messages: { sender: string; text: string }[];
};

export default function ProgressPage({ progress, messages }: Props) {
    const weightLost = progress.startingWeight - progress.currentWeight;
    const weightToGo = progress.currentWeight - progress.goalWeight;

    return (
        <Authenticated>
            {/* Main Scrollable Area */}
            <main className="p-6 space-y-6 overflow-y-auto">
                <div className="min-h-screen bg-gray-100 p-6">
                    <Head title="Progress Tracker" />

                    <div className="max-w-6xl mx-auto space-y-6">
                        <h1 className="text-3xl font-bold text-center">📈 Your Progress</h1>

                        {/* Progress Summary */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="bg-white shadow rounded p-6">
                                <h2 className="text-xl font-bold mb-4">Workout & Diet Summary</h2>
                                <ul className="space-y-2">
                                    <li>✅ Workouts Completed: <strong>{progress.workoutsCompleted}</strong></li>
                                    <li>🍱 Meals Logged: <strong>{progress.mealsLogged}</strong></li>
                                    <li>⚖️ Starting Weight: {progress.startingWeight} kg</li>
                                    <li>📉 Current Weight: {progress.currentWeight} kg</li>
                                    <li>🎯 Goal Weight: {progress.goalWeight} kg</li>
                                    <li className="text-green-600 font-semibold">🏆 Total Weight Lost: {weightLost.toFixed(1)} kg</li>
                                    <li className="text-blue-600 font-semibold">📍 To Goal: {weightToGo.toFixed(1)} kg</li>
                                </ul>
                            </div>

                            {/* Messages Section */}
                            <div className="bg-white shadow rounded p-6">
                                <h2 className="text-xl font-bold mb-4">📲 Progress Messages</h2>
                                <div className="space-y-3">
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-3 rounded-lg max-w-sm ${msg.sender === 'You'
                                                ? 'bg-blue-100 ml-auto text-right'
                                                : 'bg-gray-100 text-left'
                                                }`}
                                        >
                                            <p className="text-sm font-semibold">{msg.sender}</p>
                                            <p>{msg.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Authenticated>
    );
}
