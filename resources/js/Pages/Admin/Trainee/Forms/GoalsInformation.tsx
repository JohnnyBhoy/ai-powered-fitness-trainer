import MtTextInput from "@/Components/MtTextInput"
import { Loader, Save } from "lucide-react"
import { FormEventHandler } from "react"

type GoalsInformationProps = {
    data: any,
    setData: CallableFunction,
    errors: any,
    processing: boolean,
    isNowSaving: number,
    setIsNowSaving: CallableFunction,
    onSubmit: FormEventHandler<HTMLFormElement>,
}

export default function GoalsInformation({ data, setData, errors, processing, isNowSaving, setIsNowSaving, onSubmit }: GoalsInformationProps) {
    return (
        <form onSubmit={onSubmit} className="border dark:border-gray-700 border-gray-200 dark:bg-white/[0.03] bg-white rounded p-6 pb-5 h-auto space-y-3">
            <h3 className="dark:text-white/90 font-bold text-lg">Goals</h3>
            <MtTextInput
                name="What's your primary health and fitness goal?"
                data={data.goal}
                type="text"
                onChange={(e: any) => setData("goal", e.target.value)}
                error={errors.goal}
            />
            <MtTextInput
                name="Why do you want this?"
                data={data.why}
                type="text"
                onChange={(e: any) => setData("why", e.target.value)}
                error={errors.why}
            />
            <MtTextInput
                name="What stopped you from reaching your goals in the past?"
                data={data.past_obstacles}
                type="text"
                onChange={(e: any) => setData("past_obstacles", e.target.value)}
                error={errors.past_obstacles}
            />
            <MtTextInput
                name="What's the biggest struggle you face when trying to stay on track?"
                data={data.current_struggles}
                type="text"
                onChange={(e: any) => setData("current_struggles", e.target.value)}
                error={errors.current_struggles}
            />
        </form>
    )
}
