import React from "react";

function TimePicker({ date }) {
  function formatSecondsToDateString(seconds) {
    const date = new Date(seconds * 1000);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  const seconds = date / 1000;
  const formattedDate = formatSecondsToDateString(seconds);
  return formattedDate;
}

export default TimePicker;
