import CloseUpdateFormButton from '@/Components/Admin/Trainees/GoPeakFit/CloseUpdateFormButton';
import MtTextInput from '@/Components/MtTextInput';
import UpdateButton from '@/Components/UpdateButton';
import { useGpfStore } from '@/stores/useGpfStore';
import { GpfTraineeProps } from '@/types/gpf';
import { useForm } from '@inertiajs/react';
import {
  Card,
  Switch,
  Typography
} from "@material-tailwind/react";
import moment from 'moment';
import { toast } from 'sonner';

const AccountInfo = ({ userData }: { userData: GpfTraineeProps | null }) => {
  if (userData == null) return;

  // Global states
  const { setRefetchData, refetchData } = useGpfStore();

  const UPDATE_USER_URL = import.meta.env.VITE_UPDATE_USER as string;

  const { data, setData, put, processing, errors } = useForm({
    first_name: userData?.first_name || "",
    last_name: userData?.last_name || "",
    user_name: userData?.user_name || "",
  });

  // Update trainee account handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(`${UPDATE_USER_URL}/${userData.user_id}`, {
      onSuccess: () => {
        toast.success("Trainee account updated successfully!");
        setRefetchData(!refetchData);
      },
      onError: (errors) => {
        // Option 1: Loop all validation messages
        Object.values(errors).forEach((message) => toast.error(message as string));
      },
    });
  };

  return (
    <Card
      className="p-6 mt-3 bg-white dark:bg-white/[0.03] border dark:border-gray-700"
      shadow={false}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MtTextInput
            name="first_name"
            data={data.first_name}
            type="text"
            onChange={(e: any) => setData("first_name", e.target.value)}
            error={errors?.first_name}
          />

          <MtTextInput
            name="last_name"
            data={data.last_name}
            type="text"
            onChange={(e: any) => setData("last_name", e.target.value)}
            error={errors?.last_name}
          />


          <MtTextInput
            name="email"
            data={userData.email}
            type="text"
            onChange={() => { }}
            error=""
          />

          <MtTextInput
            name="user_name"
            data={data.user_name}
            type="text"
            onChange={(e: any) => setData("user_name", e.target.value)}
            error=""
          />

          <MtTextInput
            name="role"
            data={userData?.role == 3 ? 'Trainee' : 'Trainer'}
            type="text"
            onChange={() => { }}
            error=""
          />

          <div className="grid grid-cols-2">
            <div className="w-full grid">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-3 text-left font-medium dark:text-gray-400"
              >
                Is Active
              </Typography>
              <Switch
                color="blue"
                defaultChecked={userData?.is_active == 1}
              />
            </div>

            <div className="grid">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-3 text-left font-medium dark:text-gray-400"
              >
                Is Promo
              </Typography>
              <Switch
                color="blue"
                defaultChecked={userData?.is_promo == 1}
              />
            </div>
          </div>


          <MtTextInput
            name="Trainer"
            data={userData?.trainer_id == null ? 'GoPeakFit AI' : 'Trainer'}
            type="text"
            onChange={(e) => { }}
            error=""
          />

          <MtTextInput
            name="Email Verified At"
            data={userData?.email_verified_at != null
              ? moment(userData?.email_verified_at).format('MMMM D, YYYY hA')
              : 'Not veified'}
            type="text"
            onChange={() => { }}
            error=""
          />

          <MtTextInput
            name="Date Created"
            data={moment(userData?.created_at).format('MMMM D, YYYY hA')}
            type="text"
            onChange={() => { }}
            error=""
          />
        </div>

        <div className="flex justify-end pt-8">
          <div className="flex gap-3">
            <CloseUpdateFormButton />
            <UpdateButton processing={processing} />
          </div>

        </div>
      </form>

    </Card>
  )
}

export default AccountInfo