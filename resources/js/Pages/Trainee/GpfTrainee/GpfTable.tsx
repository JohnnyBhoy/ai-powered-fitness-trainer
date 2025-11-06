import Badge from "@/Components/ui/badge/Badge";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/Components/ui/table";
import { useTraineeStore } from "@/stores/useTraineeStore";
import { jsonFormatter } from "@/utils/functions";
import { getStrictnessLevel } from "@/utils/functions/helperFunctions";
import { useForm } from "@inertiajs/react";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

export default function GpfTable() {
  // Global states
  const { traineeDataArray } = useTraineeStore();
  const {
    filter,
    setUpdateTrainee,
    setTraineeData,
    setShowProgram,
    setShowNutrition,
    setShowPrompt,
  } = useTraineeStore();

  // Open update trainee form
  const handleEditTrainee = (trainee: any) => {
    setUpdateTrainee(true);
    setTraineeData(trainee);
    setShowProgram(false);
    setShowNutrition(false);
    setShowPrompt(false);
  }

  // Format Weekly program
  const getProgramName = (programName: any) => {
    if (!programName || programName == undefined) return 'No program generated.';

    return JSON.parse(jsonFormatter(programName))[0]?.program_name;
  }


  // Table Filter
  const filterTrainee = (trainee: any) => {
    return trainee?.first_name?.toLowerCase()?.includes(filter?.toLowerCase())
      || trainee?.last_name?.toLowerCase()?.includes(filter?.toLowerCase())
      || trainee?.city?.toLowerCase()?.includes(filter?.toLowerCase())
      || trainee?.state?.toLowerCase()?.includes(filter?.toLowerCase());
  }


  // This will remove the trainee in records or deactivate trainee
  const { delete: destroy } = useForm();
  const handleRemoveTrainee = (id: number) => {
    if (!confirm('Are you sure you want to delete this trainee?')) return;

    try {
      destroy(route('users.destroy', id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Trainee has been removed from our member's list!");
        },
        onError: (errors) => {
          toast.error('Failed to delete member, Please try again.');
          console.error(errors);
        },
      });
    } catch (error) {
      toast.error('Something went wrong while deleting the member.');
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {traineeDataArray?.length == 0 ? (
          <h1 className="text-center p-6 text-4xl dark:text-white/90">No trainee/member found!</h1>
        ) : (
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {['Full Name', 'Base Weight', 'Current Weight', 'Goal Weight', 'Fitness Goal', 'Weekly Program', 'Strictness Level', 'Action'].map(head => (
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {traineeDataArray
                ?.filter(filterTrainee)
                ?.map((trainee) => (
                  <TableRow key={trainee.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full bg-torq">
                          <h1 className="text-center mt-1 text-2xl font-bold">{trainee?.first_name?.charAt(0)?.toUpperCase()}</h1>
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {trainee?.first_name} {trainee?.last_name}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {trainee?.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {trainee?.current_weight} lbs
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {trainee?.current_weight} lbs
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {trainee?.goal_weight} lbs
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {trainee?.goal}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {getProgramName(trainee?.program_data)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          trainee?.strictness_level === 1
                            ? "success"
                            : trainee?.strictness_level === 1
                              ? "warning"
                              : "error"
                        }
                      >
                        {getStrictnessLevel(trainee?.strictness_level)}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-2 mt-3">
                      <Edit size={18} onClick={() => handleEditTrainee(trainee)} />
                      <Trash size={18} onClick={() => handleRemoveTrainee(trainee?.user_id)} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
