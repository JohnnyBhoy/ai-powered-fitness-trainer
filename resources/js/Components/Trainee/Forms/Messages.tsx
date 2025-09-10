import Messenger from "@/Components/Messenger";
import { GpfTraineeProps } from "@/types/gpf";
import {
  Card
} from "@material-tailwind/react";
import { EnvelopeSlash } from "react-bootstrap-icons";

const Messages = ({ data }: { data: GpfTraineeProps }) => {
const convo = "GPF: Welcome to GoPeakFit, I’m your dedicated workout and diet trainer. I’ll guide you through customized plans to help you achieve your fitness goals.| Johnny: Thank you for welcoming me! I’m really excited to start my journey to getting fit and feeling healthier.| GPF: That’s great to hear, Johnny! To begin, could you share your fitness goals with me — like losing weight, building muscle, or just staying active? | Johnny: Sure! My main goal is to lose fat while building some lean muscle. I also want to improve my stamina. | GPF: Perfect! With that in mind, I’ll design a 7-day workout plan and a nutrition guide tailored to your schedule and equipment access. | Johnny: That sounds awesome. I don’t have a gym membership right now, but I do have a set of dumbbells at home. | GPF: No problem! We’ll focus on effective home-based workouts using your dumbbells and bodyweight exercises. Plus, I’ll suggest meals that are easy to prepare and fit your lifestyle. | Johnny: Thank you, that’s exactly what I need. I tend to lose motivation quickly though. | GPF: Don’t worry, Johnny. I’ll help keep you consistent with short, achievable daily goals and motivational tips to keep you on track. Together, we’ll build habits that last.| Johnny: Awesome, let’s get started today! | GPF: Absolutely! Let’s crush your goals one step at a time — your journey to a stronger and healthier you starts now!";


  return (
    <Card color="white" className="p-6 mt-3" shadow={false}>
        {!data.conversations == null ? (
          <div className="flex justify-center">
            <h4 className="text-center flex place-items-center gap-2">
              <EnvelopeSlash /> No conversations found.
            </h4>
          </div>

        ) : (
          <Messenger
            name={`${data.first_name} ${data.last_name}`}
            conversations={convo}
          />
        )}
    </Card>
  )
}

export default Messages