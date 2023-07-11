/**
 * 1、getStorageSync
 * 2、setStorageSync
 * 3、removeStorageSync
 * 4、clearStorageSync
 * 5、getStorageInfoSync
 * 6、getStorageInfo
 * 7、getStorage
 * 8、setStorage
 * 9、removeStorage
 * 10、clearStorage
 */
// 获取缓存
export const getStorageSync = key => {
  return uni.getStorageSync(key)
}
// 设置缓存
export const setStorageSync = (key, data) => {
  return uni.setStorageSync(key, data)
}
// 删除缓存
export const removeStorageSync = key => {
  return uni.removeStorageSync(key)
}
// 清空缓存
export const clearStorageSync = () => {
  return uni.clearStorageSync()
}
// 获取缓存信息
export const getStorageInfoSync = () => {
  return uni.getStorageInfoSync()
}
// 获取缓存信息
export const getStorageInfo = () => {
  return uni.getStorageInfo()
}
// 获取缓存信息
export const getStorage = key => {
  return uni.getStorage({
    key: key,
  })
}
// 设置缓存信息
export const setStorage = (key, data) => {
  return uni.setStorage({
    key: key,
    data: data,
  })
}
// 删除缓存信息
export const removeStorage = key => {
  return uni.removeStorage({
    key: key,
  })
}
// 清空缓存信息
export const clearStorage = () => {
  return uni.clearStorage()
}
