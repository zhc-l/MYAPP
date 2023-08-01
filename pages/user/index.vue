<template>
    <view class="content">
        <!-- 用户信息 -->
        <view class="userImage">
            <view class="userInfo">
                <view class="image-view"><open-data type="userAvatarUrl" class="url"></open-data></view>
                <view class="name-view"><open-data type="userNickName" class="name"></open-data></view>
            </view>
            <i class="iconfont icon-xiangyou1"></i>
        </view>
        <!-- 用户标签 -->
        <view class="user-card">
            <view class="user-card-item" v-for="(item,index) in userInfo" :key="index">
                <view class="user-card-item-title">{{ item.title }}</view>
                <view class="user-card-item-desc">{{ item.desc }}</view>
            </view>
        </view>
    </view>
</template>
<script>
import UserInfo from '@/components/UserInfo/UserInfo.vue';
export default {
    data() {
        return {
            userInfo: [
                { title: '我的订单', desc: '查看全部订单' },
                { title: '我的订单', desc: '查看全部订单' },
                { title: '我的订单', desc: '查看全部订单' },
            ]
        }
    },
    components: {
        UserInfo
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 1rem;
    padding-right: 1rem;
}

.userImage {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .userInfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .image-view {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            overflow: hidden;

            .url {
                width: 100%;
                height: 100%;
            }
            .name{
                width: 100%;
                height: 100%;
            }
        }

        .name-view {
            flex: 1;
            margin-left: 1rem;
            font-size: 1rem;
            color: #fff;
        }
    }

    .iconfont {
        font-size: 1.5rem;
        color: $--bg;
    }
}
.user-card{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: $--bg;
    border-radius: .5rem;
    margin-top: 1rem;
    .user-card-item{
        padding: .5rem 0;
        color: white;
        .user-card-item-title{
            font-size: 1rem;
            color: #fff;
            margin-bottom: .5rem;
        }
        .user-card-item-desc{
            font-size: .6rem;
            color: #fff;
        }
    }

}
</style> 