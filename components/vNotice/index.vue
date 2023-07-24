<template>
	<div class="v-notice" ref="vNotice" :style="{height:height}">
		<div class="v-notice-main" ref="notice"  :style="{left:coordinate,height:height}">
			<div class="v-notice-item" v-for="(item, index) in noticeList" :key="index" :ref="`notice${index}`" :id="`notice`+index">
				<div class="v-notice-item-main" :style="{'background-color':isBg,color:color,'border-radius':radius}">
					<image class="v-notice-item-img" :style="{height:imageRpx,width:imageRpx}" :src="item.image" mode="aspectFill"></image>
					<div class="v-notice-item-content">
						<div class="v-notice-item-content-title" v-if="item.title">{{item.title}}</div>
						<div class="v-notice-item-content-desc" v-if="item.desc">{{item.desc}}</div>
					</div>
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
			HZ: 1000/60, // 30帧 兼容大部分手机刷新率
			distance: 0, // 每帧移动距离
			nodeWidth: 0, // 屏幕宽度
			noticeList: [], // 数据
			timer: null, // 定时器
		}
	},
	props: {
		// #ifdef MP || APP-PLUS
			speed: {
				type: Number,
				default: 1
			},
		// #endif
		// #ifdef H5
			speed: {
				type: Number,
				default: 1
			},
		// #endif
		reverse: {
			type: Boolean,
			default: false
		},
		height: {
			type: String,
			default: '60rpx'
		},
		isBg: {
			type: String,
			default: ()=>'#1e295a'
		},
		color: {
			type: String,
			default: ()=>'white'
		},
		radius: {
			type: String,
			default: '80rpx'
		},
		list: {
			type: Array,
			default: () => [
				{
					desc: '而缩略图(Thumbnail)就是其中之一',
					image: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/cat-6.png'
				},
				{
					desc: '显示包括登记略图影像的各类录像目录的输出部',
					image: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/cat-6.png'
				},
				{
					desc: '你还可以看到录制过程中',
					image: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/cat-6.png'
				}
			]
		}
	},
	watch: {
		list: {
			handler(val) {
				this.noticeList = [...val]
			},
			immediate: true,
			deep: true
		}
	},
	computed: {
		imageRpx() {
			return parseFloat(this.height) - parseFloat(this.height)/4 + 'rpx'
		}
	},
	mounted() {
		this.init()
	},
	onHide(){
		this.stop()
	},
	onUnload(){
		this.stop()
	},
	methods: {
		init() {
			this.stop()
			uni.getSystemInfo({
				success: ({screenWidth,screenHeight}) => {
					this.distance = screenWidth/screenHeight * this.speed
					this.getNodeWidth()
				}
			})
		},
		myFunction() {
			let num = parseFloat(this.coordinate)
			if(this.reverse) {
				num += this.distance
			} else {
				num -= this.distance
			}
			this.coordinate = num + 'px'

			if( Math.abs(num) > this.nodeWidth ){ // -1  1
				let dataList = [...this.noticeList]
				let copy = dataList.splice(0,1)
				this.coordinate = '0px'
				dataList = [...dataList,...copy]
				this.stop()
				this.noticeList = [...dataList]
				this.$nextTick(()=>{
					this.getNodeWidth()
				})
			}else{
				// #ifdef H5
					this.start()
				// #endif
			}

		},
		stop() {
			// #ifdef MP || APP-PLUS
				if(this.timer){
					clearInterval(this.timer)
				}
			// #endif
			// #ifdef H5
				cancelAnimationFrame(this.myFunction)
			// #endif
		},
		start() {
			// #ifdef MP || APP-PLUS
				this.timer = setInterval(this.myFunction, this.HZ)
			// #endif
			// #ifdef H5
				window.requestAnimationFrame(this.myFunction) ||
				window.webkitRequestAnimationFrame(this.myFunction) ||
				window.mozRequestAnimationFrame(this.myFunction) ||
				window.oRequestAnimationFrame(this.myFunction) ||
				window.msRequestAnimationFrame(this.myFunction)
			// #endif
		},
		getNodeWidth() {

			// #ifdef MP || APP-PLUS
				uni.createSelectorQuery().in(this).select('#notice0').boundingClientRect((data) => {
					this.nodeWidth = data.width
					this.start()
				}).exec()
			// #endif 

			// #ifdef H5
				this.nodeWidth = this.$refs[`notice0`][0].offsetWidth
				this.start()
			// #endif

		},
		handleClick(item, index) {
			uni.navigateTo({
				url: item.url
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.v-notice {
	width: 100%;
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
		justify-content: center;
		.v-notice-item {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			white-space:nowrap;
			padding-left: 50rpx;
			.v-notice-item-main{
				display: flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				white-space:nowrap;
				padding: 10rpx 30rpx;
			}
			.v-notice-item-img {
				margin-right: 20rpx;
				border-radius: 50%;
			}
			.v-notice-item-content {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.v-notice-item-content-title {
					font-size: 30rpx;
					letter-spacing: 3rpx;
				}
				.v-notice-item-content-desc {
					font-size: 30rpx;
					letter-spacing: 3rpx;
				}
			}
		}
	}
}
</style>