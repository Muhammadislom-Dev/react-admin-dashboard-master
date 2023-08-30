import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { API, getCategoryData, postTagData } from "../../api";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal({ edit }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nameRu: "",
    nameUz: "",
    parentCategory: 1,
    id: edit,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const {
    data,
    isLoading: singleCompanyLoading,
    refetch,
  } = useQuery("categoryData", getCategoryData);
  const { mutate: postCategoryMutate, isLoading } = useMutation(
    async (payload) => {
      return await API.postCategoryData(payload)
        .then((res) => {
          console.log(res.data);
          toast.success("Category muvafaqiyatli yaratildi");
          refetch();
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          toast.danger("Categorys yaratilmadi qaytadan urinib ko'ring");
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
    postCategoryMutate({ ...formData, parentCategory: null });
  };

  console.log(formData);
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit
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
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                  displayEmpty
                  onChange={(e) =>
                    setFormData((state) => ({
                      ...state,
                      parentCategory: e.target.value,
                    }))
                  }
                  value={formData.parentCategory}
                  inputProps={{ "aria-label": "Without label" }}>
                  {data?.objectKoinot?.length ? (
                    data?.objectKoinot?.map((el, index) => (
                      <MenuItem key={index} value={el?.id}>
                        {el?.nameUz}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={1}>Kiyim-Kechak</MenuItem>
                  )}
                </Select>
              </FormControl>
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
