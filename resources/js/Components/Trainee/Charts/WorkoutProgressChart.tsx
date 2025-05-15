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

const WorkoutProgressChart = () => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], // Example labels (weeks)
    datasets: [
      {
        label: 'Weight Lifted (kg)',
        data: [50, 55, 60, 65, 70], // Example workout data (kg lifted)
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Workout Progress</h2>
      <Line data={data} />
    </div>
  );
};

export default WorkoutProgressChart;
