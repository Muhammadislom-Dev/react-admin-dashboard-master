import React from "react";
import { useMutation } from "react-query";
import { Checkbox } from "@mui/material";
import { postTelegramData } from "../../api";
import { useState } from "react";

function Telegram({ data }) {
  const [activeStates, setActiveStates] = useState({});
  const active = activeStates?.isToggled;
  const { mutate: TelegramMutate } = useMutation(
    ["telegramData", active, data],
    () => postTelegramData(active, data)
  );

  const handleTelegramToogle = (id) => {
    const updatedActiveStates = {
      isToggled: !activeStates[id]?.isToggled,
    };
    setActiveStates(updatedActiveStates);
    TelegramMutate();
  };
  return (
    <>
      Telegram kanal yuborilsinmi?
      <Checkbox
        checked={activeStates[data]?.isToggled}
        onChange={() => {
          handleTelegramToogle(data);
        }}
      />
    </>
  );
}

export default Telegram;
