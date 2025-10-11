import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DailyWorkoutProgram from "./Program/DailyProgram";
import WeeklyPrograms from "./Program/WeeklyProgram";
import { useProgramStore } from "@/stores/useProgramStore";

type ProgramDay = {
  title: string;
  description: string;
  exercises: string[];
};

type Program = {
  [day: number]: ProgramDay;
};

export default function Program({ data }: { data: string }) {
  const { setWeeklyPrograms } = useProgramStore();

  console.log('program datas:', data);

  const [show, setShow] = useState<string>('Weekly');

  const TABS = [{
    label: 'Weekly',
    value: 'Weekly',
  }, {
    label: 'Daily',
    value: 'Daily',
  }];

  const weeklyProgram = JSON.parse(data);
  
  console.log(weeklyProgram);

  useEffect(() => {
    setWeeklyPrograms(weeklyProgram);
  }, []);

  return (
    <div className="flex flex-col h-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Tabs
        value={'Weekly'}
        className="w-full md:w-max transition-colors duration-300"
      >
        <TabsHeader
          className="bg-white dark:bg-gray-900 dark:text-gray-100 -xl dark:border-none border border-gray-200 dark:border-gray-700 transition-colors duration-300 mb-3"
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

      {show == 'Daily'
        ? <DailyWorkoutProgram weeklyProgram={weeklyProgram} />
        : <WeeklyPrograms />
      }
    </div>

  );
}