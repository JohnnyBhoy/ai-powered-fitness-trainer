import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../../icons";
import { useDashboardStore } from "@/stores/dashboardStore";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";

export default function MonthlyUsers() {
  // Global states of dashboard data
  const { data } = useDashboardStore();

  // Round percentage data
  const userGrowthComparedToLastMonth = Math.round(data?.usersPercentageComparedLastMonth ?? 0);
  const gpfTraineesGrowthComparedToLastMonth = Math.round(data?.gopeakfitTraineesPercentageComparedLastMonth ?? 0);
  const noneGpfTraineesGrowthComparedToLastMonth = Math.round(data?.nonGopeakfitTraineesPercentageComparedLastMonth ?? 0);
  const trainersGrowthComparedToLastMonth = Math.round(data?.trainersPercentageComparedLastMonth ?? 0);

  // Get monthly user count
  const today = new Date();
  const monthName: any = today.toLocaleString('default', { month: 'long' });
  const currentMonthTrainees = data?.monthlyUsers[monthName];

  // Chart Data
  const series = [userGrowthComparedToLastMonth];
  const options: ApexOptions = {
    colors: ["#1CB4C7"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#1CB4C7"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Monthly Users
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Registered users compared last month
            </p>
          </div>
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View More
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <div className="relative ">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            +10%
          </span>
        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          You have {currentMonthTrainees} users today, it's {userGrowthComparedToLastMonth}% higher than last month. We have many users showing interest with our program.
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            GoPeakFit
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {gpfTraineesGrowthComparedToLastMonth}%

            {gpfTraineesGrowthComparedToLastMonth == 0 ? <ArrowLeft size={16} className="text-green-500" />
              : gpfTraineesGrowthComparedToLastMonth > 0 ? <ArrowUp size={16} className="text-green-500" />
                : <ArrowDown size={16} className="text-green-500" />
            }
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Non-GoPeakFit
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {noneGpfTraineesGrowthComparedToLastMonth}%
            {noneGpfTraineesGrowthComparedToLastMonth == 0 ? <ArrowLeft size={16} className="text-green-500" />
              : noneGpfTraineesGrowthComparedToLastMonth > 0 ? <ArrowUp size={16} className="text-green-500" />
                : <ArrowDown size={16} className="text-green-500" />
            }
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Trainers
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {trainersGrowthComparedToLastMonth}%
            {trainersGrowthComparedToLastMonth == 0 ? <ArrowLeft size={16} className="text-green-500" />
              : trainersGrowthComparedToLastMonth > 0 ? <ArrowUp size={16} className="text-green-500" />
                : <ArrowDown size={16} className="text-green-500" />
            }
          </p>
        </div>
      </div>
    </div>
  );
}
