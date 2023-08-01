<template>
	<view>
		<!-- 用户信息 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: null
		}
	},
	mounted: function () {
		this.getUserProfile()
	},
	methods: {
		getUserProfile() {
			let that = this
			uni.showModal({
				title: '温馨提示',
				content: '亲，授权微信登录后才能正常使用小程序功能',
				success: function (res) {
					if (res.confirm) {
						uni.getUserProfile({
							desc: '用于完善会员资料',
							success: (res) => {
								console.log(res, ';;;;;;;;;;;;;;')
								that.userInfo = res.userInfo
							},
							fail: (err) => {
								console.log(err)
							}
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});

		}
	}
}
</script>

<style></style>
