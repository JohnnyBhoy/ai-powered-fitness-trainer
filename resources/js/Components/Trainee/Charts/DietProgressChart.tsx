import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface Props {
  className?: string;
}

const DietProgressChart  : React.FC<Props> = ({ className }) => {
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
    <div className={className}>
      <Bar data={data} />
    </div>
  );
};

export default DietProgressChart;
