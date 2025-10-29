import GenerateWeeklyNutrition from "@/Components/Admin/NutritionPlan/GenerateWeeklyNutrition";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/Components/ui/table";
import { useTraineeStore } from "@/stores/useTraineeStore";
import { GpfTraineeProps } from "@/types/gpf";
import { WeeklyNutrition } from "@/types/weekly-nutrition";
import { jsonFormatter } from "@/utils/functions";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Check2Square } from "react-bootstrap-icons";

export default function Nutrition({ data }: { data: GpfTraineeProps | null }) {
  const programs = jsonFormatter(data?.nutrition_plan ?? "");

  // Global states
  const { showNutrition, setShowNutrition } = useTraineeStore();

  console.log(showNutrition);

  // Display Generate Program Action
  if (data?.nutrition_plan == undefined && showNutrition) {
    return (
      <GenerateWeeklyNutrition userId={data?.user_id ?? 0} />
    )
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
  if (data?.nutrition_plan == "" && showNutrition) {
    return <h1 className="text-center dark:text-gray-300 mt-[10rem]">No nutrition plan was created for this trainee...</h1>
  }

  const weeklyNutrition = JSON?.parse(data?.nutrition_plan?.endsWith(']') ? data?.nutrition_plan : "[]");

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex justify-between pb-2">
        <h3 className="text-lg dark:text-white/90">Weekly Nutrition Plan</h3>
        <button className="flex gap-1 dark:text-white/90" onClick={() => setShowNutrition(false)} >
          <ArrowLeft className="dark:text-white/90" /> back
        </button>
      </div>

      <WeeklyNutritions weeklyNutrition={weeklyNutrition} />
    </div>

  );
}

const WeeklyNutritions = ({ weeklyNutrition }: { weeklyNutrition: WeeklyNutrition[] }) => {
  const HEADERS = ["Day Number", "Meal Name", "Food Items ", "Macros", "Notes"];

  console.log(weeklyNutrition);

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
                    className={`text-center  font-semibold text-gray-300 text-theme-sm uppercase tracking-wide bg-black dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-[${index == HEADERS?.length - 1 ? '40' : '15'}%] py-2.5`}
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
                      {nutrition?.food_items?.map((item, idx) => (
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