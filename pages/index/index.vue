<script>
 	import { mapState } from 'vuex'
	import vNotice from '@/components/vNotice/index.vue'
	export default {
		computed: {
			...mapState('version',['downloadProgress','isProgress'])
		},
		components: {
			vNotice,
		},
		data(){
			return {
				show: false,
				noticeList: null,
				position: {
					name: '北京市海淀区中关村软件园',
					longitude: 116.307484,
					latitude: 40.057939
				},
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			// 下载进度条
			if(this.isProgress){
				this.$refs.popup.open('center')
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			openLive(){
				uni.navigateTo({
					url: '/pages/live-pusher/live-pusher'
				})
			},
			launchAppError(err){
				console.log(err)
			},
			onchooseavatar(e){
				console.log(e)
				// 上传图片   接口：https://ren.22.com/api/common/upload
				// 上传参数：file
				// 返回参数：url
				uni.uploadFile({
					url: 'https://ren.22.com/api/common/upload',
					filePath: e.detail.avatarUrl,
					name: 'file',
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
					}
				});
			},
			handleOpen() {
				let that = this
				uni.showActionSheet({
					itemList: ['高德地图', '百度地图', '腾讯地图'],
					success: function(res) {
						that.guide(res.tapIndex)
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			guide(signMap) {
				uni.showLoading({
					title: '跳转中'
				});
				let {
					position
				} = this;
				if (position.name && position.name != '') {
					//地点位置position.name 地点经纬度lng lat
					var lng = position.longitude;
					var lat = position.latitude;
					if (signMap == 0) {
						// 高德地图
						uni.getSystemInfo({
							success: (res) => {
								if (res.platform === "android") {
									window.location.href =
										"androidamap://viewMap?sourceApplication=appname&poiname=" + position
										.name + "&lat=" + lat + "&lon=" + lng + "&dev=0";
									//判断是否跳转
									setTimeout(function() {
										let hidden = window.document.hidden || window.document
											.mozHidden || window.document.msHidden || window.document
											.webkitHidden
										if (typeof hidden == "undefined" || hidden == false) {
											//调用高德地图
											window.location.href =
												"https://uri.amap.com/marker?position=" + lng + "," +
												lat + "&name=" + position.name;
										}
									}, 2000);
								} else {
									window.location.href =
										"iosamap://viewMap?sourceApplication=appname&poiname=" + position
										.name + "&lat=" + lat + "&lon=" + lng + "&dev=0";
									//判断是否跳转
									setTimeout(function() {
										let hidden = window.document.hidden || window.document
											.mozHidden || window.document.msHidden || window.document
											.webkitHidden
										if (typeof hidden == "undefined" || hidden == false) {
											//调用高德地图
											window.location.href =
												"https://uri.amap.com/marker?position=" + lng + "," +
												lat + "&name=" + position.name;
										}
									}, 2000);
								}
							}
						})
					} else if (signMap == 1) {
						// 百度地图
						uni.getSystemInfo({
							success: (res) => {
								if (res.platform === "android") {
									let d = new Date();
									let t0 = d.getTime();
									window.location.href =
										"androidamap://viewMap?sourceApplication=appname&poiname=" + position
										.name + "&lat=" + lat + "&lon=" + lng + "&dev=0";
									//由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
									var delay = setInterval(function() {
										var d = new Date();
										var t1 = d.getTime();
										if (t1 - t0 < 3000 && t1 - t0 > 2000) {
											window.location.href =
												"http://api.map.baidu.com/marker?location=" + lat +
												"," + lng + "&title=" + position.name +
												"&content=地点&output=html&src=webapp.baidu.openAPIdemo";
										}
										if (t1 - t0 >= 3000) {
											clearInterval(delay);
										}
									}, 1000);
								} else {
									let d = new Date();
									let t0 = d.getTime();
									window.location.href =
										"iosamap://viewMap?sourceApplication=appname&poiname=" + position
										.name + "&lat=" + lat + "&lon=" + lng + "&dev=0";
									//由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
									let delay = setInterval(function() {
										var d = new Date();
										var t1 = d.getTime();
										if (t1 - t0 < 3000 && t1 - t0 > 2000) {
											window.location.href =
												"http://api.map.baidu.com/marker?location=" + lat +
												"," + lng + "&title=" + position.name +
												"&content=地点&output=html&src=webapp.baidu.openAPIdemo";
										}
										if (t1 - t0 >= 3000) {
											clearInterval(delay);
										}
									}, 1000);
								}
							}
						})
					} else {
						// 腾讯地图
						uni.getSystemInfo({
							success: (res) => {
								if (res.platform === "android") {
									window.location.href =
										"androidamap://viewMap?sourceApplication=appname&poiname=" + position
										.name + "&lat=" + lat + "&lon=" + lng + "&dev=0";
									//判断是否跳转
									setTimeout(function() {
										let hidden = window.document.hidden || window.document
											.mozHidden || window.document.msHidden || window.document
											.webkitHidden
										if (typeof hidden == "undefined" || hidden == false) {
											//调用腾讯地图
											window.location.href =
												`https://apis.map.qq.com/uri/v1/marker?marker=coord:(${lat},${lng})&addr:${position.name}`
										}
									}, 2000);
								} else {
									window.location.href =
										"iosamap://viewMap?sourceApplication=appname&poiname=" + position
										.name + "&lat=" + lat + "&lon=" + lng + "&dev=0";
									//判断是否跳转
									setTimeout(function() {
										let hidden = window.document.hidden || window.document
											.mozHidden || window.document.msHidden || window.document
											.webkitHidden
										if (typeof hidden == "undefined" || hidden == false) {
											//调用高德地图
											window.location.href =
												`https://apis.map.qq.com/uri/v1/marker?marker=coord:(${lat},${lng})&addr:${position.name}`
										}
									}, 2000);
								}
							}
						})
					}
				} else {
					uni.showToast({
						title: '暂不知道该地点位置',
						icon: 'none',
						duration: 2000,
					});
				}
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
			},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.card_box{
		width: 80vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
		.uni-progress{
			width: 100%;
			margin-top: 20rpx;
		}
	}
</style>

<template>
	<view>
		<view class="notice">
			<v-notice></v-notice>
		</view>

		<uni-popup ref="popup" type="top" :mask-click="false">
			<view class="card_box">
				下载中...{{downloadProgress}}%
				<progress :percent="downloadProgress" stroke-width="10" />
			</view>
		</uni-popup>

		<button @click="$navTo('/pages/user/index')">跳转用户层</button>

		<button open-type="launchApp" app-packagename="com.tencent.qq" app-bundleid="com.tencent.qq" app-connect-id="101010101" binderror="launchAppError">
		  打开APP
		</button>

		<button @click="$navTo('/pages/form/index')">
		  Form
		</button>

		<!-- 获取微信头像 -->
		<button open-type="chooseAvatar" @chooseavatar="onchooseavatar">
		  获取微信头像
		</button>

		<!-- 地图导航 -->
		<button @click="handleOpen">
		  地图导航
		</button>
		
		<!-- 直播 -->
		<button @click="openLive">
		  直播
		</button>

	</view>
</template>
<style lang="scss">
.notice{
	width: 100%;
	height: 80rpx;
}
button{
	margin-bottom: 1rem;
}
</style>
