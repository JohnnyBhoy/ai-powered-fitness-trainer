import Messenger from "@/Components/Messenger";
import { GpfTraineeProps } from "@/types/gpf";
import {
  Card
} from "@material-tailwind/react";
import { EnvelopeSlash } from "react-bootstrap-icons";

const Messages = ({ data }: { data: GpfTraineeProps | null }) => {
  if(data == null) {
    return 'No data';
  }

  return (
    <Card className="p-6 mt-3 bg-white dark:bg-white/[0.03] border dark:border-none" shadow={false}>
      {!data?.conversations == null ? (
        <div className="flex justify-center">
          <h4 className="text-center flex place-items-center gap-2">
            <EnvelopeSlash /> No conversations found.
          </h4>
        </div>

      ) : (
        <Messenger
          name={`${data.first_name} ${data.last_name}`}
          conversations={data?.conversations}
        />
      )}
    </Card>
  )
}

export default Messages