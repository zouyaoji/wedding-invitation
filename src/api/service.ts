/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-12-14 22:34:46
 * @LastEditTime: 2023-01-17 10:14:43
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\api\service.ts
 */
import Request from 'luch-request'
import * as loading from './loading'
const http = new Request()

http.setConfig(config => {
  /* 设置全局配置 */
  config.baseURL = import.meta.env.VITE_VUE_APP_API as string
  config.header = {
    ...config.header,
    mpname: import.meta.env.VITE_VUE_APP_NAME as string
  }
  config.timeout = 20000
  config.custom = {
    loading: true,
    auth: true
  }
  return config
})

http.interceptors.request.use(
  config => {
    loading.show(config)
    config.header = {
      ...config.header
    }
    return config
  },
  config => {
    return Promise.reject(config)
  }
)

http.interceptors.response.use(
  response => {
    /* 对响应成功做点什么 可使用async await 做异步操作*/
    //  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    //    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
    // if (response.config.custom.verification) { // 演示自定义参数的作用
    //   return response.data
    // }
    loading.hide(response.config)
    const data = response.data
    const { code } = data
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这是非约定返回 或者不是项目后端开发的接口
      return data
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          // return dataAxios.data
          return data
        case 200:
          // [ 示例 ] code === 0 代表没有错误
          // return dataAxios.data
          return data
        default:
          // 不是正确的 code
          uni.showToast({
            title: `请求遇到错误： ${data.msg}: ${response.config.url}`,
            duration: 3000
          })
          return Promise.reject(data)
      }
    }
  },
  error => {
    /*  对响应错误做点什么 （statusCode !== 200）*/
    console.log(error)
    return Promise.reject(error)
  }
)
export { http }
