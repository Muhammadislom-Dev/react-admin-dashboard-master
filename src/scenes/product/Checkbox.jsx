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
    <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
      <h3 style={{ color: "black", marginTop: "0" }}>Mahsulot tasdiqlash</h3>
      <Checkbox
        style={{ color: "black", marginBottom: "15px" }}
        onChange={handleToggle}
      />
    </div>
  );
}

export default CheckboxData;
