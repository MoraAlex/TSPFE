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
      text: "Best path chart",
    },
  },
};

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function TableCities({ paths }) {
  const [path, setPath] = useState(paths[0]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPath(paths[count]);
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
        label: "City",
        data: path,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(240,248,255)",
      },
    ],
  };
  return (
    <div style={{ minWidth: "47%", float: "left", paddingRight:"6%" }}>
      <Line options={options} data={data} />
    </div>
  );
}

export default TableCities;
