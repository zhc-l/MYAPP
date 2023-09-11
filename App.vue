<script>
	import version from '@/utils/version.js'
	export default {
		mixins: [version],
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.checkVersion()
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("~@/static/iconFont/index.scss");
	@font-face {
		font-family: "pingfang";
		src: url("./static/iconFont/pingfang.ttf") format("truetype");
	}
	/*每个页面公共css */
	page{
		/* background-color: #2B2E4A; */
		font-family: pingfang;
	}
</style>
