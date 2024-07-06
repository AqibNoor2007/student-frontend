import api from "./api-client";

export const auth = {
  signIn: (data) => api.post(`user/login`, data).then(({ data }) => data),
  currentUser: (id) => api.get(`user/${id}`).then((res) => res.data),
};

export const genrateCertificate = (data) =>
  api.post("certificates/generate", data).then(({ data }) => data);
