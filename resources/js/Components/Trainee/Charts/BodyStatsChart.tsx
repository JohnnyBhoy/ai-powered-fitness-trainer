import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  RadialLinearScale, // ✅ Correct scale for radar charts
} from "chart.js";
import { Radar } from "react-chartjs-2";
import React from "react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

interface BodyStatsChartProps {
  className?: string;
}

const BodyStatsChart: React.FC<BodyStatsChartProps> = ({ className }) => {
  const data = {
    labels: ["Arms", "Legs", "Chest", "Back", "Core", "Cardio"],
    datasets: [
      {
        label: "Current Stats",
        data: [8, 7, 6, 7, 5, 8],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: "#e5e7eb", // Tailwind gray-200
        },
        grid: {
          color: "#e5e7eb",
        },
        pointLabels: {
          color: "#374151", // Tailwind gray-700
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={className}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default BodyStatsChart;
