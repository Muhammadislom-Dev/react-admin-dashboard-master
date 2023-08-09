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

export default function EditModal({ data }) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [formData, setFormData] = React.useState({
    nameRu: "",
    nameUz: "",
    photoId: "",
    icon: selectedFile,
    id: data,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const { mutate } = useMutation(async (payload) => {
    return await API.fileUpload(payload)
      .then((res) => {
        setFormData((prev) => ({
          ...prev,
          photoId: res.data.objectKoinot[0].id,
        }));
        toast.success("Rasim muvofaqiyatli yuklandi");
      })
      .catch((err) => {
        console.log(err);
        toast.danger("Rasim yuklanmadi qaytadan urinib ko'ring");
      });
  });

  const { mutate: postCategoryMutate, isLoading } = useMutation(
    async (payload) => {
      return await API.postCategoryData(payload)
        .then((res) => {
          console.log(res.data);
          toast.success("Category muvafaqiyatli tahrirlandi!");
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
    console.log(formData);
    postCategoryMutate({ ...formData, parentCategory: null });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}>
              <label>
                Category Icon
                <input type="file" accept=".svg" onChange={handleFileChange} />
              </label>

              <label>
                Category Image
                <input
                  id="image-input"
                  className="form-control"
                  style={{
                    width: "250px",
                    marginRight: "20px",
                    fontSize: "1rem",
                  }}
                  name="images"
                  type="file"
                  required
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    mutate({ key: e.target.files[0] });
                  }}
                />
              </label>
            </div>
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
