import MtTextArea from "@/Components/MtTextArea";
import MtTextInput from "@/Components/MtTextInput";
import { GpfTraineeProps } from "@/types/gpf";
import { getStrictnessLevel } from "@/utils/functions/helperFunctions";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Switch,
    Typography
} from "@material-tailwind/react";
import { handler } from "@material-tailwind/react/types/components/dialog";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

type UpdateProps = {
    open: boolean,
    handleOpen: handler,
    traineeData: GpfTraineeProps,
    setReload: CallableFunction,
    reload: boolean,
}

const COUNTRIES = ["France (+33)", "Germany (+49)", "Spain (+34)", "USA (+1)"];
const CODES = ["+1", "+33", "+49", "+34"];

const Update = ({ open, handleOpen, traineeData, setReload, reload }: UpdateProps) => {
    //Local state
    const [country, setCountry] = useState(0);
    const [formData, setFormData] = useState<any>({
        user_id: traineeData?.id,
        strictness_level: traineeData.strictness_level,
    });

    //Fetch new set of data based on filter
    const updateTraineeData = async () => {
        const UPDATE_GPF_TRAINEES = import.meta.env.VITE_UPDATE_GPF_TRAINEES;

        try {
            const response = await axios.get(UPDATE_GPF_TRAINEES, {
                params: {
                    user_id: formData.user_id,
                    strictness_level: formData.strictness_level,
                }
            });

            if (response?.data?.status === 200) {
                toast.success('Trainee data updated successfully.');
                setReload(!reload);
            } else {
                toast.success('Trainee data failed to update.');
            }
        } catch (error: any) {
            toast.error(error.message);
        }

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        updateTraineeData();
    }

    return (
        <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
            <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                    Manage {traineeData?.trainer_id == null ? "GoPeakFit Trainee" : "Non-GoPeakFit Trainee"}
                </Typography>
                <Typography className="mt-1 font-normal text-gray-600">
                    Keep your records up-to-date and organized.
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    className="!absolute right-3.5 top-3.5"
                    onClick={handleOpen}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <DialogBody className="space-y-5">

                    <div className="flex gap-4">
                        <MtTextInput name="Name" data={`${traineeData?.first_name} ${traineeData?.last_name}`} type="text" />
                        <MtTextInput name="Email" data={traineeData.email} type="text" />
                        <MtTextInput name="Username" data={traineeData.user_name} type="text" />
                        <MtTextInput name="Age" data={traineeData.age} type="number" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <MtTextInput name="Address" data={`${traineeData?.city}, ${traineeData?.state}`} type="text" />
                        <div className="flex gap-4">
                            <div className="w-full">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium"
                                >
                                    Phone Number
                                </Typography>
                                <div className="flex">
                                    <Menu placement="bottom-start">
                                        <MenuHandler>
                                            <Button
                                                ripple={false}
                                                variant="text"
                                                color="blue-gray"
                                                className="h-11 rounded-r-none border border-r-0 border-blue-gray-200 bg-transparent px-3"
                                            >
                                                {CODES[country]}
                                            </Button>
                                        </MenuHandler>
                                        <MenuList className="max-h-[20rem]">
                                            {COUNTRIES.map((country, index) => {
                                                return (
                                                    <MenuItem
                                                        key={country}
                                                        value={country}
                                                        onClick={() => setCountry(index)}
                                                    >
                                                        {country}
                                                    </MenuItem>
                                                );
                                            })}
                                        </MenuList>
                                    </Menu>
                                    <Input
                                        type="tel"
                                        inputMode="numeric"
                                        size="lg"
                                        maxLength={12}
                                        value={traineeData?.phone_number}
                                        onChange={() => { }}
                                        placeholder="324-456-2323"
                                        className="rounded-l-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        containerProps={{
                                            className: "min-w-0",
                                        }}
                                    />
                                </div>
                            </div>
                            <MtTextInput name="Sex" data={traineeData.sex} type="text" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        <MtTextInput name="Current Weight(lbs)" data={traineeData.current_weight} type="number" />
                        <MtTextInput name="Goal Weight(lbs)" data={traineeData.goal_weight} type="number" />
                        <MtTextInput name="Fitness Level" data={traineeData.fitness_level} type="text" />
                        <div className="w-full grid place-items-center">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-3 text-left font-medium"
                            >
                                Is Active
                            </Typography>
                            <Switch color="blue" defaultChecked={traineeData?.is_active == 1} />
                        </div>

                        <div className="w-full">
                            {traineeData.trainer_id != null ? (
                                <div className="flex flex-col">
                                    <label className="text-black text-sm">Strictness Level</label>
                                    <select className="rounded-lg py-2.5" name="strictness_level" id="strictness_level"
                                        onChange={(e) => setFormData({ ...formData, strictness_level: parseInt(e.target.value), user_id: traineeData?.user_id })}
                                    >
                                        <option value={traineeData.strictness_level}>{getStrictnessLevel(traineeData.strictness_level)}</option>
                                        <option value="1">{getStrictnessLevel(1)}</option>
                                        <option value="2">{getStrictnessLevel(2)}</option>
                                        <option value="3">{getStrictnessLevel(3)}</option>
                                    </select>
                                </div>
                            ) : (
                                <div className="grid place-items-center">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-3 text-left font-medium"
                                    >
                                        Is Promo
                                    </Typography>
                                    <Switch color="blue" defaultChecked={traineeData?.is_promo == 1} />
                                </div>

                            )}

                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {traineeData.trainer_id == null ? (
                            <div className="flex flex-col">
                                <label className="text-black text-sm">Strictness Level</label>
                                <select className="rounded-lg py-2.5" name="strictness_level" id="strictness_level"
                                    onChange={(e) => setFormData({ ...formData, strictness_level: parseInt(e.target.value), user_id: traineeData?.user_id })}
                                >
                                    <option value={traineeData.strictness_level}>{getStrictnessLevel(traineeData.strictness_level)}</option>
                                    <option value="1">{getStrictnessLevel(1)}</option>
                                    <option value="2">{getStrictnessLevel(2)}</option>
                                    <option value="3">{getStrictnessLevel(3)}</option>
                                </select>
                            </div>) : (
                            <MtTextInput name="Trainer's Name" data={traineeData.trainer_id == null ? 'GoPeakFit' : 'No'} type="text" />
                        )}
                        <MtTextInput name="Food Allergies" data={traineeData?.food_allergies} type="text" />
                        <MtTextInput name="Equipment Access" data={traineeData?.equipment_access} type="text" />
                        <MtTextInput name="Why do you want this?" data={traineeData?.why} type="text" />
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <MtTextArea name="Goal" data={traineeData.goal} row={2} />
                        <MtTextArea name="Past Obstacles" data={traineeData.past_obstacles} row={2} />
                        <MtTextArea name="Current Struggles" data={traineeData.current_struggles} row={2} />
                    </div>

                </DialogBody>
                <DialogFooter>
                    <Button className="ml-auto" onClick={handleOpen} type="submit">
                        Update Trainee
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    )
}

export default Update