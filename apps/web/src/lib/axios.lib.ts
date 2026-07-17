import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

const isDev = process.env.NODE_ENV === 'development'

const randomDelay = () =>
  new Promise((resolve) =>
    setTimeout(resolve, Math.random() * (3000 - 1000) + 1000)
  )

api.interceptors.request.use(async (config) => {
  if (isDev) await randomDelay()
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
