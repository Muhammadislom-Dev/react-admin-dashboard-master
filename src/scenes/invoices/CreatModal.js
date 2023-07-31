import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { API, getTagData, postTagData } from "../../api";
import { useMutation, useQuery } from "react-query";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TextField } from "@mui/material";
import { MultipleSelect } from "../../components";
import { usePhotoUpload } from "../../hooks/usePhotoUpload";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateModal({ refetch }) {
  const [open, setOpen] = React.useState(false);
  const [editorState, setEditorState] = React.useState();
  const [image, setImage] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
    htmlContent: "",
    top: true,
    photoId: "",
    tagsId: [],
  });

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

  const { mutate: postBlogMutate, isLoading } = useMutation(async (payload) => {
    return await API.postBlog(payload)
      .then((res) => {
        console.log(res.data);
        toast.success("Blog muvafaqiyatli yaratildi");
        refetch();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        toast.danger("Blog yaratilmadi qaytadan urinib ko'ring");
      });
  });

  // const { mutate } = usePhotoUpload({ setData: setFormData });
  const mutation = useMutation((tag) => postTagData(tag));
  const { data, isLoading: singleWorkerLoading } = useQuery(
    "tagData",
    getTagData
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
    postBlogMutate({ ...formData, language: "UZ" });
  };

  console.log(isLoading);
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
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Blog Name"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}
            >
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
                // value={image.name}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  // const newImageData = new FormData();
                  // newImageData.append("key", e.target.files[0]);
                  mutate({ key: e.target.files[0] });
                }}
              />
            </div>
            <div>
              <TextField
                sx={{ width: 550, marginBottom: "10px" }}
                label="Blog Nmae"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <CKEditor
                editor={ClassicEditor}
                data=""
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData((prev) => ({ ...prev, htmlContent: data }));
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}
            >
              <MultipleSelect
                data={data?.objectKoinot.content}
                setFormData={setFormData}
                singleWorkerLoading={singleWorkerLoading}
              />
              {/* {!singleWorkerLoading &&
                data?.objectKoinot.content && 
                data?.objectKoinot.content?.map((option) => )}
              <select
                placeholder="Company"
                className="form-select"
                required
                name="category_id"
                defaultValue={""}
              >
                <option value="" disabled>
                  Select Tag
                </option>
              </select> */}
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
