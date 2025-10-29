import FormTitle from "@/Components/Form/FormTitle";
import WeeklyPrograms from "@/Components/Trainee/Forms/Program/WeeklyProgram";
import { useProgramStore } from "@/stores/useProgramStore";
import Update from "./Update";

const TrialPrograms = () => {
    const { weeklyPrograms, setWeeklyPrograms } = useProgramStore();

    return (
        <div className="bg-white dark:bg-white/[0.03] shadow rounded-lg">
            <FormTitle title="5-Day Trial Program" action={() => { }} />
            <WeeklyPrograms />
            <Update />
        </div>
    )
}

export default TrialPrograms