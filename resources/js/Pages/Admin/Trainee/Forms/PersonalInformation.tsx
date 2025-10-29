import MtTextInput from '@/Components/MtTextInput'
import { Switch, Typography } from '@material-tailwind/react'
import { Loader, Save } from 'lucide-react'
import moment from 'moment'
import { FormEventHandler } from 'react'

type PersonalInformationProps = {
    data: any,
    setData: CallableFunction,
    errors: any,
    processing: boolean,
    onSubmit: FormEventHandler<HTMLFormElement>,
    isNowSaving: number,
    setIsNowSaving: CallableFunction,
}

export default function PersonalInformation({ data, setData, errors, processing, onSubmit, isNowSaving, setIsNowSaving }: PersonalInformationProps) {

    return (
        <form
            onSubmit={onSubmit}
            className="border dark:border-gray-700 border-gray-200 dark:bg-white/[0.03] bg-white rounded p-6 shadow w-[30%] space-y-4">
            <div className="flex justify-between">
                <h3 className="dark:text-white/90 font-bold text-lg"> Personal Information</h3>
                <button onClick={() => setIsNowSaving(1)}>
                    {processing && isNowSaving == 1
                        ? <Loader className='dark:text-white/90 animate-spin' />
                        : <Save className='hover:cursor-pointer dark:text-white/90' type='submit' />
                    }
                </button>
            </div>

            <MtTextInput
                name="first_name"
                data={data.first_name}
                type="text"
                onChange={(e: any) => setData("first_name", e.target.value)}
                error={errors.first_name}
            />

            <MtTextInput
                name="last_name"
                data={data.last_name}
                type="text"
                onChange={(e: any) => setData("last_name", e.target.value)}
                error={errors.last_name}
            />

            <MtTextInput
                name="email"
                data={data.email}
                type="text"
                onChange={(e: any) => setData("email", e.target.value)}
                error={errors.email}
            />

            <MtTextInput
                name="user_name"
                data={data.user_name}
                type="text"
                onChange={(e: any) => setData("user_name", e.target.value)}
                error={errors.user_name}
            />

            <MtTextInput
                name="role"
                data={data?.role == 3 ? 'Trainee' : 'Trainer'}
                type="text"
                onChange={() => { }}
                error={errors.role}
            />

            <div className="grid grid-cols-2">
                <div className="w-full grid">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-3 text-left font-medium dark:text-white/90"
                    >
                        Is Active
                    </Typography>
                    <Switch
                        color="blue"
                        defaultChecked={data?.is_active == 1}
                    />
                </div>

                <div className="grid">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-3 text-left font-medium dark:text-white/90"
                    >
                        Is Promo
                    </Typography>
                    <Switch
                        color="blue"
                        defaultChecked={data?.is_promo == 1}
                    />
                </div>
            </div>

            <MtTextInput
                name="Trainer"
                data={data?.trainer_id == null ? 'GoPeakFit AI' : 'Trainer'}
                type="text"
                onChange={(e) => { }}
                error={errors.trainer_id}
            />

            <MtTextInput
                name="Email Verified At"
                data={data?.email_verified_at != null
                    ? moment(data?.email_verified_at).format('MMMM D, YYYY hA')
                    : 'Not veified'}
                type="text"
                onChange={() => { }}
                error={errors.email_verified_at}
            />

            <MtTextInput
                name="Date Created"
                data={moment(data?.created_at).format('MMMM D, YYYY hA')}
                type="text"
                onChange={() => { }}
                error={errors.created_at}
            />
        </form>
    )
}
