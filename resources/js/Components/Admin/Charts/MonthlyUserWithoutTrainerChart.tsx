import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { TrendingUp } from 'lucide-react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const MonthlyUserWithoutTrainerChart = ({ trainees, trainer }: { trainees: number[], trainer: number[] }) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Trainer',
        data: trainer,
        backgroundColor: '#66bb6a',
      },
      {
        label: 'Trainees under Trainer',
        data: trainees,
        backgroundColor: '#ff7043',
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-green-500" /> Trainee & Trainer Growth
      </h2>
      <Bar data={data} />
    </div>
  );
};

export default MonthlyUserWithoutTrainerChart;
