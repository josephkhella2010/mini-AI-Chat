import axios from "axios";

export const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token") || "";
};
export const logoutUser = () => {
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// axios instance

export const apiUrl = axios.create({
  baseURL: "https://backend-django-mini-ai-chat.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      logoutUser();
    }
    return Promise.reject(error);
  },
);

export const fetchApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  useJwt: boolean = true,
): Promise<T> => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(useJwt && token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const response = await apiUrl.request({
    url: endpoint,
    method,
    data,
    headers,
  });
  return response.data;
};
