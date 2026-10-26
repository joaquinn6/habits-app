import createAxios from "./axiosHttp";

async function wakeUp() {
  const axios = createAxios();
  const urlPath = `awake`;

  try {
    const response = await axios.get(urlPath);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const awakeService = {
  wakeUp,
};
