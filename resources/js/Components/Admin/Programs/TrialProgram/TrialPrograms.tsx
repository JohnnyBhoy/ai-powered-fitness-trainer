import FormTitle from "@/Components/Form/FormTitle";
import WeeklyPrograms from "@/Components/Trainee/Forms/Program/WeeklyPrograms";
import Update from "./Update";
import { useTrialProgramStore } from "@/stores/useProgramStore";

const TrialPrograms = () => {

    // Show and hide trial program 
    const {setEditTrialByDay} = useTrialProgramStore();

    return (
        <div className="bg-white dark:bg-white/[0.03] shadow rounded-lg">
            <FormTitle title="5-Day Trial Program" action={() => setEditTrialByDay(false)} />
            <WeeklyPrograms />
            <Update />
        </div>
    )
}

export default TrialPrograms