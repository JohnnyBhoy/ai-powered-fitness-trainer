import MtTextInput from '@/Components/MtTextInput';
import { GpfTraineeProps } from '@/types/gpf';
import {
  Card,
  Switch,
  Typography
} from "@material-tailwind/react";
import moment from 'moment';

const AccountInfo = ({ data }: { data: GpfTraineeProps }) => {
  console.log(data);

  return (
    <Card color="white" className="p-6 mt-3" shadow={false}>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MtTextInput name="Name" data={`${data.first_name} ${data.last_name}`} type="text" />
          <MtTextInput name="Email" data={data.email} type="text" />
          <MtTextInput name="Username" data={data.user_name} type="text" />
          <MtTextInput name="User Type" data={data.role == 3 ? 'Trainee' : 'Trainer'} type="text" />

          <div className="w-full grid">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-3 text-left font-medium"
            >
              Is Active
            </Typography>
            <Switch color="blue" defaultChecked={data?.is_active == 1} />
          </div>

          <div className="grid">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-3 text-left font-medium"
            >
              Is Promo
            </Typography>
            <Switch color="blue" defaultChecked={data?.is_promo == 1} />
          </div>

          <MtTextInput name="Trainer" data={data.trainer_id == null ? 'GoPeakFit AI' : 'Trainer'} type="text" />
          <MtTextInput name="Email Verified At" data={data?.email_verified_at != null ? moment(data.email_verified_at).format('MMMM D, YYYY hA') : 'Not veified'} type="text" />
          <MtTextInput name="Date Created" data={moment(data.created_at).format('MMMM D, YYYY hA')} type="text" />
        </div>

    </Card>
  )
}

export default AccountInfo