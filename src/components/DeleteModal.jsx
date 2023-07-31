import * as React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Box,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DeleteModal({ data, mutate }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    mutate(data);
  };
  return (
    <div>
      <Button variant="contain" onClick={handleOpen}>Delete</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <DialogTitle>Oʻchirish</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ushbu ma'lumotni oʻchirib tashlamoqchimisiz?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Yo'q</Button>
            <Button onClick={handleSubmit} className="confirm-btn">
              Ha
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteModal;