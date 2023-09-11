<template>
    <!-- select.vue 封装多选&单选 -->
    <u-popup ref="popup" mode="bottom" :show="show" :round="10" @close="close">
        <view class="select">
            <view class="titles">
                <view class="select-remove">
                    <span @click="remove">清空</span>
                </view>
                <view class="select-title">请选择{{dataOption.name}}</view>
                <view class="select-submit">
                    <span @click="SubmitEvent">确定</span>
                </view>
            </view>
            <view class="select-content">
                <view class="select-content-item" v-for="(item,index) in selectList" :key="index" @click="select(item)">
                    <view class="select-content-item-right">{{item.name}}</view>
                    <view class="select-content-item-left">
                        <view class="select-content-item-left-icon" v-if="!multiline" :class="{'select-content-item-left-icon-active':item.active}">
                            <u-icon name="checkmark" size="18" color="#fff" v-if="item.active"></u-icon>
                        </view>
                        <view class="select-content-item-left-icon-multiple" v-else :class="{'select-content-item-left-icon-active':item.active}">
                            <u-icon name="checkmark" size="18" color="#fff" v-if="item.active"></u-icon>
                        </view>
                    </view>
                </view>
            </view>
            <!-- <view class="select-footer">
                <u-button @click="close">取消</u-button>
                <u-button type="primary" @click="SubmitEvent">确定</u-button>
            </view> -->
        </view>
    </u-popup>
</template>
<script>
    export default {
        name: "zSelect",
        props: {
            dataOption: {
                type: Object,
                default: () => ({})
            },
            value: {
                type: String,
                default: () => ''
            },
            multiline: {
                type: Boolean,
                default: false // 是否多选
            }
        },
        watch: {
            dataOption: {
                handler: function (val, oldVal) {
                    this.init();
                },
                deep: true,
                immediate: true
            }
        },
        data() {
            return {
                selectList: [],
                show: false
            }
        },
        methods: {
            init() {
                this.selectList = (this.dataOption.items||[]).map(item => {
                    if (this.multiline) {
                        item.active = this.value.split(',').includes(item.value);
                    } else {
                        item.active = this.value === item.value;
                    }
                    item.name = item.name || item.label;
                    return item;
                });
            },
            select(item) {
                if (this.multiline) {
                    item.active = !item.active;
                } else {
                    this.selectList.forEach(item => {
                        item.active = false;
                    });
                    item.active = true;
                }
                this.selectList = [...this.selectList];
            },
            open() {
                this.init();
                this.show = true;
            },
            close() {
                this.show = false;
            },
            SubmitEvent() {
                let value = this.selectList.filter(item => item.active).map(item => item.value).join(',');
                this.$emit('input',value);
                this.close();
            },
            remove() {
                this.selectList.forEach(item => {
                    item.active = false;
                });
                this.selectList = [...this.selectList];
                this.SubmitEvent()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .select {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .titles{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            justify-content: space-between;
            .select-remove {
                font-size: 28rpx;
                // color: #409eff;
                color: rgb(192, 196, 204);
                white-space: nowrap;
                margin-left: 32rpx;
            }
            .select-title {
                width: 100%;
                height: 100rpx;
                line-height: 100rpx;
                text-align: center;
                font-size: 32rpx;
                color: #333;
                border-bottom: 1px solid #eee;
            }
            .select-submit {
                font-size: 28rpx;
                color: #409eff;
                white-space: nowrap;
                margin-right: 32rpx;
                text-align: end;
            }
        }
       
        .select-content {
            flex: 1;
            overflow: auto;
            padding: 0 32rpx;
            box-sizing: border-box;
            .select-content-item {
                width: 100%;
                height: 100rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20rpx;
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                .select-content-item-left {
                    width: 100rpx;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .select-content-item-left-icon {
                        width: 36rpx;
                        height: 36rpx;
                        border-radius: 50%;
                        border: 1px solid #eee;
                        &-active {
                            background-color: #409eff;
                        }
                    }
                    .select-content-item-left-icon-multiple {
                        width: 36rpx;
                        height: 36rpx;
                        border: 1px solid #eee;
                        &-active {
                            background-color: #409eff;
                        }
                    }
                }
                .select-content-item-right {
                    flex: 1;
                    height: 100%;
                    line-height: 100rpx;
                    text-align: left;
                    font-size: 28rpx;
                    color: #333;
                }
            }
        }
        .select-footer {
            width: 100%;
            height: 100rpx;
            padding: 0 20rpx;
            box-sizing: border-box;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20rpx;
            margin-top: 40rpx;
        }
    }
    
</style>