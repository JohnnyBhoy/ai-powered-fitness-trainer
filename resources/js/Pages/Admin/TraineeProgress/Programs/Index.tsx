import TrialPrograms from '@/Components/Admin/Programs/TrialProgram/TrialPrograms';
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { useTrialProgramStore } from '@/stores/useProgramStore';
import { WeeklyProgram } from '@/types/weekly-program';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';


const Index = ({ programs }: { programs: WeeklyProgram[] }) => {
    console.log(programs);

    const { setTrialPrograms } = useTrialProgramStore();

    // Set trial program data on component mount
    useEffect(() => {
        setTimeout(() => {
        setTrialPrograms(programs);
        }, 1000);
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