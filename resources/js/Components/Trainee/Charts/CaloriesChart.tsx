import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CaloriesChart = () => {
  const data = {
    labels: ['Calories Consumed', 'Calories Burned'],
    datasets: [
      {
        data: [2200, 2500], // Example values (calories consumed and burned)
        backgroundColor: ['#66bb6a', '#ff7043'],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Calories Burned vs Consumed</h2>
      <Doughnut data={data} />
    </div>
  );
};


export default CaloriesChart;
