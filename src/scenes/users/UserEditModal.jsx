import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { fileUploadFunc, userPostFunc } from "../extra";
import { MultipleSelect } from "../../components";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const roles = [
  { id: "ROLE_ADMIN", tag: "admin" },
  { id: "ROLE_USER", tag: "user" },
  {
    id: "ROLE_MODERATOR",
    tag: "moderator",
  },
  {
    id: "ROLE_SUPPER_ADMIN",
    tag: "super_admin",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const UserEditModal = ({ refetch, id }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    password: true,
    phoneNumber: "",
    photoId: 0,
    id: id,
    roles: ["ROLE_ADMIN,ROLE_USER,ROLE_SUPPER_ADMIN", "ROLE_MODERATOR"],
  });

  const { mutate } = useMutation((payload) =>
    fileUploadFunc({ data: payload, setFormData })
  );

  const { mutate: postUser, isLoading: postLoading } = useMutation((payload) =>
    userPostFunc(payload)
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
      enabled: true,
    };

    postUser({ data: newData, refetch, handleClose });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        <DialogTitle>{"Blog Name"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}>
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
            </div>
            <div>
              <TextField
                sx={{ width: 550, marginBottom: "10px" }}
                label="First name"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                sx={{ width: 550, marginBottom: "10px" }}
                label="Last name"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <FormControl
                variant="outlined"
                sx={{ width: 550, marginBottom: "10px" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </div>
            <div>
              <TextField
                sx={{ width: 550, marginBottom: "10px" }}
                label="Phone number"
                name="phoneNumber"
                type="number"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}>
              <MultipleSelect
                data={roles}
                setFormData={setFormData}
                objKey="roles"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{postLoading ? "Loading..." : "Add"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default UserEditModal;
