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

function CurvRef({ allBest }) {
  const [path, setPath] = useState(allBest[0]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPath(allBest[count]);
      setCount(count + 1);
    }, 1000);
    if (count >= 100) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });
  const x = [];
  const y = [];
  const labels = [];
  const coordinates = [];
  const yGenEnd = [];
  const yGen = [];
  const A = 8,
    B = 25,
    C = 4,
    D = 45,
    E = 10,
    F = 17,
    G = 35;
  for (let i = 1; i <= 1000; i++) {
    const [gA, gB, gC, gD, gE, gF, gG] = path;
    labels.push(i);
    x.push(i / 10);
    y.push(
      A * (B * Math.sin(x[i - 1] / C) + D * Math.cos(x[i - 1] / E)) +
        F * x[i - 1] -
        G
    );
    yGen.push(
      gA * (gB * Math.sin(x[i - 1] / gC) + gD * Math.cos(x[i - 1] / gE)) +
        gF * x[i - 1] -
        gG
    );
    yGenEnd.push({ x: x[i - 1] * 10, y: yGen[i - 1] });
    coordinates.push({ x: x[i - 1] * 10, y: y[i - 1] });
  }
  console.log("aqui: ", yGenEnd);
  const data = {
    labels,
    datasets: [
      {
        label: "X",
        data: coordinates,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(240,248,255)",
      },
      {
        label: "y",
        data: yGenEnd,
        borderColor: "rgb(99, 132, 255)",
        backgroundColor: "rgb(240,248,255)",
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

export default CurvRef;
