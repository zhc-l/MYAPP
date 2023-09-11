<template>
	<view class="uForm" v-if="config">
		<u-form v-model="form" ref="uForm" :rules="config.rules" :labelWidth="config.labelWidth">
			<template v-for="(item,index) in config.items">
				<u-form-item
					:label="item.name||item.label"
					:prop="form[item.field]"
					:border-bottom="item.borderBottom || true"
					:label-width="item.labelWidth || config.labelWidth"
					:label-position="item.type=='textarea'?'top':config.labelPosition"
					@click.native="onClick(item)"
				>
					<u-input 
						v-if="!item.type || item.type == 'input' || item.type == 'number' || item.type == 'password'" 
						:type="item.type"
						:disabled="item.type === 'select'"
						v-model="form[item.field]"
						:placeholder="getPlaceholder(item)" 
						:class="config.textPosition==='right'?'text-right':''" 
					/>


					<!-- select 多选&单选 -->
					<view v-else-if="item.type == 'select' || item.type == 'date' || item.type == 'datetime' || item.type == 'year-month' || item.type == 'time'" class="w-100">
						<view v-if="form[item.field] && item.type == 'select'" class="flex" :class="config.textPosition==='right'?'flex-end':''">
							<view v-if="form[item.field].split(',').includes(selectItem.value)" v-for="(selectItem,selectIndex) in item.items" :key="selectIndex" :class="{'multiline':item.multiline}">{{selectItem.name}}</view>
						</view>
						<view v-else-if="form[item.field] && item.type !== 'select'" class="flex" :class="config.textPosition==='right'?'flex-end':''">
							<view :class="{'multiline':item.multiline}">{{form[item.field]}}</view>
						</view>
						<view v-else class="color-999">{{getPlaceholder(item)}}</view>
					</view>

					<u-input
						v-else-if="item.type !== 'upload' && item.type !== 'textarea'"
						disabled
						disabledColor="rgba(0,0,0,0)"
						v-model="form[item.field]"
						:placeholder="getPlaceholder(item)"
						:class="config.textPosition==='right'?'text-right':''"
					></u-input>

					<!-- 上传 -->
					<view v-else-if="item.type == 'upload'" class="w-100">
						<f-upload
							:textPosition="config.textPosition"
							:name="item.field"
							:ref="item.field"
							:fileList="form[item.field]"
							@afterRead="afterRead"
							@delete="deleteFile"
						/>
					</view>

					<!-- 文本域 -->
					<u--textarea
						v-else-if="item.type == 'textarea'"
						:value="form[item.field]"
						:placeholder="getPlaceholder(item)"
						:autosize="item.autosize || true"
					/>

					<u-icon
						v-if="item.type && item.type !=='input' && item.type !=='textarea' && item.type !=='number' && item.type !=='password' && item.type !=='upload'"
						slot="right"
						name="arrow-right"
					></u-icon>

				</u-form-item>

				<!-- 单选&多选 -->
				<f-select v-if="item.type == 'select'" :multiline="item.multiline" :ref="item.field" :dataOption="item" v-model="form[item.field]" @input="(e)=>handleInput(e,item)"></f-select>

				<!-- 时间选择 -->
				<f-date-picker 
					v-else-if="item.type == 'datetime' || item.type == 'date' || item.type == 'year-month'" 
					:ref="item.field" 
					v-model="form[item.field]"
					:showToolbar="item.showToolbar"
					:title="item.name||item.label"
					:mode="item.type"
					:maxDate="item.maxDate || new Date().getTime() + 365 * 24 * 60 * 60 * 1000 * 10"
					:minDate="item.minDate || new Date().getTime() - 365 * 24 * 60 * 60 * 1000 * 10"
					:minHour="item.minHour || 0"
					:maxHour="item.maxHour || 23"
					:minMinute="item.minMinute || 0"
					:maxMinute="item.maxMinute || 59"
					:filter="item.filter || null"
					:formatter="item.formatter ||  null"
					:loading="item.loading || false"
					:itemHeight="item.itemHeight || 44"
					:cancelText="item.cancelText || '取消'"
					:confirmText="item.confirmText || '确定'"
					:cancelColor="item.cancelColor || '#909193'"
					:confirmColor="item.confirmColor || '#007aff'"
					:visibleItemCount="item.visibleItemCount || 5"
					:closeOnClickOverlay="item.closeOnClickOverlay || true"
					:defaultIndex="item.defaultIndex || []"
					@input="(e)=>handleInput(e,item)"
				/>

			</template>
		</u-form>

	</view>
