import CloseUpdateFormButton from '@/Components/Admin/Trainees/GoPeakFit/CloseUpdateFormButton';
import MtTextArea from '@/Components/MtTextArea';
import UpdateButton from '@/Components/UpdateButton';
import { useGpfStore } from '@/stores/useGpfStore';
import { GpfTraineeProps } from '@/types/gpf';
import { useForm } from '@inertiajs/react';
import {
  Card
} from "@material-tailwind/react";
import { toast } from 'sonner';

const Goals = ({ userData }: {
  userData: GpfTraineeProps | null
}) => {
  if (userData == null) {
    return 'No Data';
  }
  // Constants
  const UPDATE_GOALS_URL = import.meta.env.VITE_UPDATE_GOALS as string;

  // Global states
  const { refetchData, setRefetchData } = useGpfStore();

  // Form data params
  const { data, setData, put, processing } = useForm({
    goal: userData?.goal || "",
    why: userData?.why || "",
    past_obstacles: userData?.past_obstacles || "",
    current_struggles: userData?.current_struggles || "",
  });


  // Update trainee goal handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(`${UPDATE_GOALS_URL}/${userData.user_id}`, {
      onSuccess: () => {
        toast.success("Trainee goals updated successfully!");
        setRefetchData(!refetchData);
      },
      onError: (errors) => {
        // Option 1: Loop all validation messages
        Object.values(errors).forEach((message) => toast.error(message as string));
      },
    });
  };


  return (
    <Card className="p-6 mt-3 bg-white dark:bg-white/[0.03] border dark:border-none" shadow={false}>
      <form className="mb-2 space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MtTextArea
            name="What's your primary health and fitness goal?"
            data={data.goal}
            row={5}
            onChange={(e: any) => setData("goal", e.target.value)}
          />

          <MtTextArea
            name="Why do you want this?"
            data={data.why}
            row={5}
            onChange={(e: any) => setData("why", e.target.value)}
          />

          <MtTextArea
            name="What stopped you from reaching your goals in the past?"
            data={data.past_obstacles}
            row={5}
            onChange={(e: any) => setData("past_obstacles", e.target.value)}
          />

          <MtTextArea
            name="What's the biggest struggle you face when trying to stay on track?"
            data={data.current_struggles}
            row={5}
            onChange={(e: any) => setData("current_struggles", e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <div className="flex gap-3">
            <CloseUpdateFormButton />
            <UpdateButton processing={processing} />
          </div>
        </div>
      </form>
    </Card>
  )
}

export default Goals