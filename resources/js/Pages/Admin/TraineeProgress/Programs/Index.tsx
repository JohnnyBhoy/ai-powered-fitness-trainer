import Header from '@/Components/Admin/NutritionPlan/Header';
import TraineesCountPerDay from '@/Components/Admin/TrialProgram/TraineesCountPerDay';
import TrialPrograms from '@/Components/Admin/TrialProgram/TrialPrograms';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

type ProgramDay = {
    id: number;
    day: number;
    focus: string;
    warm_up: string;
    workout: string[];
    cool_down: string;
    alignment: string;
};

type PageProps = {
    freeTrialTraineesCountByDays: Record<string, number>;
    programs: ProgramDay[];
};



const Index = ({ programs, freeTrialTraineesCountByDays }: PageProps) => {
    
    return (
        <Authenticated>
            <Head title="5-Day Trial Program" />

            <div className="max-w-7xl mx-auto py-8 px-8">
                {/* Title */}
                <Header title="5-Day Trial Program Dashboard" />
                <TraineesCountPerDay freeTrialTraineesCountByDays={freeTrialTraineesCountByDays} />
                <TrialPrograms programs={programs} />
            </div>
        </Authenticated>
    )
}

export default Index