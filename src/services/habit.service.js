import createAxios from "./axiosHttp";

async function getHabit(id) {
  const axios = createAxios();
  const urlPath = `habits/${id}`;
  try {
    const response = await axios.get(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function createHabit(body) {
  const axios = createAxios();
  const urlPath = `/habits`;
  try {
    const response = await axios.post(urlPath, body);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function updateHabit(id, body) {
  const axios = createAxios();
  const urlPath = `habits/${id}`;
  try {
    const response = await axios.put(urlPath, body);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function deleteHabit(id) {
  const axios = createAxios();
  const urlPath = `habits/${id}`;
  try {
    const response = await axios.delete(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getHabits() {
  const axios = createAxios();
  const urlPath = `/habits`;
  try {
    const response = await axios.get(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const habitService = {
  createHabit,
  getHabit,
  getHabits,
  updateHabit,
  deleteHabit,
};
