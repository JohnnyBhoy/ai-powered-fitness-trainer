import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/Components/ui/table";
import { WeeklyNutrition } from "@/types/weekly-nutrition";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check2Square } from "react-bootstrap-icons";

export default function Nutrition({ data }: { data: string | undefined }) {
 if (data == undefined) {
    return <div>
      <h3 className="dark:text-gray-400 text-center p-3 text-lg">No plan created for this trainee.</h3>
    </div>
  }


  //Local states
  const [show, setShow] = useState<string>('Weekly');

  //Weekly and daily toggle options to be display
  const TABS = [{
    label: 'Weekly',
    value: 'Weekly',
  }, {
    label: 'Daily',
    value: 'Daily',
  }];

  //Convert json to object
  if (data == "") {
    return <h1 className="text-center dark:text-gray-300 mt-[10rem]">No nutrition plan was created for this trainee...</h1>
  }

  const weeklyNutrition = JSON?.parse(data);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
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

      <WeeklyNutritions weeklyNutrition={weeklyNutrition} />
    </div>

  );
}

const WeeklyNutritions = ({ weeklyNutrition }: { weeklyNutrition: WeeklyNutrition[] }) => {
  const HEADERS = ["Day Number", "Meal Name", "Food Items ", "Macros", "Notes"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="overflow-hidden dark:border-gray-800 bg-white dark:border-white/[0.05] dark:bg-gray-900"
    >
      <div className="max-w-full overflow-x-auto">
        {/* Scrollable vertical container */}
        <div className="max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
          {weeklyNutrition == undefined ? (
            <h1 className="text-center dark:text-gray-300 mt-[5rem]">No nutrition plan was created for this trainee...</h1>
          ) : (<Table>
            {/* Table Header */}
            <TableHeader className="border dark:border-gray-800 dark:border-white/[0.05] sticky top-0 z-10 bg-torq dark:bg-gray-900">
              <TableRow>
                {HEADERS.map((header, index) => (
                  <TableCell
                    key={index}
                    className="text-center  font-semibold text-gray-200 text-theme-sm uppercase tracking-wide bg-torq dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-[20%] py-2.5"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {weeklyNutrition?.map((nutrition, i) => (
                <TableRow key={i}>
                  {/* Day Number */}
                  <TableCell className="px-1  text-gray-500 text-start dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col text-center place-items-center">
                      <h3 className="font-bold text-2xl">Day {nutrition.day_number}</h3>
                      <h4 className="font-semibold">{nutrition.meal_type}</h4>
                    </div>
                  </TableCell>

                  {/* Meal Name */}
                  <TableCell className="px-1  text-gray-500 text-start dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {nutrition.meal_name}
                  </TableCell>

                  {/* Food Items */}
                  <TableCell className="px-1  text-gray-500 text-start dark:text-gray-300 border border-gray-200 dark:border-gray-700 w-[30%]">
                    <ul className="space-y-1">
                      {nutrition.food_items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check2Square className="text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TableCell>

                  {/* Macros */}
                  <TableCell className="px-1 text-gray-500 text-start dark:text-gray-300 border border-gray-200 dark:border-gray-700 w-[20%]">
                    <div>🍎 {nutrition.calories} kcal</div>
                    <div>🥩 {nutrition.protein}g Protein</div>
                    <div>🍞 {nutrition.carbs}g Carbs</div>
                    <div>🥑 {nutrition.fats}g Fats</div>
                  </TableCell>

                  {/* Notes */}
                  <TableCell className="px-1  text-gray-500 text-start italic dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {nutrition.notes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>)}
        </div>
      </div>
    </motion.div>

  )
}