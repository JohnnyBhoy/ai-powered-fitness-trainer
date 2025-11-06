import TextArea from "@/Components/input/TextArea";
import Label from "@/Components/Label";
import Button from "@/Components/ui/button/Button";
import { Modal } from "@/Components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { useTraineeStore } from "@/stores/useTraineeStore";
import { useForm } from "@inertiajs/react";
import { Button as Buttons } from "@material-tailwind/react";
import { toast } from "sonner";

export default function TraineeGoalCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];

  // Global states
  const { traineeData } = useTraineeStore();

  // Constants
  const UPDATE_GOALS_URL = import.meta.env.VITE_UPDATE_GOALS as string;

  // Form data
  const { data, setData, put, processing, errors } = useForm({
    user_id: traineeData?.user_id ?? 0,
    goal: traineeData?.goal ?? "",
    why: traineeData?.why ?? "",
    past_obstacles: traineeData?.past_obstacles ?? "",
    current_struggles: traineeData?.current_struggles ?? "",
  });


  // Update trainee goal handler
  const handleUpdateGoals = (e: React.FormEvent) => {
    e.preventDefault();

    put(`${UPDATE_GOALS_URL}/${traineeData?.user_id}`, {
      onSuccess: () => {
        toast.success("Trainee goals updated successfully!");
        closeModal();
      },
      onError: (errors) => {
        Object.values(errors).forEach((message) => toast.error(message as string));
      },
    });
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Trainee {traineeData?.first_name}'s Goal?
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div className="w-full">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Trainee's primary health and fitness goal?
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.goal}
                </p>
              </div>

              <div className="w-full">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Reason for training?
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.why}
                </p>
              </div>

              <div className="w-full">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  What stopped him from reaching his goals in the past?
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.past_obstacles}
                </p>
              </div>

              <div className="w-full">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Biggest struggle trainee face when trying to stay on track?
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.current_struggles}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Trainee {traineeData?.first_name}'s Goal
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update member details to keep member profile up-to-date.
            </p>
          </div>
          <form onSubmit={handleUpdateGoals} className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                <div>
                  <Label> Trainee's primary health and fitness goal</Label>
                  <TextArea
                    value={data?.goal}
                    onChange={(value) => setData('goal', value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Reason for training</Label>
                  <TextArea
                    value={data?.why}
                    onChange={(value) => setData('why', value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>What stopped him from reaching his goals in the past?</Label>
                  <TextArea
                    value={data?.past_obstacles}
                    onChange={(value) => setData('past_obstacles', value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Biggest struggle trainee face when trying to stay on track?</Label>
                  <TextArea
                    value={data?.current_struggles}
                    onChange={(value) => setData('current_struggles', value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              {processing ? <Buttons variant="outline" className="dark:bg-gray-700 p-3.5" loading={true}>
                Loading
              </Buttons> : <Button size="sm" type="submit" variant="outline">
                Save Changes
              </Button>}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
