import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios'

class Server {
  instance: AxiosInstance
  constructor(a: AxiosRequestConfig) {
    this.instance = axios.create(a)

    // 添加请求拦截器
    this.instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    this.instance.interceptors.response.use(
      function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response
      },
      function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error)
      }
    )
  }
  get(url: string, params = {}) {
    return this.instance.get(url, { params })
  }
  post(url: string, data = {}) {
    return this.instance.post(url, data)
  }
}

export default new Server({
  baseURL: '',
  timeout: 1000 * 36
})
