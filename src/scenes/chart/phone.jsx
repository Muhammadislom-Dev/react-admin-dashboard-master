import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { getStaticsGraphData } from "../../api";
import { useQuery } from "react-query";

const LineChartPhone = ({ value, valueOne }) => {
  const [user, setUser] = useState([]);
  const { data: lineGraph, isLoading } = useQuery(
    ["lineGraphDataOne", value, valueOne, setUser],
    () => getStaticsGraphData(value, valueOne, setUser)
  );

  let newTimeArray = [];
  let newCountsArray = [];

  if (user && user?.getPhoneNumberStats?.length > 0) {
    const countsArray =
      user && user?.getPhoneNumberStats?.map((item) => item.count);
    newCountsArray = [...countsArray];
    const timeArray =
      user && user?.getPhoneNumberStats?.map((item) => item.time);
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
      <h3>Get Product for PhoneNumber by the Statistics</h3>
      <div style={{ width: "700px", margin: "25px 0", paddingBottom: "80px" }}>
        <Line data={data} />
      </div>
    </>
  );
};

export default LineChartPhone;