</template>

<script>
	import { defaultOption, defaultPicker } from "./utils.js";
	import fSelect from "@/components/Form/Select.vue"; 
	import fUpload from "@/components/Form/Upload.vue";
	import fDatePicker from "@/components/Form/DatePicker.vue";
	export default {
		name:"Layout",
		components:{
			fSelect,
			fUpload,
			fDatePicker
		},
		data() {
			return {
				config:{},
				form:{},
			};
		},
		props:{
			settings:{
				type:Object,
				default:()=>({})
			}
		},
		watch:{
			form:{
				handler(val){
					this.$emit("input",val);
				},
				deep:true
			}
		},
		mounted() {
			this.init();
		},
		methods:{
			handleInput(e,item){
				this.$set(this.form,item.field,e);
				this.form = Object.assign({},this.form);
			},
			init(){
				this.config = Object.assign({},defaultOption,this.settings);
				console.log(this.config);
				this.initForm();
			},
			initForm(){
				this.form = {};
				this.config.items.forEach(item=>{
					this.form[item.field] = this.getDefult(item.default);
				});
			},
			setForm(form){
				this.config.items.forEach(item=>{
					this.form[item.field] = this.getFieldValue(form,item)
				});
			},
			getFieldValue(form,item){
				if(item.field.indexOf(".") !== -1){
					let arr = item.field.split(".");
					let value = form;
					arr.forEach(key=>{
						value = value[key];
					});
					return value;
				}else{
					return form[item.field];
				}
			},
			getDefult(value){
				if(typeof value === "function"){
					return value();
				}
				return value === undefined ? '' : value;
			},
			validate(){
				return new Promise((resolve,reject)=>{
					this.$refs.uForm.validate((valid)=>{
						if(valid){
							resolve(this.form);
						}else{
							reject();
						}
					});
				});
			},
			getPlaceholder(item){
				if(item.placeholder){
					return item.placeholder;
				}else if(item.type === "input" || item.type === "textarea" || item.type === "number" || item.type === "password" || !item.type){
					return `请输入${item.name||item.label}`;
				}else{
					return `请选择${item.name||item.label}`;
				}
			},
			onClick(data){
				if(data.type == "select" || data.type == "datetime" || data.type == "date" || data.type == "year-month"){
					this.$refs[data.field][0]?.open();
				}
			},
		}

	}
</script>

<style lang="scss" scoped>
.uForm{
	padding: 32rpx;
}
.text-right{
	text-align: right;
	.input-placeholder{
		text-align: right;
	}
	::v-deep .uni-input-input{
		text-align: end;
	}
}
.color-999{
	width: 100%;
    color: grey;
    overflow: hidden;
    text-overflow: clip;
    white-space: pre;
    word-break: keep-all;
    pointer-events: none;
    line-height: inherit;
	color: rgb(192, 196, 204);
 	font-size: 30rpx;
	overflow: hidden;
	padding-right: 4rpx;
	text-align: right;
}
.w-100{
	width: 100%;
}
.flex{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}
.flex-end{
	justify-content: flex-end;
}
.multiline{
	display: inline-block;
	padding: 4rpx 8rpx;
	margin: 0rpx 4rpx 0rpx 0rpx;
	border-radius: 4rpx;
	background-color: #f5f5f5;

}


</style>