export const http = {
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
