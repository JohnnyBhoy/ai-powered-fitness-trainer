import { PersonBadge } from "react-bootstrap-icons";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  GroupIcon
} from "../../../icons";
import Badge from "../../ui/badge/Badge";
import { useDashboardStore } from "@/stores/dashboardStore";
import { ArrowLeft } from "lucide-react";

export default function TrainersMetrics() {
  const { data } = useDashboardStore();
  const gpfGrowthPercentage = Math.round(data?.gopeakfitTraineesPercentageComparedLastMonth ?? 0);
  const trainerGrowthPercentage = Math.round(data?.trainersPercentageComparedLastMonth ?? 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Trainees
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {data?.totalTrainees ?? 0}
            </h4>
          </div>
          <Badge color="success">
            {gpfGrowthPercentage == 0 ? <ArrowLeft size={16} />
              : gpfGrowthPercentage > 0 ? <ArrowUpIcon />
                : <ArrowDownIcon />}
                {gpfGrowthPercentage}%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <PersonBadge className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Trainers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {data?.totalTrainers ?? 0}
            </h4>
          </div>

          <Badge color="error">
            {trainerGrowthPercentage == 0 ? <ArrowLeft size={16} />
              : trainerGrowthPercentage > 0 ? <ArrowUpIcon />
                : <ArrowDownIcon />}
            {trainerGrowthPercentage}%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
