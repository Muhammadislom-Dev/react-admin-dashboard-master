import React from "react";
import { useMutation } from "react-query";
import {
  postActiveData,
  productActivePost,
  productActivePostFalse,
} from "../../api";
import { Checkbox } from "@mui/material";
import { useState } from "react";

function TopProduct({ data, top }) {
  console.log(top);
  const [active, setActive] = useState(false);
  const { mutate: activeMutate } = useMutation(
    ["activeParams", data, active],
    () => productActivePost(data, active)
  );
  const { mutate: falseActive } = useMutation(["falseParams", data], () =>
    productActivePostFalse(data)
  );
  const handleToogle = (e) => {
    setActive(e.target.value);
    activeMutate();
  };

  const handleToggleFalse = () => {
    falseActive();
  };
  return (
    <>
      {top === true ? (
        <label className="switch">
          <input
            type="checkbox"
            value={false}
            defaultChecked
            onChange={(e) => {
              handleToogle(e);
            }}
          />
          <span className="sliderr round"></span>
        </label>
      ) : top === false ? (
        <label className="switch">
          <input type="checkbox" onChange={handleToggleFalse} />
          <span className="sliderr round"></span>
        </label>
      ) : (
        ""
      )}
    </>
  );
}

export default TopProduct;
