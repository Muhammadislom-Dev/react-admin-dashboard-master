import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { MenuItem, Select, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { API } from "../../api";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductCreate({ refetch, edit }) {
  const [open, setOpen] = React.useState(false);
  const [top, setTop] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  const [telegram, setTelegram] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const { mutate: postCategoryMutate, isLoading } = useMutation(
    async (payload) => {
      return await API.postControllerData(top, accepted, edit, telegram)
        .then((res) => {
          toast.success("Mahsulot muvafaqiyatli tahrirlandi");
          refetch();
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Mahsulot tahrirlanmadi qaytadan urinib ko'ring");
        });
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postCategoryMutate();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Category Name"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div>
              <label style={{ marginBottom: "10px" }} htmlFor="">
                Bu mahsulot tasdiqlansinmi?
              </label>
              <Select
                sx={{ width: 550, marginBottom: "10px" }}
                name="accepted"
                required
                value={accepted}
                onChange={(e) => setAccepted(e.target.value)}>
                <MenuItem value={true}>Ha </MenuItem>
                <MenuItem value={false}>Yo'q</MenuItem>
              </Select>
            </div>
            <div>
              <label style={{ marginBottom: "10px" }} htmlFor="">
                Topga chiqishini xohlaysizmi?
              </label>
              <Select
                sx={{ width: 550, marginBottom: "10px" }}
                name="top"
                required
                value={top}
                onChange={(e) => setTop(e.target.value)}>
                <MenuItem value={true}>Ha</MenuItem>
                <MenuItem value={false}>Yo'q</MenuItem>
              </Select>
            </div>
            <div>
              <label style={{ marginBottom: "10px" }} htmlFor="">
                Kanaldan o'chirilsinmi?
              </label>
              <Select
                sx={{ width: 550, marginBottom: "10px" }}
                name="top"
                required
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}>
                <MenuItem value={true}>Ha</MenuItem>
                <MenuItem value={false}>Yo'q</MenuItem>
              </Select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "#fff" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={{ color: "#fff" }} type="submit">
              {isLoading ? "Yuklanmoqda..." : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
