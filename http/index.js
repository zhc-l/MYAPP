const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000'
export default {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: 'GET',
        data: params,
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        },
      })
    })
  },
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: 'POST',
        data: params,
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        },
      })
    })
  },
  put: (url, params) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: 'PUT',
        data: params,
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        },
      })
    })
  },
  delete: (url, params) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: 'DELETE',
        data: params,
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        },
      })
    })
  },
}
// 请求拦截器 用于请求前和响应后做一些处理
uni.addInterceptor('request', {
  invoke: args => {
    args.url = baseUrl + args.url
  },
  success: res => {
    return getStatusType(res)
  },
})
const getStatusType = res => {
  const status = res.statusCode
  let message = ''
  switch (status) {
    case 200:
      message = '请求成功'
      break
    case 400:
      message = '请求错误'
      break
    case 401:
      message = '未授权，请登录'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = `请求地址出错: ${res.url}`
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '服务器内部错误'
      break
    case 501:
      message = '服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = 'HTTP版本不受支持'
      break
    default:
      message = '请求失败'
  }
  if (status !== 200) {
    uni.showToast({
      title: message,
      icon: 'none',
      duration: 2000,
    })
  }
  return res.data
}
