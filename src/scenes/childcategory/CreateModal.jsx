import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { API, postTagData } from "../../api";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateModal({ refetch, category }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nameRu: "",
    nameUz: "",
    icon: null,
    parentCategory: category,
    iconInSelect: null,
    photoId: null,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const { mutate: postCategoryMutate, isLoading } = useMutation(
    async (payload) => {
      return await API.postCategoryData(payload)
        .then((res) => {
          setFormData({
            nameUz: "",
            nameRu: "",
          });
          toast.success("SubCategory muvafaqiyatli yaratildi");
          refetch();
          handleClose();
        })
        .catch((err) => {
          console.log(err);
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
    postCategoryMutate({ ...formData });
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
        <DialogTitle>{"SubCategory Name"}</DialogTitle>
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
            <Button variant="contain" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contain" color="primary" type="submit">
              {isLoading ? "Yuklanmoqda..." : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
