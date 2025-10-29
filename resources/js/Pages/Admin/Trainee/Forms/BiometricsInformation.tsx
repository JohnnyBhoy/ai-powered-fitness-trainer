import MtTextInput from "@/Components/MtTextInput";
import { useTraineeStore } from "@/stores/useTraineeStore";
import { getStrictnessLevel } from "@/utils/functions/helperFunctions";
import { Input, Typography } from "@material-tailwind/react";
import { Loader, Save, X } from "lucide-react";
import { FormEventHandler } from "react";

type BiometricsInformationProps = {
    data: any,
    setData: CallableFunction,
    errors: any,
    processing: boolean,
    onSubmit: FormEventHandler<HTMLFormElement>,
    isNowSaving: number,
    setIsNowSaving: CallableFunction,
}

export default function BiometricsInformation({ data, setData, errors, processing, onSubmit, isNowSaving, setIsNowSaving }: BiometricsInformationProps) {
    // Global state
    const { setUpdateTrainee } = useTraineeStore();

    return (
        <div className="shadow w-[100%] ">
            <form onSubmit={onSubmit} className="border dark:border-gray-700 border-gray-300 bg-white dark:bg-white/[0.03] rounded p-6 pb-5 h-auto">
                <div className="flex justify-between">
                    <h3 className="dark:text-white/90 font-bold text-lg"> Location And  Biomertrics</h3>

                    <div className="flex gap-3">
                        <button onClick={() => setUpdateTrainee(false)}>
                            <X className="dark:text-white/90" />
                        </button>
                        <button onClick={() => setIsNowSaving(2)}>
                            {processing && isNowSaving == 2
                                ? <Loader className='dark:text-white/90 animate-spin' />
                                : <Save className='hover:cursor-pointer dark:text-white/90' type='submit' />
                            }
                        </button>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-3">
                    <MtTextInput
                        name="City"
                        data={data.city}
                        type="text"
                        onChange={(e: any) => setData("city", e.target.value)}
                        error={errors.city}
                    />

                    <MtTextInput
                        name="State"
                        data={data.state}
                        type="text"
                        onChange={(e: any) => setData("state", e.target.value)}
                        error={errors.state}
                    />

                    {/* Strictness, Age, Sex, Weight */}
                    <MtTextInput
                        name="Age"
                        data={data.age}
                        type="number"
                        onChange={(e: any) => setData("age", e.target.value)}
                        error={errors.age}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-2">

                    <div className="flex flex-col">
                        <Typography variant="h6" className="mb-1 dark:text-white/90 text-sm">
                            Phone Number
                        </Typography>
                        <Input
                            type="tel"
                            inputMode="numeric"
                            size="lg"
                            maxLength={12}
                            value={data.phone_number}
                            onChange={(e: any) => setData("phone_number", e.target.value)}
                            className="w-auto h-11 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 !resize-none !w-full !border-[1.5px] bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:border-t-gray-800 !border-t-gray-700"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            containerProps={{
                                className: "min-w-0",
                            }}
                        />
                    </div>

                    <MtTextInput
                        name="Sex"
                        data={data.sex}
                        type="text"
                        onChange={(e: any) => setData("sex", e.target.value)}
                        error={errors.sex}
                    />
                    <div className="w-full">
                        <div className="flex flex-col">
                            <label className="text-black text-sm mb-1 dark:text-gray-400">
                                Strictness Level
                            </label>
                            <select
                                className="peer w-full h-11 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 !resize-none !w-full !border-[1.5px] bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:border-t-gray-800 !border-t-gray-700"
                                name="strictness_level"
                                value={data.strictness_level}
                                onChange={(e: any) => setData("strictness_level", parseInt(e.target.value))}
                            >
                                <option value={data.strictness_level}>
                                    {getStrictnessLevel(data.strictness_level)}
                                </option>
                                <option value="1">{getStrictnessLevel(1)}</option>
                                <option value="2">{getStrictnessLevel(2)}</option>
                                <option value="3">{getStrictnessLevel(3)}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-2">
                    <MtTextInput
                        name="Current Weight (lbs)"
                        data={data.current_weight}
                        type="number"
                        onChange={(e: any) => setData("current_weight", e.target.value)}
                        error={errors.current_weight}
                    />

                    {/* Fitness Details */}
                    <MtTextInput
                        name="Goal Weight (lbs)"
                        data={data.goal_weight}
                        type="number"
                        onChange={(e: any) => setData("goal_weight", e.target.value)}
                        error={errors.goal_weight}
                    />

                    <MtTextInput
                        name="Fitness Level"
                        data={data.fitness_level}
                        type="text"
                        onChange={(e: any) => setData("fitness_level", e.target.value)}
                        error={errors.fitness_level}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-2">
                    <MtTextInput
                        name="Food Allergies"
                        data={data.food_allergies}
                        type="text"
                        onChange={(e: any) => setData("food_allergies", e.target.value)}
                        error={errors.food_allergies}
                    />
                    <MtTextInput
                        name="Equipment Access"
                        data={data.equipment_access}
                        type="text"
                        onChange={(e: any) => setData("equipment_access", e.target.value)}
                        error={errors.equipment_access}
                    />
                       <MtTextInput
                        name="User Id"
                        data={data.user_id}
                        type="number"
                        onChange={() => {}}
                        error=""
                    />
                </div>
            </form >
        </div >
    )
}
