import PhoneInput from "@/Components/group-input/PhoneInput";
import Input from "@/Components/input/InputField";
import Label from "@/Components/Label";
import Button from "@/Components/ui/button/Button";
import { Modal } from "@/Components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { useTraineeStore } from "@/stores/useTraineeStore";
import { getStrictnessLevel } from "@/utils/functions/helperFunctions";
import { useForm } from "@inertiajs/react";
import { Button as Buttons } from "@material-tailwind/react";
import { toast } from "sonner";

export default function TraineeAddressCard() {
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
  const UPDATE_BIOMETRIC_URL = import.meta.env.VITE_UPDATE_BIOMETRICS;

  // Form data
  const { data, setData, put, processing, errors } = useForm({
    user_id: traineeData?.user_id ?? 0,
    city: traineeData?.city ?? "",
    state: traineeData?.state ?? "",
    age: traineeData?.age ?? "",
    phone_number: traineeData?.phone_number ?? "",
    sex: traineeData?.sex ?? "",
    strictness_level: traineeData?.strictness_level ?? 1,
    current_weight: traineeData?.current_weight ?? "",
    goal_weight: traineeData?.goal_weight ?? "",
    fitness_level: traineeData?.fitness_level ?? "",
    food_allergies: traineeData?.food_allergies ?? "",
    equipment_access: traineeData?.equipment_access ?? "",
  });


  // Update Biometrics
  const handleUpdateBiometrics = (e: React.FormEvent) => {
    e.preventDefault();

    put(`${UPDATE_BIOMETRIC_URL}/${traineeData?.user_id}`, {
      onSuccess: () => {
        toast.success("User biometrics updated successfully!");
        closeModal();
      },
      onError: (errors) =>
        Object.values(errors).forEach((message) =>
          toast.error(message as string)
        ),
    });
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Trainee {traineeData?.first_name}'s  Location and Biometrics
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-7 2xl:gap-x-32">
              <div className="w-full">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  City
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.city}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  State
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.state}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Age
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.age}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone Number
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.phone_number}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Sex

                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.sex}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Fitness Level
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.fitness_level}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Current Weight
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.current_weight} lbs
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Goal Weight
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.goal_weight} lbs
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Equipment Access
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.equipment_access}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Food Allergies
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.food_allergies} lbs
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Strictness Level
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {getStrictnessLevel(data?.strictness_level)}
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
              Edit Trainee {traineeData?.first_name}'s Location and Biometrics
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update member details to keep member profile up-to-date.
            </p>
          </div>
          <form onSubmit={handleUpdateBiometrics} className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>City</Label>
                  <Input type="text" value={data?.city} onChange={(e: any) => setData('city', e.target.value)} />
                </div>

                <div>
                  <Label>City/State</Label>
                  <Input type="text" value={data?.state} onChange={(e: any) => setData('state', e.target.value)} />
                </div>

                <div>
                  <Label>Age</Label>
                  <Input type="number" value={data?.age} onChange={(e: any) => setData('age', e.target.value)} />
                </div>

                <div>
                  <Label>Phone</Label>
                  <PhoneInput
                    selectPosition="start"
                    value={data?.phone_number}
                    countries={countries}
                    placeholder="+1 (555) 000-0000"
                    onChange={(e: any) => setData('phone_number', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Sex</Label>
                  <select value={data?.sex} onChange={(e: any) => setData('sex', e.target.value)} className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                    <option value="">Select your sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <Label>Fitness Level</Label>
                  <select value={data?.fitness_level} onChange={(e: any) => setData('fitness_level', e.target.value)} className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                    <option value="">Select your fitness level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  {/*<Select
                    options={fitnessLevelOptions}
                    defaultValue={data?.fitness_level}
                    onChange={(e: any) => setData('fitness_level', e.target.value)}
                    className="dark:bg-dark-900"
                  /> */}
                </div>

                <div>
                  <Label>Current Weight (lbs)</Label>
                  <Input type="text" value={data?.current_weight} onChange={(e: any) => setData('current_weight', e.target.value)} />
                </div>

                <div>
                  <Label>Goal Weight (lbs)</Label>
                  <Input type="text" value={data?.goal_weight} onChange={(e: any) => setData('goal_weight', e.target.value)} />
                </div>

                <div>
                  <Label>Equipment Access</Label>
                  <Input type="text" value={data?.equipment_access} onChange={(e: any) => setData('equipment_access', e.target.value)} />
                </div>

                <div>
                  <Label>Food Allergies</Label>
                  <Input type="text" value={data?.food_allergies} onChange={(e: any) => setData('food_allergies', e.target.value)} />
                </div>

                <div>
                  <Label>Strictness Level</Label>
                  <select value={data?.strictness_level} onChange={(e: any) => setData('strictness_level', e.target.value)} className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                    <option value="">Select strictness level</option>
                    <option value="1">Chill: General meal guidelines (no tracking)</option>
                    <option value="2">Balanced: Macro targets with suggested portions</option>
                    <option value="3">Strict: Precise calorie/macro tracking with specific food weights</option>
                  </select>
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
