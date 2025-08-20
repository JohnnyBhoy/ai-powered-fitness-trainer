import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { User } from "@/types";
import { getStrictnessLevel } from "@/utils/functions/helperFunctions";
import moment from "moment";
import { MouseEventHandler } from "react";
import { X } from "react-bootstrap-icons";

const TraineeInfo = ({ user, onClose }: { user: User, onClose: MouseEventHandler }) => {
    console.log(user);

    return (
        <div className="p-6">
            <div className="flex justify-between pb-6">
                <h3 className="font-semibold text-xl">
                    Trainee Id: <strong>{user?.id}</strong>
                    <small className="text-slate-500 font-normal text-sm"> ({user?.trainer_id == null ? 'GoPeakFit Trainee' : 'Trainee Added By Trainer'})</small>
                </h3>
                <X size={24} onClick={onClose} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="flex-col">
                    <InputLabel value="First Name" />
                    <TextInput value={user.first_name} className="w-full" />
                </div>

                <div className="flex-col">
                    <InputLabel value="Last Name" />
                    <TextInput value={user.last_name} className="w-full" />
                </div>

                <div className="flex-col">
                    <InputLabel value="User Name" />
                    <TextInput value={user.user_name} className="w-full" />
                </div>

                <div className="flex-col">
                    <InputLabel value="Email" />
                    <TextInput value={user.email} className="w-full" />
                </div>

                <div className="flex-col">
                    <InputLabel value="Strictness Level" />
                    <select className="w-full rounded border-slate-300"
                        value={user?.strictness_level}
                        onChange={() => { }}
                    >
                        <option value={user.strictness_level}>{getStrictnessLevel(user.strictness_level)}</option>
                        <option value="1">Light</option>
                        <option value="2">Structured</option>
                        <option value="3">Strict</option>
                        <option value="4">Extreme</option>
                    </select>
                </div>

                <div className="flex-col">
                    <InputLabel value="Trainer's Name" />
                    <TextInput value={`${user.trainer_first_name} ${user?.trainer_last_name}`} className="w-full" />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6 py-6">
                <div className="flex-col">
                    <InputLabel value="Food Allergies" />
                    <TextInput value={user.is_promo == 1 ? 'Yes' : 'No'} className="w-full" />
                </div>

                <div className="flex-col">
                    <InputLabel value="Equipment Access" />
                    <TextInput value={user.is_promo == 1 ? 'Yes' : 'No'} className="w-full" />
                </div>

                <div className="flex-col">
                    <InputLabel value="Age" />
                    <TextInput value={user.age} className="w-full" />
                </div>


                <div className="flex-col">
                    <InputLabel value="Is Promo" />
                    <TextInput value={user.is_promo == 1 ? 'Yes' : 'No'} className="w-full" />
                </div>
            </div>

            <div className="grid grid-cols-4  gap-6">
                <div className="flex-col">
                    <div className="flex-col">
                        <InputLabel value="Is Active" />
                        <TextInput value={user.is_active == 1 ? 'Yes' : 'No'} className="w-full" />
                    </div>
                </div>

                <div className="flex-col">
                    <div className="flex-col">
                        <InputLabel value="Gender/Sex" />
                        <TextInput value={user.sex} className="w-full" />
                    </div>
                </div>

                <div className="flex-col">
                    <div className="flex-col">
                        <InputLabel value="Current weight (lbs)" />
                        <TextInput value={user.current_weight} className="w-full" />
                    </div>
                </div>

                <div className="flex-col">
                    <div className="flex-col">
                        <InputLabel value="Goal Weight (lbs)" />
                        <TextInput value={user.goal_weight} className="w-full" />
                    </div>
                </div>
            </div>


            <div className="flex py-6 gap-6">

                <div className="flex-col w-1/3">
                    <InputLabel value="Date created" />
                    <TextInput value={moment(user.created_at).format('MMMM D, YYYY hA')} className="w-full" />
                </div>

                <div className="flex-col w-full">
                    <InputLabel value="City and State" />
                    <TextInput value={`${user?.city}, ${user?.state}`} className="w-full" />
                </div>
            </div>
        </div>
    )
}

export default TraineeInfo