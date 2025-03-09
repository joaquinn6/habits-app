import createAxios from "./axiosHttp";

async function getUser() {
  const axios = createAxios();
  let user = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user")
  );
  const urlPath = `users/${user.id}`;
  try {
    const response = await axios.get(urlPath);
    return Promise.resolve(response.data);
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

async function updateUser(body) {
  const axios = createAxios();
  let user = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user")
  );
  const urlPath = `users/${user.id}`;
  try {
    const response = await axios.put(urlPath, body);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function changePassword(body) {
  const axios = createAxios();
  let user = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user")
  );
  const urlPath = `/users/${user.id}/password`;
  try {
    const response = await axios.post(urlPath, body);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function deleteUser() {
  const axios = createAxios();
  const urlPath = `users`;
  try {
    const response = await axios.delete(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const userService = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
};
