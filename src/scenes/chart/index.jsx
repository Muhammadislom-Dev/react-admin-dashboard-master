import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45, 55, 60, 65, 70, 90],
    },
  ],
};

const LineChart = () => {
  return (
    <>
      <h3>Mahsulotlar uchun</h3>
      <div style={{ width: "600px" }}>
        <Line data={data} />
      </div>
    </>
  );
};

export default LineChart;
