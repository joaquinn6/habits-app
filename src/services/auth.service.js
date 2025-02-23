import createAxios from './axiosHttp'

async function loginRequest(body) {
  const axios = createAxios()
  const urlPath = `login`

  try {
    const response = await axios.post(urlPath, body)
    localStorage.setItem('user', JSON.stringify(response.data))
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const authService = {
  loginRequest,
}
