import { toast } from "react-toastify";
import { API } from "../../api";

export const fileUploadFunc = async ({ data, setFormData }) => {
  return await API.fileUpload(data)
    .then((res) => {
      setFormData((prev) => ({
        ...prev,
        photoId: res.data.objectKoinot[0].id,
      }));
      toast.success("Rasim muvafaqiyatli yuklandi");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Rasim yuklanmadi qaytadan urinib ko'ring");
    });
};

export const userPostFunc = async ({ data, refetch, handleClose }) => {
  return await API.postUserData(data)
    .then((res) => {
      console.log(res.data);
      refetch();
      handleClose();
      toast.success("Foydalanuvchi muvofaqiyatli yaratildi");
    })
    .catch((err) => {
      if (
        err.response.data.objectKoinot[0]?.expelling.includes(
          "telephone number is invalid"
        )
      ) {
        toast.error("Telefon nomer hato kiritilagan");
      } else if (
        err.response.data.objectKoinot[0]?.expelling.includes(
          "this phoneNumber is busy"
        )
      ) {
        toast.error("Bu telefon nomer ro'yhatdan o'tgan");
      } else {
        toast.error("Foydalanuvchi yaratilmadi qaytadan urinib ko'ring");
      }
    });
};
