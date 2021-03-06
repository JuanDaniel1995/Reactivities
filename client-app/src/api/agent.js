import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
  list: async (limit, page, isGoing, isHost, startDate) => {
    const params = new URLSearchParams();
    params.append("limit", String(limit));
    params.append("offset", `${page * limit}`);
    isGoing !== undefined && params.append("isGoing", isGoing);
    isHost !== undefined && params.append("isHost", isHost);
    startDate && params.append("startDate", startDate.toISOString());
    return axios.get("/activities", { params }).then(responseBody);
  },
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
  updateProfile: (profile) => requests.put("/profiles", profile),
  follow: (username) => requests.post(`/profiles/${username}/follow`, {}),
  unfollow: (username) => requests.del(`/profiles/${username}/follow`, {}),
  listFollowings: (username, predicate) =>
    requests.get(`/profiles/${username}/follow?predicate=${predicate}`),
  listActivities: (username, predicate) =>
    requests.get(`/profiles/${username}/activities?predicate=${predicate}`),
};

export default {
  Activities,
  User,
  Profiles,
};
