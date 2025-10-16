import InputWithIcon from "@/Components/InputWithIcon";
import { TraineeFormData } from "@/types/gpf";
import { Radio } from "@material-tailwind/react";
import { Lock, User, User2, UserCircle } from "lucide-react";
import { At } from "react-bootstrap-icons";

type PersonalInfoProps = {
    data: TraineeFormData,
    setData: CallableFunction,
    errors: any,
}
const PersonalInfo = ({ data, setData, errors }: PersonalInfoProps) => {
    const TRAINER = [{
        name: 'Johnny'
    }, {
        name: 'Remia'
    }, {
        name: 'John Remi'
    }]

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-6 py-5">
                <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                    Personal Information
                </h3>
            </div>

            <div className="p-4 border-t dark:border-gray-700 sm:p-6">
                <div className="space-y-6">
                    <form>
                        <div className="grid grid-cols-1 gap-6">

                            {/** FirstName */}
                            <InputWithIcon
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="Enter your first name"
                                value={data?.first_name}
                                onChange={(e: any) => setData('first_name', e.target.value)}
                                icon={<User2 size={18} />}
                            />

                            {/** LastName */}
                            <InputWithIcon
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Enter your last name"
                                value={data.last_name}
                                onChange={(e: any) => setData('last_name', e.target.value)}
                                icon={<User size={18} />}
                            />

                            {/** Email */}
                            <InputWithIcon
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                value={data.email}
                                onChange={(e: any) => setData('email', e.target.value)}
                                icon={<At size={18} />}
                            />


                            {/** Username */}
                            <InputWithIcon
                                id="user_name"
                                name="user_name"
                                type="text"
                                placeholder="Enter your user name"
                                value={data.user_name}
                                onChange={(e: any) => setData('user_name', e.target.value)}
                                icon={<UserCircle size={18} />
                                }
                            />

                            {/** Password */}
                            <InputWithIcon
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={data.password}
                                onChange={(e: any) => setData('password', e.target.value)}
                                icon={<Lock size={18} />}
                            />

                            {/**Trainer */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Trainer</label>
                                <select
                                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs 
                       placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-500 dark:text-gray-600
                       border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 
                       dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 
                       dark:border-gray-700 dark:focus:border-brand-800 pl-11"
                                    name="trainer_id"
                                    value={data.trainer_id}
                                    onChange={(e: any) => setData('trainer_id', e.target.value)}
                                >
                                    <option value="">Please select Trainer</option>
                                    {TRAINER?.map((trainer, i) => (
                                        <option value={trainer.name} key={i}>{trainer.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/**Account is promo */}
                            <div className="flex gap-10">
                                <Radio
                                    name="type"
                                    value={0}
                                    onClick={(e) => setData('is_promo', 0)}
                                    className="dark:text-gray-300"
                                    label="Normal Account"
                                    defaultChecked crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                />
                                <Radio
                                    name="type"
                                    value={1}
                                    onClick={(e) => setData('is_promo', 1)}
                                    className="dark:text-gray-300"
                                    label="Promo Account" crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                />
                            </div>
                        </div>

                    </form>
                </div>
            </div >
        </div >
    )
}

export default PersonalInfo