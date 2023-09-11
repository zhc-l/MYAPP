<template>
    <!-- datetimePicker 封装 -->
    <u-datetime-picker
            :show="show"
            v-model="datetime"
            :showToolbar="showToolbar"
            :title="`请选择${title}`"
            :mode="mode"
            :maxDate="maxDate"
            :minDate="minDate"
            :minHour="minHour"
            :maxHour="maxHour"
            :minMinute="minMinute"
            :maxMinute="maxMinute"
            :filter="filter"
            :formatter="formatter"
            :loading="loading"
            :itemHeight="itemHeight"
            :cancelText="cancelText"
            :confirmText="confirmText"
            :cancelColor="cancelColor"
            :confirmColor="confirmColor"
            :visibleItemCount="visibleItemCount"
            :closeOnClickOverlay="closeOnClickOverlay"
            :defaultIndex="defaultIndex"
            @close="close"
            @confirm="confirm"
            @change="change"
            @cancel="cancel"
    ></u-datetime-picker>
</template>
<script>
import moment from 'moment'
export default {
    name: "zDatetimePicker",
    props: {
        value: {
            type: String||Number,
            default: () => ''
        },
        showToolbar: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: '请选择'
        },
        mode: {
            type: String,
            default: 'datetime' // datetime date time year-month
        },
        maxDate: {
            type: Number, // 最大默认值为后10年
            default: () => new Date().getTime() + 365 * 24 * 60 * 60 * 1000 * 10
        },
        minDate: {
            type: Number, // 最大默认值为前10年
            default: () => new Date().getTime() - 365 * 24 * 60 * 60 * 1000 * 10
        },
        minHour: {
            type: Number,
            default: 0
        },
        maxHour: {
            type: Number,
            default: 23
        },
        minMinute: {
            type: Number,
            default: 0
        },
        maxMinute: {
            type: Number,
            default: 59
        },
        filter: {
            type: Function,
            default: () => null
        },
        formatter: {
            type: String,
            default: () => 'YYYY-MM-DD HH:mm:ss',
        },
        loading: {
            type: Boolean,
            default: false
        },
        itemHeight: {
            type: Number,
            default: 44
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        cancelColor: {
            type: String,
            default: '#909193'
        },
        confirmColor: {
            type: String,
            default: '#3c9cff'
        },
        visibleItemCount: {
            type: Number||String,
            default: 5
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        },
        defaultIndex: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            datetime: Number(new Date()),
            show: false
        }
    },
    methods: {
        // 初始化
        init() {
            this.datetime = this.value || Number(new Date());
        },
        // 关闭
        close() {
            this.show = false;
        },
        // 确定
        confirm(e) {
            this.show = false;
            // 格式转换
            if(this.mode === 'date'){
                e.value = moment(e.value).format('YYYY-MM-DD')
            }else if(this.mode === 'time'){
                e.value = moment(e.value).format('HH:mm:ss')
            }else if(this.mode === 'year-month'){
                e.value = moment(e.value).format('YYYY-MM')
            }else{
                e.value = moment(e.value).format('YYYY-MM-DD HH:mm:ss')
            }
            this.$emit('input', e.value);
        },
        // 选择
        change(e) {
            this.$emit('change', e);
        },
        // 取消
        cancel(e) {
            this.show = false;
            this.$emit('cancel', e);
        },
        // 打开
        open() {
            this.init()
            this.show = true;
        }
    }
}
</script>
