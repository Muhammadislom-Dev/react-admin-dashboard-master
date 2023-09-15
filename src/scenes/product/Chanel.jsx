import React from "react";
import { useMutation } from "react-query";
import { Checkbox } from "@mui/material";
import { postTelegramDataChanel } from "../../api";

function TelegramChanel({ data }) {
  const { mutate: TelegramMutate } = useMutation(["telegramData", data], () =>
    postTelegramDataChanel(data)
  );

  const handleTelegramToogle = () => {
    TelegramMutate();
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
      <h3 style={{ color: "black", marginTop: "0" }}>
        {" "}
        Telegram kanal yuborilsinmi?
      </h3>
      <Checkbox
        style={{ color: "black", marginBottom: "15px" }}
        onChange={() => {
          handleTelegramToogle(data);
        }}
      />
    </div>
  );
}

export default TelegramChanel;
