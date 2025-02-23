import createAxios from "./axiosHttp";

async function getUserById(idUser) {
  const axios = createAxios();
  const urlPath = `users/${idUser}`;
  try {
    const response = await axios.get(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getUsers(query, paginator) {
  const axios = createAxios();
  const queryParams = new URLSearchParams({
    ...query,
    ...paginator,
  }).toString();
  const urlPath = `users?${queryParams}`;
  try {
    const response = await axios.get(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getUsersReport(query, sort) {
  const axios = createAxios(true);
  const queryParams = new URLSearchParams({ ...query, ...sort }).toString();
  const urlPath = `users/report?${queryParams}`;
  try {
    const response = await axios.get(urlPath, { responseType: "blob" });
    return Promise.resolve({ data: response.data, headers: response.headers });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function createUser(body) {
  const axios = createAxios();
  const urlPath = `/users`;
  try {
    const response = await axios.post(urlPath, body);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function updateUser(id, body) {
  const axios = createAxios();
  const urlPath = `users/${id}`;
  try {
    const response = await axios.put(urlPath, body);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function changePassword(body) {
  const axios = createAxios();
  let user =
    JSON.parse(localStorage.getItem("user")) || sessionStorage.getItem("user");
  const urlPath = `/users/${user._id}/password`;
  try {
    const response = await axios.post(urlPath, body);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function deleteUser(id) {
  const axios = createAxios();
  const urlPath = `users/${id}`;
  try {
    const response = await axios.delete(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function activeUser(id) {
  const axios = createAxios();
  const urlPath = `users/${id}/active`;
  try {
    const response = await axios.put(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const userService = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  activeUser,
  changePassword,
  getUsersReport,
};
