import GenerateWeeklyProgram from "@/Components/Admin/Programs/WeeklyProgram/GenerateWeeklyProgram";
import { useProgramStore } from "@/stores/useProgramStore";
import { GpfTraineeProps } from "@/types/gpf";
import { jsonFormatter } from "@/utils/functions";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DailyWorkoutProgram from "./Program/DailyProgram";
import WeeklyPrograms from "./Program/WeeklyPrograms";
import { useTraineeStore } from "@/stores/useTraineeStore";
import { ArrowLeft } from "lucide-react";

type ProgramDay = {
  title: string;
  description: string;
  exercises: string[];
};

type Program = {
  [day: number]: ProgramDay;
};

export default function Program({ data }: { data: GpfTraineeProps | null }) {
  //Global states from store
  const { setWeeklyPrograms } = useProgramStore();
  const { showProgram, setShowProgram, showNutrition, showPrompt } = useTraineeStore();

  const programs = jsonFormatter(data?.program_data ?? "");

  console.log('programs: ', programs == "");
  console.log('programs: ', showProgram);

  // Display Generate Program Action
  if (data?.program_data == undefined || programs == "") {
    return (
      <GenerateWeeklyProgram userId={data?.user_id ?? 0} />
    )
  }

  //Local states
  const [show, setShow] = useState<string>('Weekly');

  //Options tabs to be display weekly or daily program
  const TABS = [{
    label: 'Weekly',
    value: 'Weekly',
  }, {
    label: 'Daily',
    value: 'Daily',
  }];

  //Convert json weekly program to object
  if (data?.program_data == "" && showProgram) {
    return <h1 className="text-center dark:text-gray-300 mt-[10rem]">No program was created for this trainee...</h1>
  }

  const weeklyProgram = JSON?.parse(programs);

  //Store weekly program
  useEffect(() => {
    setWeeklyPrograms(weeklyProgram);
  }, []);

  console.log('show program :', showProgram);

  return (
    <div className={`${showProgram && !showNutrition && !showPrompt ? '' : 'hidden'} flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <div className="flex justify-between">
        <Tabs
          value={'Weekly'}
          className="w-full md:w-max transition-colors duration-300"
        >
          <TabsHeader
            className="dark:data-[state=active]:bg-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100 -xl dark:border-none border border-gray-200 dark:border-gray-700 transition-colors duration-300 mb-3"
          >
            {TABS.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setShow(value)}
                className={`
              px-4 py-2 text-sm font-medium -lg transition-all duration-200
              hover:bg-blue-50 dark:hover:bg-gray-800 
              data-[state=active]:bg-blue-500 data-[state=active]:text-white 
              dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white dark:bg-white/[0.03] dark:text-gray-300
            `}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>

        <button className="dark:text-white/90 mt-4 flex" onClick={() => setShowProgram(false)} >
          <ArrowLeft /> Back
        </button>
      </div>


      {weeklyProgram == null ? (
        <h1 className="text-center dark:text-gray-300 mt-[10rem]">No program was created for this trainee...</h1>
      ) : show == 'Daily'
        ? <DailyWorkoutProgram weeklyProgram={weeklyProgram} />
        : <WeeklyPrograms />
      }
    </div>

  );
}