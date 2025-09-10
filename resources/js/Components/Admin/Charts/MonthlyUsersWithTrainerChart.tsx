import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { BarChart3 } from 'lucide-react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const MonthlyUsersWithoutTrainerChart = ({trainees} : {trainees: number[]}) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Trained by GoPeakFit AI',
        data: trainees,
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
     <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" /> Monthly GPF Trainees
            </h2>
      <Line data={data} />
      </div>
  );
};

export default MonthlyUsersWithoutTrainerChart;
