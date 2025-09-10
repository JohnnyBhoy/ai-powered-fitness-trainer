import React from 'react';
import { Head } from '@inertiajs/react';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';

type Props = {
    workoutPlan: Record<string, string>;
    dietPlan: Record<string, string>;
    messages: { sender: string; text: string }[];
};

export default function WorkoutPage({ workoutPlan, dietPlan, messages }: Props) {
    return (
        <Authenticated>
            {/* Main Scrollable Area */}
            <main className="p-6 space-y-6 overflow-y-auto">
                <div className="min-h-screen bg-gray-100 p-6">
                    <Head title="Your Program" />

                    <div className="max-w-6xl mx-auto space-y-6">
                        <h1 className="text-3xl font-bold text-center mb-6">📅 Your Program</h1>

                        {/* Workout Plan */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="bg-white shadow rounded p-6">
                                <h2 className="text-xl font-bold mb-4">🏋️ Workout Plan</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {Object.entries(workoutPlan).map(([day, plan]) => (
                                        <li key={day}>
                                            <strong>{day}:</strong> {plan}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Diet Plan */}
                            <div className="bg-white shadow rounded p-6">
                                <h2 className="text-xl font-bold mb-4">🥗 Diet Plan</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {Object.entries(dietPlan).map(([meal, food]) => (
                                        <li key={meal}>
                                            <strong>{meal}:</strong> {food}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>


                        {/* SMS Messages */}
                        <div className="bg-white shadow rounded p-6">
                            <h2 className="text-xl font-bold mb-4">📲 SMS Messages</h2>
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
            </main>
        </Authenticated>
    );
}
