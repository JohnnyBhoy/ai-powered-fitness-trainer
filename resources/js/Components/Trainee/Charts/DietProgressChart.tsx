import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const DietProgressChart = () => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'], // Example days
    datasets: [
      {
        label: 'Calories Consumed (kcal)',
        data: [2200, 1800, 2100, 2400, 2000], // Example calorie intake data
        backgroundColor: '#66bb6a',
      },
      {
        label: 'Calories Burned (kcal)',
        data: [2500, 2200, 2300, 2500, 2200], // Example calories burned
        backgroundColor: '#ff7043',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Diet Progress</h2>
      <Bar data={data} />
    </div>
  );
};

export default DietProgressChart;
