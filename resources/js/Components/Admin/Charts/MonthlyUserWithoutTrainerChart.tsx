import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const MonthlyUserWithoutTrainerChart = ({trainees, trainer} : {trainees: number[], trainer: number[]}) => {
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
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Trainer and Trainees</h2>
      <Bar data={data} />
    </div>
  );
};

export default MonthlyUserWithoutTrainerChart;
