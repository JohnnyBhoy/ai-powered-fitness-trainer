import WeeklyPrograms from "@/Components/Trainee/Forms/Program/WeeklyProgram";
import Authenticated from "@/Pages/Layouts/AuthenticatedLayout";
import { useProgramStore } from "@/stores/useProgramStore";
import { useEffect } from "react";

const ProgramData = ({ programData }: { programData: string }) => {
    console.log(programData);

    const { setWeeklyPrograms } = useProgramStore();
    const programs = JSON?.parse(programData);

    useEffect(() => {
        setWeeklyPrograms(programs);
    }, []);

    if (!programData) return 'No Program Data';

    //setWeeklyPrograms(programs);

    return (
        <Authenticated>
            <WeeklyPrograms />
        </Authenticated>
    );
}

export default ProgramData;