import TrialPrograms from '@/Components/Admin/Programs/TrialProgram/TrialPrograms';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { useProgramStore } from '@/stores/useProgramStore';
import { WeeklyProgram } from '@/types/weekly-program';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';


const Index = ({ programs }: { programs: WeeklyProgram[] }) => {
    const { setWeeklyPrograms } = useProgramStore();

    // Set trial program data on component mount
    useEffect(() => {
        setWeeklyPrograms(programs);
    }, []);

    return (
        <Authenticated>
            <Head title="5-Day Trial Program" />

            <div className="max-w-7xl mx-auto">
                <TrialPrograms />
            </div>
        </Authenticated>
    )
}

export default Index