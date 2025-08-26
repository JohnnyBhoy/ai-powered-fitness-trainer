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
      <Line data={data} />
  );
};

export default MonthlyUsersWithoutTrainerChart;
