import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { API } from "../../api";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SubCategoryData({ data }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nameRu: "",
    nameUz: "",
    parentCategory: data,
    photoId: null,
    icon: null,
    iconInSelect: null,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const { mutate: postCategoryMutate, isLoading } = useMutation(
    async (payload) => {
      return await API.postCategoryData(payload)
        .then((res) => {
          toast.success("SubCategory muvafaqiyatli tahrirlandi!");
          handleClose();
        })
        .catch((err) => {
          toast.danger("SubCategory yaratilmadi qaytadan urinib ko'ring");
        });
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    postCategoryMutate({ ...formData, parentCategory: null });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create SubCategory
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
              <TextField
                sx={{ width: 550, marginBottom: "10px" }}
                label="Name Uz"
                name="nameUz"
                required
                value={formData.nameUz}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                sx={{ width: 550, marginBottom: "10px" }}
                label="Name Ru"
                name="nameRu"
                required
                value={formData.nameRu}
                onChange={handleChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">
              {isLoading ? "Yuklanmoqda..." : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
