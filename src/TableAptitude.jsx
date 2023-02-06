import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Aptitude chart",
    },
  },
};

function TableAptitude({ distances }) {
  const labels = [];
  for (let i = 1; i <= 100; i++) {
    labels.push(i);
  }
  const [path, setPath] = useState(distances[0]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPath(distances[count]);
      setCount(count + 1);
    }, 1000);
    if (count >= 100) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });
  const data = {
    labels,
    datasets: [
      {
        label: "Aptitude",
        data: path,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(240,248,255)",
      },
    ],
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <Line options={options} data={data} />
      {count >= 100 && <span>Best Aptitude: {path[path.length - 1]}</span>}
    </div>
  );
}

export default TableAptitude;
