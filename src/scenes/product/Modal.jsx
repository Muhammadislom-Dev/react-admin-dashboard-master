import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Box,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "react-query";
import { API_BASE_URL, getByIdProductData } from "../../api";
import { useState } from "react";
import Telegram from "./Telegram";
import CheckboxData from "./Checkbox";
import axios from "axios";
import { useEffect } from "react";
import TelegramChanel from "./Chanel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#f2f2f2",
  boxShadow: 24,
  p: 4,
};

function ProductModal({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [product, setProduct] = useState([]);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/product/v1/${data}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [data]);

  return (
    <div>
      <Button variant="contain" color="primary" onClick={handleOpen}>
        <VisibilityIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                width: "100%",
                flexWrap: "wrap",
              }}>
              {product?.photos?.map((evt) => (
                <img
                  alt={evt.name}
                  src={evt.filePath}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
            <h3 style={{ color: "black", marginBottom: "0" }}>
              {product?.name}
            </h3>
            <p style={{ color: "black", marginTop: "0" }}>
              {product?.description}
            </p>
            <h4 style={{ color: "black", marginBottom: "0" }}>
              Category: {product?.category?.nameUz}
            </h4>
            <p style={{ color: "black", marginTop: "0" }}>
              {product?.region?.name} viloyati {product?.district?.name} tumani
            </p>
            <h4 style={{ color: "black", marginTop: "0" }}>
              PhoneNumber: {product?.phoneNumber}
            </h4>

            <Telegram data={data} />
            <CheckboxData data={data} />
            <TelegramChanel data={data} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default ProductModal;
