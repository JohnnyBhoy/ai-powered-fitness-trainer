import MtTextInput from '@/Components/MtTextInput';
import UpdateButton from '@/Components/UpdateButton';
import { GpfTraineeProps } from '@/types/gpf';
import { getStrictnessLevel } from '@/utils/functions/helperFunctions';
import { useForm } from '@inertiajs/react';
import {
  Button,
  Card,
  Input,
  Menu,
  MenuHandler,
  Typography,
} from "@material-tailwind/react";
import { toast } from 'sonner';

const Biometrics = ({ userData }: { userData: GpfTraineeProps }) => {
  console.log(userData);

  const UPDATE_BIOMETRIC_URL = import.meta.env.VITE_UPDATE_BIOMETRICS;

  const { data, setData, put, processing } = useForm({
    city: userData?.city || "",
    state: userData?.state || "",
    phone_number: userData?.phone_number || "",
    age: userData?.age || "",
    sex: userData?.sex || "",
    strictness_level: userData?.strictness_level || 0,
    current_weight: userData?.current_weight || 0,
    goal_weight: userData?.goal_weight || 0,
    fitness_level: userData?.fitness_level || 0,
    food_allergies: userData?.food_allergies || "",
    equipment_access: userData?.equipment_access || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(`${UPDATE_BIOMETRIC_URL}/${userData.id}`, {
      onSuccess: () => toast.success("✅ User biometrics updated successfully!"),
      onError: (errors) =>
        Object.values(errors).forEach((message) =>
          toast.error(message as string)
        ),
    });
  };

  return (
    <Card className="p-6 mt-3 bg-white dark:bg-white/[0.03] border dark:border-gray-700" shadow={false}>
      <form onSubmit={handleSubmit} className="mb-2 space-y-8">

        {/* Location + Phone */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MtTextInput
            name="City"
            data={data.city}
            type="text"
            onChange={(e: any) => setData("city", e.target.value)}
          />
          <MtTextInput
            name="State"
            data={data.state}
            type="text"
            onChange={(e: any) => setData("state", e.target.value)}
          />

          <div className="flex flex-col">
            <Typography variant="h6" className="mb-3">
              Phone Number
            </Typography>
            <div className="flex">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="h-11 rounded-r-none border border-gray-400 dark:border-gray-500 bg-transparent px-3 dark:text-gray-500"
                  >
                    US(+1)
                  </Button>
                </MenuHandler>
              </Menu>
              <Input
                type="tel"
                inputMode="numeric"
                size="lg"
                maxLength={12}
                value={data.phone_number}
                onChange={(e: any) => setData("phone_number", e.target.value)}
                placeholder="324-456-2323"
                className="rounded-l-none placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 border-t-gray-400 dark:border-t-0 dark:focus:border-t-0 dark:text-gray-300 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none !border-t-gray-400 dark:border-t-gray-400"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
              />
            </div>
          </div>
        </div>

        {/* Strictness, Age, Sex, Weight */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MtTextInput
            name="Age"
            data={data.age}
            type="number"
            onChange={(e: any) => setData("age", e.target.value)}
          />
          <MtTextInput
            name="Sex"
            data={data.sex}
            type="text"
            onChange={(e: any) => setData("sex", e.target.value)}
          />
          <div className="w-full">
            <div className="flex flex-col">
              <label className="text-black text-sm mb-5 font-semibold dark:text-gray-400">
                Strictness Level
              </label>
              <select
                className="rounded-lg py-2.5 dark:bg-gray-900 dark:text-gray-200"
                name="strictness_level"
                value={data.strictness_level}
                onChange={(e: any) => setData("strictness_level", parseInt(e.target.value))}
              >
                <option value={data.strictness_level}>
                  {getStrictnessLevel(data.strictness_level)}
                </option>
                <option value="1">{getStrictnessLevel(1)}</option>
                <option value="2">{getStrictnessLevel(2)}</option>
                <option value="3">{getStrictnessLevel(3)}</option>
              </select>
            </div>
          </div>
          <MtTextInput
            name="Current Weight (lbs)"
            data={data.current_weight}
            type="number"
            onChange={(e: any) => setData("current_weight", e.target.value)}
          />
        </div>

        {/* Fitness Details */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MtTextInput
            name="Goal Weight (lbs)"
            data={data.goal_weight}
            type="number"
            onChange={(e: any) => setData("goal_weight", e.target.value)}
          />
          <MtTextInput
            name="Fitness Level"
            data={data.fitness_level}
            type="text"
            onChange={(e: any) => setData("fitness_level", e.target.value)}
          />
          <MtTextInput
            name="Food Allergies"
            data={data.food_allergies}
            type="text"
            onChange={(e: any) => setData("food_allergies", e.target.value)}
          />
          <MtTextInput
            name="Equipment Access"
            data={data.equipment_access}
            type="text"
            onChange={(e: any) => setData("equipment_access", e.target.value)}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <UpdateButton processing={processing} />
        </div>
      </form>
    </Card>
  );
};

export default Biometrics;
