<script>
 	import { mapState } from 'vuex'
	import vNotice from '@/components/vNotice/index.vue'
	export default {
		computed: {
			...mapState('version',['downloadProgress','isProgress'])
		},
		components: {
			vNotice
		},
		data(){
			return {
				show: false,
				noticeList: null
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.$http.get('/users').then(res=>{
				console.log(res,'0000000000')
			})
			// 下载进度条
			if(this.isProgress){
				this.$refs.popup.open('center')
			}
		},
		onHide: function() {
			console.log('App Hide')
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
	</view>
</template>
<style lang="scss">
.notice{
	width: 100%;
	height: 80rpx;
}
</style>
