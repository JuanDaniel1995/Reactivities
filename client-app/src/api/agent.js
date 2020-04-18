import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = async (response) => await response.data;

const requests = {
  get: async (url) => await axios.get(url).then(responseBody),
  post: async (url, body) =>
    await axios.post(url, body).then(responseBody).then(console.log("Created")),
  put: async (url, body) => await axios.put(url, body).then(responseBody),
  del: async (url) => await axios.delete(url).then(responseBody),
};

const Activities = {
  list: async () => await requests.get("/activities"),
  details: async (id) => await requests.get(`/activities/${id}`),
  create: async (activity) => await requests.post("/activities", activity),
  update: async (activity) =>
    await requests.put(`/activities/${activity.id}`, activity),
  delete: async (id) => await requests.del(`/activities/${id}`),
};

export default {
  Activities,
};
