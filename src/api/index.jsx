import axios from "axios";
import { toast } from "react-toastify";
export const API_BASE_URL = "https://tekinmarket.uz/api"; // API ning manzili
const axiosInstance = axios;
axiosInstance.defaults.baseURL = API_BASE_URL;

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("tekin_market_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const API = {
  //POST REQUEST
  fileUpload: (payload) =>
    axiosInstance.post("/attachment/v1/upload-photo", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  postBlog: (payload) => axiosInstance.post("/blog/v1", payload),
  postCategoryData: (payload) => axiosInstance.post("/category/v1", payload),
  postUserData: (payload) => axiosInstance.post("/user/v1/register", payload),
  postControllerData: (top, edit, accepted, telegram) =>
    axiosInstance.post(
      `/product/v1/control/${accepted}?accepted=${edit}&deleteInTelegram=${telegram}&top=${top}`
    ),
  //GET REQUEST
  // getUserData: (payload) =>
  //   axiosInstance.get(`/user/v1?page=0&role=${payload.formData}&size=100`),
  // getStaticsData: (payload) => axiosInstance.get("/adminVariables/v1", payload),
};

export const postActiveData = async (newId) => {
  const response = await axios
    .post(`${API_BASE_URL}/product/v1/control/${newId}?status=ACCEPTED`)
    .then((res) => {
      console.log(res.data);
      toast.success("Mahsulot muvaffaqiyatli tasdiqlandi!");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Sizda xatolik yuzaga keldi!");
    });
  return response.data;
};

export const postTelegramData = async (newId) => {
  const response = await axios
    .post(`${API_BASE_URL}/product/v1/control/${newId}?status=REJECTED`)
    .then((res) => {
      console.log(res.data);
      toast.success("Mahsulot muvaffaqiyatli bekor qilindi!");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Sizda xatolik yuzaga keldi!");
    });
  return response.data;
};

export const getUserData = async (formData, search) => {
  const response = await axios.get(
    `${API_BASE_URL}/user/v1?page=0&role=${formData}&search=${search}&size=1000`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
      },
    }
  );
  return response.data;
};

export const fetchRegionData = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/region/v1/all?page=0&size=100`
  );
  return response.data;
};

export const fetchDistrictData = async (region) => {
  const response = await axios.get(
    `${API_BASE_URL}/district/v1/all?regionId=${region}`
  );
  return response.data;
};

export const getCategory = async () => {
  const response = await axios.get(`${API_BASE_URL}/category/v1`);
  return response.data;
};

export const adminLoginData = async (formData) => {
  const response = await axios
    .post(`${API_BASE_URL}/auth/v1/login`, formData)
    .then((res) => {
      window.location.reload();
      toast.success("Muvaffaqiyatli kirildi!");
      localStorage.setItem(
        "tekin_market_token",
        `${res?.data?.objectKoinot?.accessToken}`
      );
    })
    .catch((err) => {
      toast.error("Sizning parol yoki raqamingiz xato!");
    });
  return response.data;
};

export const postTagData = async (tag) => {
  const response = await axios
    .post(`${API_BASE_URL}/tags/v1/`, tag, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {});
  return response.data;
};

export const getUserMeData = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/v1/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
    },
  });
  return response.data;
};

export const getTagData = async () => {
  const response = await axios.get(`${API_BASE_URL}/tags/v1?page=0&size=1000`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
    },
  });
  return response.data;
};

export const getStaticsData = async (value, valueOne) => {
  const response = await axios.get(
    `${API_BASE_URL}/statistics/v1/overall?from=${value}&till=${valueOne}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
      },
    }
  );
  return response.data;
};

export const deteleTagData = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/tags/v1/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
    },
  });
  return response.data;
};

// export const getUserData = async () => {
//   const response = await axios.get(
//     `${API_BASE_URL}/user/v1?page=0&size=100&sortBy=id`,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
//       },
//     }
//   );
//   return response.data;
// };

export const getCategoryData = async () => {
  const response = await axios.get(`${API_BASE_URL}/category/v1`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
    },
  });
  return response.data;
};

export const getCategoryByIdData = async (category, setSubCategory) => {
  const response = await axios
    .get(`${API_BASE_URL}/category/v1/${category}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
      },
    })
    .then((res) => setSubCategory(res.data));
  return response?.data;
};

export const getStaticsGraph = async (value, valueOne, setUser) => {
  const response = await axios
    .get(
      `${API_BASE_URL}/statistics/v1/user-product?from=${value}&till=${valueOne}&user=true`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
        },
      }
    )
    .then((res) => setUser(res?.data?.objectKoinot));
  return response.data;
};

export const getStaticsGraphProduct = async (value, valueOne, setUser) => {
  const response = await axios
    .get(
      `${API_BASE_URL}/statistics/v1/user-product?from=${value}&till=${valueOne}&user=false`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
        },
      }
    )
    .then((res) => setUser(res?.data?.objectKoinot));
  return response.data;
};

export const getStaticsGraphData = async (value, valueOne, setUser) => {
  const response = await axios
    .get(
      `${API_BASE_URL}/statistics/v1/product-seen?from=${value}&till=${valueOne}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
        },
      }
    )
    .then((res) => setUser(res?.data?.objectKoinot));
  return response.data;
};

export const getEmailData = async () => {
  const response = await axios.get(`${API_BASE_URL}/email/v1??page=0&size=40`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
    },
  });
  return response.data;
};

export const getProductData = async (accepted, category, district, region) => {
  const response = await axios.get(
    `${API_BASE_URL}/product/v1?productStatus=${accepted}&category=${category}&district=${district}&page=0&region=${region}&size=1000`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
      },
    }
  );
  return response.data;
};

export const deteleCategoryData = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/category/v1/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
    },
  });
  return response.data;
};

export const deteleProductData = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/product/v1/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
    },
  });
  return response.data;
};

export const getByIdProductData = async (data, setProduct) => {
  const response = await axios
    .get(`${API_BASE_URL}/product/v1/${data}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
      },
    })
    .then((res) => setProduct(res.data));
  return response.data;
};

export const deteleBlogData = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/blog/v1/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
    },
  });
  return response.data;
};

export const getBlogPostData = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/blog/v1?page=0&size=100&sortBy=id`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
      },
    }
  );
  return response.data;
};
