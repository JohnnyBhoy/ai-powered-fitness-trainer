import { Card, CardContent } from '@/Components/UI_2/Card';
import { motion } from 'framer-motion';
import { Activity, HeartPulse, Ruler, Scale } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Progress = {
    id: number;
    weight_lbs: number;
    body_fat_percent?: number;
    muscle_mass_lbs?: number;
    recorded_at: string;
    notes?: string;
};

type Biometric = {
    city: string;
    state: string;
    phone_number: string;
    age: number;
    sex: string;
    current_weight: number;
    goal_weight: number;
    fitness_level: string;
    equipment_access: string;
    food_allergies?: string;
    strictness_level: string;
};

type TraineesProps = {
    trainees: {
        id: number;
        first_name: string;
        last_name: string;
        full_name: string;
        user_name: string;
        email: string;
        is_active: boolean;
        biometric?: Biometric;
        progress: Progress[];
    }[]
};

const Trainees = ({ trainees }: TraineesProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {trainees.map((trainee) => {
                const chartData = trainee.progress
                    .map((p) => ({
                        date: p.recorded_at,
                        weight: p.weight_lbs,
                        bodyFat: p.body_fat_percent,
                    }))
                    .reverse();

                return (
                    <motion.div
                        key={trainee.id}
                        className="bg-white shadow rounded-2xl p-6 border border-gray-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{trainee.first_name} {trainee.last_name}</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    {trainee.email} • {trainee.biometric?.phone_number ?? '-'}
                                </p>
                            </div>
                        </div>

                        {/* Biometric Stats */}
                        {trainee.biometric && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                                <Card className="bg-blue-50">
                                    <CardContent className="flex items-center space-x-3">
                                        <Ruler className="text-blue-600" />
                                        <div>
                                            <p className="text-xs text-gray-600">Current Weight</p>
                                            <p className="text-lg font-semibold">{trainee.biometric.current_weight} lbs</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-green-50">
                                    <CardContent className="flex items-center space-x-3">
                                        <Activity className="text-green-600" />
                                        <div>
                                            <p className="text-xs text-gray-600">Age</p>
                                            <p className="text-lg font-semibold">{trainee.biometric.age ?? '-'}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-purple-50">
                                    <CardContent className="flex items-center space-x-3">
                                        <Scale className="text-purple-600" />
                                        <div>
                                            <p className="text-xs text-gray-600">Goal Weight</p>
                                            <p className="text-lg font-semibold">{trainee.biometric.goal_weight} lbs</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-red-50">
                                    <CardContent className="flex items-center space-x-3">
                                        <HeartPulse className="text-red-600" />
                                        <div>
                                            <p className="text-xs text-gray-600">Fitness Level</p>
                                            <p className="text-lg font-semibold">{trainee.biometric.fitness_level}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Progress Chart */}
                        {chartData.length > 0 ? (
                            <div className="h-64 mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis yAxisId="left" label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }} />
                                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Body Fat (%)', angle: -90, position: 'insideRight' }} />
                                        <Tooltip />
                                        <Legend />
                                        <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} dot />
                                        <Line yAxisId="right" type="monotone" dataKey="bodyFat" stroke="#ef4444" strokeWidth={2} dot />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm mb-6">No progress recorded yet.</p>
                        )}

                        {/* Progress Table */}
                        {trainee.progress.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 text-left">Date</th>
                                            <th className="p-2 text-left">Weight (lbs)</th>
                                            <th className="p-2 text-left">Body Fat (%)</th>
                                            <th className="p-2 text-left">Muscle (lbs)</th>
                                            <th className="p-2 text-left">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trainee.progress.map((p) => (
                                            <tr key={p.id} className="border-b hover:bg-gray-50">
                                                <td className="p-2">{p.recorded_at}</td>
                                                <td className="p-2">{p.weight_lbs}</td>
                                                <td className="p-2">{p.body_fat_percent ?? '-'}</td>
                                                <td className="p-2">{p.muscle_mass_lbs ?? '-'}</td>
                                                <td className="p-2">{p.notes ?? '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    )
}

export default Trainees