import axios from "axios";
export const API_BASE_URL = "http://64.227.105.70:1777/api"; // API ning manzili
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
  fileUpload: (payload) =>
    axiosInstance.post("/attachment/v1/upload-photo", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  postBlog: (payload) => axiosInstance.post("/blog/v1", payload),
};

export const adminLoginData = async (formData) => {
  const response = await axios
    .post(`${API_BASE_URL}/auth/v1/login`, formData)
    .then((res) => {
      window.location.reload();
      localStorage.setItem(
        "tekin_market_token",
        `${res?.data?.objectKoinot?.accessToken}`
      );
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

export const postCategoryData = async (category) => {
  const response = await axios
    .post(`${API_BASE_URL}/category/v1`, category, {
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

export const deteleTagData = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/tags/v1/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
    },
  });
  return response.data;
};

export const getUserData = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/user/v1?page=0&size=100&sortBy=id`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
      },
    }
  );
  return response.data;
};

export const getCategoryData = async () => {
  const response = await axios.get(`${API_BASE_URL}/category/v1`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tekin_market_token")}`,
    },
  });
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
