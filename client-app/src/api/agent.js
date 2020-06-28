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
  postForm: (url, file) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Activities = {
  list: async () => requests.get("/activities"),
  details: async (id) => requests.get(`/activities/${id}`),
  create: async (activity) => requests.post("/activities", activity),
  update: (activity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id) => requests.del(`/activities/${id}`),
  attend: async (id) => requests.post(`/activities/${id}/attend`),
  unattend: async (id) => requests.del(`/activities/${id}/attend`),
};

const User = {
  current: () => requests.get("/user"),
  login: (user) => requests.post("/user/login", user),
  register: (user) => requests.post("/user/register", user),
};

const Profiles = {
  get: (username) => requests.get(`/profiles/${username}`),
  uploadPhoto: (photo) => requests.postForm("/photos", photo),
  setMainPhoto: (id) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id) => requests.del(`/photos/${id}`),
};

export default {
  Activities,
  User,
  Profiles,
};
