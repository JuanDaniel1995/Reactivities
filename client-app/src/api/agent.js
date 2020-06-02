import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  throw error.response;
});

const responseBody = async (response) => response.data;

const requests = {
  get: async (url) => axios.get(url).then(responseBody),
  post: async (url, body) => axios.post(url, body).then(responseBody),
  put: async (url, body) => axios.put(url, body).then(responseBody),
  del: async (url) => axios.delete(url).then(responseBody),
};

const Activities = {
  list: async () => requests.get("/activities"),
  details: async (id) => requests.get(`/activities/${id}`),
  create: async (activity) => requests.post("/activities", activity),
  update: (activity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id) => requests.del(`/activities/${id}`),
};

const User = {
  current: () => requests.get("/user"),
  login: (user) => requests.post("/user/login", user),
  register: (user) => requests.post("/user/register", user),
};

export default {
  Activities,
  User,
};
