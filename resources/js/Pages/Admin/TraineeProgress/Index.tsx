import Header from '@/Components/Admin/NutritionPlan/Header';
import Trainees from '@/Components/Admin/ProgressTracking/Trainees';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Custom lightweight Card component
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-2xl shadow-sm border border-gray-200 bg-white ${className}`}>
        {children}
    </div>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-4 ${className}`}>{children}</div>
);

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

type Trainee = {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    user_name: string;
    email: string;
    is_active: boolean;
    biometric?: Biometric;
    progress: Progress[];
};

type Props = {
    trainees: Trainee[];
};

export default function Index({ trainees }: Props) {
    return (
        <Authenticated>
            <Head title="Trainee Progress Tracking" />
            <div className="max-w-7xl mx-auto py-10 px-4">
                <Header title="Trainee Progress Overview" />
                <Trainees trainees={trainees} />
            </div>
        </Authenticated>
    );
}
