  // import axios from "axios";

  // const api = axios.create({
  //   baseURL: "/api",
  //   withCredentials: true,
  // });

  // // Auth APIs
  // const auth = {
  //   register: (email, password) =>
  //     api.post("/auth/register", { email, password }),

  //   sendOtp: (email) => api.post("/auth/send-otp", { email }),

  //   verifyOtp: (email, otp) => api.post("/auth/verify-otp", { email, otp }),

  //   login: (email, password) => api.post("/auth/login", { email, password }),

  //   logout: () => api.post("/auth/logout"),

  //   checkAuth: () => api.get("/auth/check"),
  // };

  // // Feature APIs
  // const features = {
  //   generateImageCaption: (file) => {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     return api.post("/caption/image", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //   },

  //   generateVideoTitle: (url) => api.post("/caption/video", { url }),

  //   getHistory: () => api.get("/history"),

  //   getHistoryDetail: (id) => api.get(`/history/${id}`),
  // };

  // export default {
  //   ...auth,
  //   ...features,
  // };








  import axios from "axios";

  // Lấy URL từ biến môi trường, nếu không có thì mặc định là local
  const API_URL = import.meta.env.VITE_API_URL || "https://visual-caption-backend.onrender.com/api";
  
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });
  
  // Auth APIs
  const auth = {
    register: (email, password) =>
      api.post("/auth/register", { email, password }),
  
    sendOtp: (email) => api.post("/auth/send-otp", { email }),
  
    verifyOtp: (email, otp) => api.post("/auth/verify-otp", { email, otp }),
  
    login: (email, password) => api.post("/auth/login", { email, password }),
  
    logout: () => api.post("/auth/logout"),
  
    checkAuth: () => api.get("/auth/check"),
  };
  
  // Feature APIs
  const features = {
    generateImageCaption: (file) => {
      const formData = new FormData();
      formData.append("file", file);
      return api.post("/caption/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  
    generateVideoTitle: (url) => api.post("/caption/video", { url }),
  
    getHistory: () => api.get("/history"),
  
    getHistoryDetail: (id) => api.get(`/history/${id}`),
  };
  
  export default {
    ...auth,
    ...features,
  };
  