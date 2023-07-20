/** 
 * 1. checkUpdate: 检测版本更新
 * 2. downloadUpdate: 下载新版本
 * 3. installUpdate: 安装新版本
 * 4. compareVersion: 比较版本号
 * 5. 下载进度监听 存储到vuex
 */
let version = '1.0.0'
//获取服务器版本号url
let versionHttp = 'http://localhost:3000/api/version'

// 检测版本更新
export const checkUpdate = () => {
	return new Promise((resolve, reject) => {
	// #ifdef APP-PLUS
	// 获取当前运行环境的应用信息
	plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
	  // 获取本地应用资源版本号
	  let localVersion =
	    widgetInfo.version || (widgetInfo.widget ? widgetInfo.widget.version : '')
		// 获取服务器应用资源版本号
		uni.request({
			url: versionHttp,
			success: (res) => {
				let serverVersion = res.data.version
				// 本地资源版本号和服务器资源版本号对比
				let hasUpdate = compareVersion(localVersion, serverVersion)
				resolve({ hasUpdate, serverVersion })
			},
			fail: (err) => {
				this.$store.dispatch('version/setIsProgress', false)
				reject(err)
			},
		})
	})
	// #endif
	// #ifndef APP-PLUS
	resolve({ hasUpdate: false })
	// #endif
	  })
	}

	// 下载新版本
	export const downloadUpdate = () => {
		return new Promise((resolve, reject) => {
			// #ifdef APP-PLUS
			// 获取当前运行环境的应用信息
			plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
				// 获取本地应用资源版本号
				let localVersion = widgetInfo.version || (widgetInfo.widget ? widgetInfo.widget.version : '')
				// 获取服务器应用资源版本号
				uni.request({
					url: versionHttp,
					success: (res) => {
						let serverVersion = res.data.version
						// 本地资源版本号和服务器资源版本号对比
						let hasUpdate = compareVersion(localVersion, serverVersion)
						if (hasUpdate) {
							// uni.downloadFile 下载文件资源到本地
							let progress = uni.downloadFile({
								url: res.data.downloadApkUrl,
								success: (downloadResult) => {
									if (downloadResult.statusCode === 200) {
										// 下载成功
										// uni.saveFile 保存文件到本地
										uni.saveFile({
											tempFilePath: downloadResult.tempFilePath,
											success: (saveResult) => {
												// 保存成功
												plus.runtime.install(saveResult.savedFilePath, {
													force: false,
												})
												resolve()
											},
											fail: (err) => {
												this.$store.dispatch('version/setIsProgress', false)
												reject(err)
											},
										})
									}else{
										this.$store.dispatch('version/setIsProgress', false)
									}
								},
								fail: (err) => {
									this.$store.dispatch('version/setIsProgress', false)
									reject(err)
								},
							})
							// 监听下载进度
							progress.onProgressUpdate((progressRes) => {
								// vuex存储下载进度
								this.$store.dispatch('version/setDownloadProgress', progressRes.progress)
								this.$store.dispatch('version/setIsProgress', true)
							})
						}
					},
					fail: (err) => {
						this.$store.dispatch('version/setIsProgress', false)
						reject(err)
					},
				})
			})
			// #endif
			// #ifndef APP-PLUS
			resolve()
			// #endif
		})
	}

	// 安装新版本
	export const installUpdate = () => {
		// #ifdef APP-PLUS
		plus.runtime.restart()
		// #endif
	}

	// 比较版本号
	const compareVersion = (localVersion, serverVersion) => {
		// 本地版本号和服务器版本号都不能为空
		if (localVersion && serverVersion) {
			// 本地版本号和服务器版本号都为三位数，如 1.0.0
			if (
				localVersion.split('.').length === 3 &&
				serverVersion.split('.').length === 3
			) {
				// 本地版本号和服务器版本号都为三位数，如 1.0.0
				if (localVersion === serverVersion) {
					// 本地版本号和服务器版本号相等，不需要更新
					return false
				} else {
					// 本地版本号和服务器版本号不相等，需要更新
					return true
				}
			} else {
				// 本地版本号和服务器版本号不都为三位数，如 1.0 或
				// 本地版本号和服务器版本号不相等，需要更新
				return true
			}
		} else {
			// 本地版本号和服务器版本号为空，不需要更新
			return false
		}
	}

