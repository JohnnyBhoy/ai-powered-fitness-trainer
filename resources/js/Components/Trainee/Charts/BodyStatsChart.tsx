import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BodyStatsChart = () => {
  const data = {
    labels: ['Weight (kg)', 'Body Fat (%)', 'Muscle Mass (%)', 'Water Percentage (%)'], // Example metrics
    datasets: [
      {
        label: 'Body Stats',
        data: [75, 15, 35, 65], // Example body stats data
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        borderColor: '#42a5f5',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Body Stats</h2>
      <Radar data={data} />
    </div>
  );
};

export default BodyStatsChart;
