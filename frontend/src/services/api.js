  // import axios from "axios";

  // const api = axios.create({
  //   baseURL: "https://visual-caption-backend.onrender.com/api",
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

const api = axios.create({
  baseURL: "https://visual-caption-backend.onrender.com/api",
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
  generateImageCaption: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // 📌 Kiểm tra nếu API cần "image" thay vì "file"
      
      console.log("Sending image caption request...", file); // 🛠 Debug log
      
      const response = await api.post("/caption/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data); // 🛠 Debug log
      return response.data;
    } catch (error) {
      console.error("Error generating caption:", error.response?.data || error.message);
      throw error;
    }
  },

  generateVideoTitle: async (url) => {
    try {
      const response = await api.post("/caption/video", { url });
      return response.data;
    } catch (error) {
      console.error("Error generating video title:", error.response?.data || error.message);
      throw error;
    }
  },

  getHistory: async () => {
    try {
      const response = await api.get("/history");
      return response.data;
    } catch (error) {
      console.error("Error fetching history:", error.response?.data || error.message);
      throw error;
    }
  },

  getHistoryDetail: async (id) => {
    try {
      const response = await api.get(`/history/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching history detail:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default {
  ...auth,
  ...features,
};
