import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  className?: string;
}

const CaloriesChart: React.FC<Props> = ({ className }) => {
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
     <div className={className}>
      <Doughnut data={data} />
    </div>
  );
};


export default CaloriesChart;
