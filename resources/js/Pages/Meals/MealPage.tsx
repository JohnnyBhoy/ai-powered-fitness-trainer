import React from 'react';
import { Head } from '@inertiajs/react';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';

type Props = {
    meals: Record<string, string>;
    messages: { sender: string; text: string }[];
};

export default function MealPage({ meals, messages }: Props) {
    return (
        <Authenticated>
            {/* Main Scrollable Area */}
            <main className="p-6 space-y-6 overflow-y-auto">
                <div className="min-h-screen bg-gray-100 p-6">
                    <Head title="Your Meals" />

                    <div className="max-w-6xl mx-auto space-y-6">
                        <h1 className="text-3xl font-bold text-center">🍽️ Your Meal Plan</h1>

                        {/* Meal Plan */}
                        <div className="grid grid-cols-2 gap-10">
                            <div className="bg-white shadow rounded p-6">
                                <h2 className="text-xl font-bold mb-4">🥗 Meals</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {Object.entries(meals).map(([mealTime, meal]) => (
                                        <li key={mealTime}>
                                            <strong>{mealTime}:</strong> {meal}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Messages */}
                            <div className="bg-white shadow rounded p-6">
                                <h2 className="text-xl font-bold mb-4">📲 Coach Messages</h2>
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
