import createAxios from "./axiosHttp";

async function getMarksByUser(query) {
  const axios = createAxios();
  let urlPath = `/marks`;
  const params = new URLSearchParams(query);
  urlPath += `?${params.toString()}`;
  try {
    const response = await axios.get(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getMarksByHabit(id, query) {
  const axios = createAxios();
  let urlPath = `habits/${id}/marks`;
  const params = new URLSearchParams(query);
  urlPath += `?${params.toString()}`;
  try {
    const response = await axios.get(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function createMark(idHabit, body) {
  const axios = createAxios();
  const urlPath = `habits/${idHabit}/marks`;
  try {
    const response = await axios.post(urlPath, body);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function updateMark(id, body) {
  const axios = createAxios();
  const urlPath = `marks/${id}`;
  try {
    const response = await axios.put(urlPath, body);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function deleteMark(id) {
  const axios = createAxios();
  const urlPath = `marks/${id}`;
  try {
    const response = await axios.delete(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const markService = {
  createMark,
  getMarksByUser,
  updateMark,
  deleteMark,
  getMarksByHabit,
};
