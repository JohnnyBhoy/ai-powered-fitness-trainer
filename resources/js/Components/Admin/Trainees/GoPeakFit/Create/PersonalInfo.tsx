import FormError from "@/Components/FormError";
import InputWithIcon from "@/Components/InputWithIcon";
import { TraineeFormData } from "@/types/gpf";
import { usePage } from "@inertiajs/react";
import { Switch, Typography } from "@material-tailwind/react";
import { Lock, User, User2, UserCircle } from "lucide-react";
import { At } from "react-bootstrap-icons";

type PersonalInfoProps = {
    data: TraineeFormData,
    setData: CallableFunction,
    errors: Partial<Record<keyof TraineeFormData, string>>,
}
const PersonalInfo = ({ data, setData, errors }: PersonalInfoProps) => {
    const trainerId = usePage().props.auth.user.trainer_id;
    const TRAINER = usePage().props.auth.user.trainer_first_name ?? [];

    console.log(data.is_promo);

    return (
        <div className="rounded border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="p-4 border-t dark:border-gray-700 sm:p-6">
                <div className="space-y-6">
                    <h3 className="dark:text-white/90 font-bold text-lg mb-3"> Personal Information</h3>
                    <form>
                        <div className="grid grid-cols-1 gap-6">

                            {/** FirstName */}
                            <InputWithIcon
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="Enter first name"
                                value={data?.first_name}
                                onChange={(e: any) => setData('first_name', e.target.value)}
                                icon={<User2 size={18} />}
                            />
                            <FormError error={errors.first_name} />

                            {/** LastName */}
                            <InputWithIcon
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Enter last name"
                                value={data.last_name}
                                onChange={(e: any) => setData('last_name', e.target.value)}
                                icon={<User size={18} />}
                            />
                            <FormError error={errors.last_name} />

                            {/** Email */}
                            <InputWithIcon
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter email address"
                                value={data.email}
                                onChange={(e: any) => setData('email', e.target.value)}
                                icon={<At size={18} />}
                            />
                            <FormError error={errors.email} />

                            {/** Username */}
                            <InputWithIcon
                                id="user_name"
                                name="user_name"
                                type="text"
                                placeholder="Enter user name"
                                value={data.user_name}
                                onChange={(e: any) => setData('user_name', e.target.value)}
                                icon={<UserCircle size={18} />
                                }
                            />
                            <FormError error={errors.user_name} />

                            {/** Password */}
                            <InputWithIcon
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                value={data.password}
                                onChange={(e: any) => setData('password', e.target.value)}
                                icon={<Lock size={18} />}
                            />
                            <FormError error={errors.password} />

                            {/**Trainer */}
                            <div className={`w-full ${trainerId == null ? 'hidden' : ''}`}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Trainer</label>
                                <select
                                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs 
                                             placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-500 dark:text-gray-600
                                             border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 
                                             dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 
                                             dark:border-gray-700 dark:focus:border-brand-800 pl-11"
                                    name="trainer_id"
                                    value="0"
                                    onChange={(e: any) => setData('trainer_id', e.target.value)}
                                >
                                    <option value={TRAINER}>{TRAINER}</option>
                                </select>
                            </div>
                            <FormError error="" />

                            {/**Account is promo */}
                            <div className="grid">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-3 text-left font-medium dark:text-gray-400"
                                >
                                    Is Promo Account?
                                </Typography>
                                <Switch
                                    color="blue"
                                    onChange={(e: any) => setData("is_promo", e.target.checked ? 1 : 0)}
                                    defaultChecked={data?.is_promo == 1}
                                />
                            </div>
                            <FormError error={errors.is_promo} />
                        </div>

                    </form>
                </div>
            </div >
        </div >
    )
}

export default PersonalInfo