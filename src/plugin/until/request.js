import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { AJAX_BASE_URL, AJAX_TIME } from '@/config/index'

// 创建一个axios的对象
const instance = axios.create({
  baseURL: AJAX_BASE_URL, // baseURL会在发送请求的时候拼接url参数前面
  timeout: AJAX_TIME
})

// 请求拦截
// 所有的网络请求都会先走这个方法
instance.interceptors.request.use(
  function (config) {
    const { url, method, params, data } = config
    console.log(`${method}了${url}`, method === 'get' ? params : data)
    Nprogress.start()
    return config
  },
  function (err) {
    console.log('失败请求，错误为', err.message)
    Nprogress.done()
    return Promise.reject(err)
  }
)

// 响应拦截
// 所有的网络请求返回数据之后都会先执行此方法
instance.interceptors.response.use(
  function (response) {
    // console.log('响应成功', response)
    Nprogress.done()
    return response
  },
  function (err) {
    Nprogress.done()
    // console.log('响应失败，错误为', err.message)
    return Promise.reject(err)
  }
)

export async function $get(url, params) {
  const { data } = await instance.get(url, { params })
  return data
}

export async function $post(url, params) {
  const { data } = await instance.post(url, params)
  return data
}

export default instance
