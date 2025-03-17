import createAxios from "./axiosHttp";

async function getStatsByHabit(id, query) {
  const axios = createAxios();
  let urlPath = `habits/${id}/stats`;
  const params = new URLSearchParams(query);
  urlPath += `?${params.toString()}`;
  try {
    const response = await axios.get(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const statsService = {
  getStatsByHabit,
};
