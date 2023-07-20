<template>
	<div class="v-notice">
		<div class="v-notice-main" :style="{left:coordinate}">
			<div class="v-notice-item" v-for="(item, index) in noticeList" :key="index">
				<image class="v-notice-item-img" :src="item.image" mode="aspectFill"></image>
				<div class="v-notice-item-content">
					<div class="v-notice-item-content-title">{{item.title}}</div>
					<div class="v-notice-item-content-desc">{{item.desc}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			coordinate: '0px',
			totalWidth: 0
		}
	},
	props: {
		noticeList: {
			type: Array,
			default: () => [
				{
					title: '标题',
					desc: '描述',
					btnText: '按钮文字',
					image: 'https://img.yzcdn.cn/vant/apple-1.jpg'
				},
				{
					title: '标题',
					desc: '描述',
					btnText: '按钮文字',
					image: 'https://img.yzcdn.cn/vant/apple-2.jpg'
				},
				{
					title: '标题',
					desc: '描述',
					btnText: '按钮文字',
					image: 'https://img.yzcdn.cn/vant/apple-3.jpg'
				}
			]
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			let HZ = 1000/120; // 120帧
			let left = 0;
			uni.getSystemInfo({
				success: ({windowWidth}) => {
					left = windowWidth / 480
					this.totalWidth = this.noticeList.length * windowWidth
					let timer = setInterval(() => {
						this.totalWidth -= left;
						this.coordinate = this.totalWidth + 'px'
						// if(this.totalWidth <= parseInt(this.coordinate)){
						// 	clearInterval(timer)
						// }
					}, HZ)
				}
			})
		},
		handleClick(item, index) {
			uni.navigateTo({
				url: item.url
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.v-notice {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: relative;
	.v-notice-main {
		position: absolute;
		width: auto;
		display: flex;
		align-items: center;
		
		.v-notice-item {
			width: 100vw;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.v-notice-item-img {
				width: 30%;
				height: 100%;
				border-radius: 10rpx;
			}
			.v-notice-item-content {
				width: 70%;
				height: 100%;
				display: flex;
				justify-content: center;
				.v-notice-item-content-title {
					font-size: 30rpx;
					color: #000;
				}
				.v-notice-item-content-desc {
					font-size: 26rpx;
					color: #666;
				}
			}
		}
	}
}
</style>