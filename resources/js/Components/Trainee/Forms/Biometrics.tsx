import Loading from '@/Components/Loading';
import MtTextInput from '@/Components/MtTextInput';
import { GpfTraineeProps } from '@/types/gpf';
import { getStrictnessLevel } from '@/utils/functions/helperFunctions';
import {
  Button,
  Card,
  Input,
  Menu,
  MenuHandler,
  Typography
} from "@material-tailwind/react";
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';


const Biometrics = ({ data }: { data: GpfTraineeProps }) => {
  //Fetch new set of data based on filter
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    user_id: data?.id,
    strictness_level: data.strictness_level,
  });

  //Update trainee api
  const updateTraineeData = async () => {
    const UPDATE_GPF_TRAINEES = import.meta.env.VITE_UPDATE_GPF_TRAINEES;

    try {
      const response = await axios.get(UPDATE_GPF_TRAINEES, {
        params: {
          user_id: formData.user_id,
          strictness_level: formData.strictness_level,
        }
      });

      if (response.status === 200) {
        toast.success('Trainee data updated successfully.');
      } else {
        toast.success('Trainee data failed to update.');
      }

      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }

  }

  // Update change in strictness level
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    updateTraineeData();
  }

  return (
    <Card color="white" className="p-6 mt-3" shadow={false}>
      <form onSubmit={handleSubmit} className="mb-2 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MtTextInput name="City" data={data.city} type="text" />
          <MtTextInput name="State" data={data.state} type="text" />

          <div className="flex flex-col">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Phone Number
            </Typography>
            <div className="flex">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="h-11 rounded-r-none border border-r-0 border-blue-gray-200 bg-transparent px-3"
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
                value={data?.phone_number}
                onChange={() => { }}
                placeholder="324-456-2323"
                className="rounded-l-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MtTextInput name="Age" data={data.age} type="number" />
          <MtTextInput name="Sex" data={data.sex} type="text" />
          <div className="w-full">
            <div className="flex flex-col">
              <label className="text-black text-sm mb-5 font-semibold">Strictness Level</label>
              <select className="rounded-lg py-2.5" name="strictness_level" id="strictness_level"
                onChange={(e) => setFormData({ ...formData, strictness_level: parseInt(e.target.value), user_id: data?.user_id })}
              >
                <option value={data.strictness_level}>{getStrictnessLevel(data.strictness_level)}</option>
                <option value="1">{getStrictnessLevel(1)}</option>
                <option value="2">{getStrictnessLevel(2)}</option>
                <option value="3">{getStrictnessLevel(3)}</option>
              </select>
            </div>

          </div>
          <MtTextInput name="Current Weight(lbs)" data={data.current_weight} type="number" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MtTextInput name="Goal Weight(lbs)" data={data.goal_weight} type="number" />
          <MtTextInput name="Fitness Level" data={data.fitness_level} type="text" />
          <MtTextInput name="Food Allergies" data={data?.food_allergies} type="text" />
          <MtTextInput name="Equipment Access" data={data?.equipment_access} type="text" />
        </div>

        <div className="flex justify-end place-items-end">
          <Button className="mt-6 lg:w-auto" type="submit" fullWidth>
            {!loading
              ? 'Update'
              : <Loading text="Saving Changes" />}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Biometrics