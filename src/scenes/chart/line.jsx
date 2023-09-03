import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { getStaticsGraph } from "../../api";
import { useState } from "react";
import { useEffect } from "react";

const LineChartUser = ({ value, valueOne }) => {
  const [user, setUser] = useState([]);
  const { data: lineGraph } = useQuery(["lineGraph", value, valueOne, setUser], () =>
    getStaticsGraph(value, valueOne, setUser)
  );
  let newTimeArray = [];
  let newCountsArray = [];

  if (user && user.length > 0) {
    const countsArray = user.map((item) => item.count);
    newCountsArray = [...countsArray];

    const timeArray = user.map((item) => item.time);
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
      <h3>Ro'yhatdan o'tkanlar soni</h3>
      <div style={{ width: "700px", margin: "25px 0", paddingBottom: "80px" }}>
        <Line data={data} />
      </div>
    </>
  );
};

export default LineChartUser;
