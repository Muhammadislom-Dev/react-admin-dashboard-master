import React from "react";
import { useMutation } from "react-query";
import { postActiveData } from "../../api";
import { Checkbox } from "@mui/material";

function CheckboxData({ data }) {
  const { mutate: activeMutate } = useMutation(["statusParams", data], () =>
    postActiveData(data)
  );
  const handleToggle = () => {
    activeMutate();
  };
  return (
    <>
      Mahsulot tasdiqlash
      <Checkbox onChange={handleToggle} />
    </>
  );
}

export default CheckboxData;
