import MtTextArea from '@/Components/MtTextArea';
import MtTextInput from '@/Components/MtTextInput';
import { useProgramStore, useTrialProgramStore } from '@/stores/useProgramStore';
import { useForm } from '@inertiajs/react';
import { Button } from '@material-tailwind/react';
import { Loader } from 'lucide-react';

function Update() {
    // Global states
    const { editTrialByDay, setEditTrialByDay } = useTrialProgramStore();
    const { dailyProgram } = useProgramStore();

    // Form Data
    const { data, setData, put, processing, errors } = useForm({
        id: dailyProgram?.id ?? 1,
        day: dailyProgram?.day ?? 1,
        program_name: dailyProgram?.program_name ?? "",
        focus: dailyProgram?.focus ?? "",
        warm_up: dailyProgram?.warm_up ?? "",
        workout: dailyProgram?.workout ?? "",
        cool_down: dailyProgram?.cool_down ?? "",
        alignment: dailyProgram?.alignment ?? "",
    });

    return (
        <div className={`${editTrialByDay ? '' : 'hidden'} p-6`}>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
                <MtTextInput
                    name="day"
                    data={dailyProgram.day}
                    type="text"
                    onChange={(e: any) => setData("day", e.target.value)} error={undefined} />
                <MtTextInput
                    name="focus"
                    data={dailyProgram.focus}
                    type="text"
                    onChange={(e: any) => setData("focus", e.target.value)} error={undefined} />
            </div>
            <MtTextInput
                name="warm_up"
                data={dailyProgram.warm_up}
                type="text"
                onChange={(e: any) => setData("warm_up", e.target.value)} error={undefined} />
            <MtTextArea
                name="workout"
                data={dailyProgram.workout}
                row={3}
                onChange={(e: any) => setData("workout", e.target.value)}
            />
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 my-4">
                <MtTextInput
                    name="cool_down"
                    data={dailyProgram.cool_down}
                    type="text"
                    onChange={(e: any) => setData("cool_down", e.target.value)} error={undefined} />
                <MtTextInput
                    name="alignment"
                    data={dailyProgram.alignment}
                    type="text"
                    onChange={(e: any) => setData("alignment", e.target.value)} error={undefined} />
            </div>

            <div className="flex justify-end">
                <div className="lg:grid grid-cols-2 gap-6">
                    <Button
                        type="button"
                        onClick={() => setEditTrialByDay(false)}
                        className="w-full mt-4 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-900 hover:bg-gray-300 dark:text-white text-black"
                    >
                        Close
                    </Button>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full mt-4 bg-gray-700 dark:bg-gray-700 border dark:hover:bg-gray-900 hover:bg-gray-800 text-white flex place-items-center gap-2 justify-center"
                    >
                        {processing ? <><Loader className='animate-spin' /> Saving...</> : "Update"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Update