import Select from "@/Components/Form/Select";
import Input from "@/Components/input/InputField";
import Label from "@/Components/Label";
import Button from "@/Components/ui/button/Button";
import { Modal } from "@/Components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { useTraineeStore } from "@/stores/useTraineeStore";
import { useForm } from "@inertiajs/react";
import moment from "moment";
import { toast } from "sonner";
import { Button as Buttons } from "@material-tailwind/react";

export default function TraineeInfoCard() {
  // Global states
  const { traineeData } = useTraineeStore();

  // Constants
  const UPDATE_USER_URL = import.meta.env.VITE_UPDATE_USER as string;

  // Form data
  const { data, setData, put, processing, errors } = useForm({
    user_id: traineeData?.user_id ?? 0,
    first_name: traineeData?.first_name ?? "",
    last_name: traineeData?.last_name ?? "",
    user_name: traineeData?.user_name ?? "",
    email: traineeData?.email ?? "",
    role: traineeData?.role ?? "",
    is_active: traineeData?.is_active ?? "",
    is_promo: traineeData?.is_promo ?? "",
    email_verified_at: traineeData?.email_verified_at ?? "",
    created_at: traineeData?.created_at ?? "",
  });


  // Local states
  const options = [
    { value: 1, label: "No" },
    { value: 2, label: "Yes" },
  ];

  const activeAccountOptions = [
    { value: 1, label: "No" },
    { value: 2, label: "Yes" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleActiveSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const { isOpen, openModal, closeModal } = useModal();

  // Update account info
  const handleUpdateAccountInformation = (e: React.FormEvent) => {
    e.preventDefault();

    put(`${UPDATE_USER_URL}/${data?.user_id}`, {
      onSuccess: () => {
        toast.success("Trainee account updated successfully!");
        closeModal();
      },
      onError: (errors) => {
        Object.values(errors).forEach((message) => toast.error(message as string));
      },
    });
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            {traineeData?.first_name}'s Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.first_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.last_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email Address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                User Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.user_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Active
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.is_active == 1 ? 'Yes' : 'No'}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Promo
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.is_promo == 0 ? 'No' : 'Yes'}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email Verified
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.email_verified_at != null
                  ? moment(data?.email_verified_at).format('MMMM D, YYYY hA')
                  : 'Not verified'}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Member Since
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {moment(data?.created_at).format('MMMM D, YYYY hA')}
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

      {/** Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit {traineeData?.first_name}'s Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleUpdateAccountInformation} >
            <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-3">
              <div className="mb-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input type="text" value={data?.first_name} onChange={(e: any) => setData('first_name', e.target.value)} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input type="text" value={data?.last_name} onChange={(e: any) => setData('last_name', e.target.value)} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input type="email" value={data?.email} onChange={(e: any) => setData('email', e.target.value)} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>User Name</Label>
                    <Input type="text" value={data?.user_name} onChange={(e: any) => setData('user_name', e.target.value)} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Promo Account</Label>
                    <Select
                      options={options}
                      defaultValue={data?.is_promo == 1 ? 'Yes' : 'No'}
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900"
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Active Account</Label>
                    <Select
                      options={activeAccountOptions}
                      defaultValue={data?.is_active == 1 ? 'Yes' : 'No'}
                      onChange={handleActiveSelectChange}
                      className="dark:bg-dark-900"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 lg:justify-end">
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
      {/** Model End */}
    </div >
  );
}
