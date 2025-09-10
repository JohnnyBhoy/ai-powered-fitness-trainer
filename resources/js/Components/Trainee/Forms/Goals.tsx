import MtTextArea from '@/Components/MtTextArea';
import { GpfTraineeProps } from '@/types/gpf';
import {
  Card
} from "@material-tailwind/react";

const Goals = ({ data }: { data: GpfTraineeProps }) => {
  console.log(data);

  return (
    <Card color="white"  className="p-6 mt-3" shadow={false}>
      <form className="mb-2 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MtTextArea name="What's your primary health and fitness goal?" data={data.goal} row={5} />

          <MtTextArea name="Why do you want this?" data={data.why} row={5}  />

          <MtTextArea name="What stopped you from reaching your goals in the past?" data={data.past_obstacles}  row={5} />

          <MtTextArea name="What's the biggest struggle you face when trying to stay on track?" data={data.current_struggles}  row={5} />
        </div>
      </form>
    </Card>
  )
}

export default Goals