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
	/*每个页面公共css */
</style>
