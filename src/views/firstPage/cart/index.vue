<template>
    <div>
        <div class="tip-text">购物车</div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('home', '/home')">首页</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('message', '/message')">消息</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('details', '/details')">详情</van-button></div>
    </div>
</template>
<script lang="ts" setup>
import { finishAndGoToLogin, goToActivity } from '@/utils/app';
// tab页跳转详情页
const gotodetail = (key: string, webUrl: string) => {
    let params = {
        key: key,
        param: { id: 1, name: '我是【' + key + '】页面带过来的参数' },
        webUrl: webUrl,
        statusBarColor: '#fff',
    };
    goToActivity(params);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.div-btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    background-color: #cccccc;
    margin: 20px;
}
.tip-text {
    font-size: 30px;
    text-align: center;
    margin-top: 80px;
}
</style>
