/**
 * 1. 在需要更新版本的页面引入该mixin
 * 2. 在页面中调用 this.checkVersion() 即可
 * 3. 该函数会自动检测版本，如果有新版本，会弹出提示框，提示用户更新
 * 4. 如果用户点击更新，会自动下载新版本，并且提示用户安装
 * 5. 如果用户点击忽略，会自动关闭提示框，并且将该版本号存入本地缓存，下次不再提示
 */
import { getStorageSync, setStorageSync } from '@/utils/storage'
import { checkUpdate, downloadUpdate, installUpdate } from '@/utils/updateApp'
let version = '1.0.0'
export default {
  methods: {
    checkVersion() {
      // 检测版本更新
      checkUpdate()
        .then(res => {
          console.log('是否有新版本:', res.hasUpdate)
          if (res.hasUpdate) {
            uni.showModal({
              title: '更新提示',
              content: '检测到新版本，是否下载新版本并重启应用？',
              success: res => {
                if (res.confirm) {
                  // 下载新版本并重启应用
                  downloadUpdate()
                    .then(() => {
                      uni.showToast({
                        title: '下载成功',
                        icon: 'success',
                        duration: 2000,
                      })
                      install
                    })
                    .catch(err => {
                      uni.showToast({
                        title: '下载失败',
                        icon: 'none',
                        duration: 2000,
                      })
                    })
                } else if (res.cancel) {
                  // 用户点击取消，关闭提示框
                  console.log('用户点击忽略')
                  // 将该版本号存入本地缓存
                  setStorageSync('version', res.version)
                }
              },
            })
          }
        })
        .catch(err => {
          console.log('检测更新失败:', err)
        })
    },
  },
}
