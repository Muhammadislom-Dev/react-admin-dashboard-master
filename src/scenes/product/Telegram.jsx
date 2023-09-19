import React from "react";
import { useMutation } from "react-query";
import { Checkbox } from "@mui/material";
import { postTelegramData } from "../../api";
import { useState } from "react";

function Telegram({ data }) {
  const [activeStates, setActiveStates] = useState({});
  const active = activeStates?.isToggled;
  const { mutate: TelegramMutate } = useMutation(["telegramData", data], () =>
    postTelegramData(data)
  );

  const handleTelegramToogle = (id) => {
    TelegramMutate();
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
      <h3 style={{ color: "black", marginTop: "0" }}> Mahsulot bekor qilish</h3>
      <Checkbox
        style={{ color: "black", marginBottom: "15px" }}
        onChange={() => {
          handleTelegramToogle(data);
        }}
      />
    </div>
  );
}

export default Telegram;
