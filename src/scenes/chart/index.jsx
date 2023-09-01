import React, { useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { getStaticsGraphData } from "../../api";
import { useQuery } from "react-query";

const LineChart = ({ value, valueOne }) => {
  const [user, setUser] = useState([]);
  const { data: lineGraph, isLoading } = useQuery(
    ["lineGraphData", value, valueOne, setUser],
    () => getStaticsGraphData(value, valueOne, setUser)
  );

  let newTimeArray = [];
  let newCountsArray = [];

  if (user && user?.seenProductsStats?.length > 0) {
    const countsArray =
      user && user?.seenProductsStats?.map((item) => item.count);
    newCountsArray = [...countsArray];
    const timeArray = user && user?.seenProductsStats?.map((item) => item.time);
    newTimeArray = [...timeArray];
  } else {
    console.log("user ma'lumotlari topilmadi yoki bo'sh.");
  }

  const data = {
    labels: newTimeArray,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: newCountsArray,
      },
    ],
  };

  return (
    <>
      <h3>Get Product for the Seen</h3>
      <div style={{ width: "700px", margin: "25px 0", paddingBottom: "80px" }}>
        <Line data={data} />
      </div>
    </>
  );
};

export default LineChart;
