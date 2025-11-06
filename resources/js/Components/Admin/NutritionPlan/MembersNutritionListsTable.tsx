import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/Components/ui/table";
import { useNutritionStore } from "@/stores/useNutritionStore";
import { Plan } from "@/types/weekly-nutrition";
import { Edit, Trash } from "lucide-react";
import moment from "moment";


const MembersNutritionListsTable = ({ plans }: { plans: Plan[] }) => {
  // Global states
  const { setShowUpdatePlan, showUpdatePlan, setActivePlan } = useNutritionStore();

  const formatNutritionPlan = (plan: string) => {
    if (plan == null) {
      return 'No plan generated';
    }

    return plan?.split(',')[1]?.split(":")[1]?.replaceAll('"', "");
  };

  // Show update plan form and set active plan data to selected plan
  const handleUpdatePlan = (plan: Plan) => {
    setShowUpdatePlan(true);
    setActivePlan(plan);
  }

  return (
    plans?.length == 0 ? (
      <h1>No generated nutrition plan found.</h1>
    ) : (
      <div className={`${showUpdatePlan ? "hidden" : ""} overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] space-y-6`}>
        <Table>
          {/* Table Header */}
          < TableHeader className="border-b border-gray-100 dark:border-white/[0.05]" >
            <TableRow>
              {['Full Name', 'Week Number', 'Plan Name', 'Start Date', 'Action'].map((head: string, i: number) => (
                <TableCell
                  key={i}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader >

          {/* Table Body */}
          < TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]" >
            {plans?.map((plan: Plan, i: number) => (
              <TableRow key={i}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full bg-torq">
                      <h1 className="text-center mt-1 text-2xl font-bold">{plan?.first_name?.charAt(0)?.toUpperCase()}</h1>
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {plan?.first_name} {plan?.last_name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {plan?.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {plan?.week_number || 1}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {formatNutritionPlan(plan?.nutrition_plan)}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {plan?.created_at == null ? 'Not started' : moment(plan?.created_at).format('MMMM D, YYYY hA')}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-2 mt-3">
                  <Edit size={18} onClick={() => handleUpdatePlan(plan)} />
                  <Trash size={18} onClick={() => { }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody >
        </Table >
      </div>
    )
  );
}

export default MembersNutritionListsTable;