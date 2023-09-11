<template>
	<u-upload
        :class="textPosition==='right'?'upload-right':''"
		:fileList="fileList1"
		@afterRead="afterRead"
		@delete="deletePic"
		name="1"
		multiple
        :width="width"
        :height="height"
		:maxCount="2"
	></u-upload>
</template>

<script>
	export default {
        props:{
            textPosition:{
                type: String,
                default: () => 'left'
            },
            width:{
                type: String | Number,
                default: () => '60'
            },
            height:{
                type: String | Number,
                default: () => '60'
            },
        },
		data() {
			return {
				fileList1: [],
			}
		},
		methods:{
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		}

	}
</script>
<style lang="scss">
     .upload-right{
        width: 100%;
        text-align: end;
        ::v-deep .u-upload__wrap{
            width: 100%;
            justify-content: flex-end;
            .u-upload__button,.u-upload__wrap__preview{
                margin-bottom: 4rpx !important;
                margin-top: 4rpx !important;
            }
        }
    }
</style>
