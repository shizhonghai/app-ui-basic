<template>
    <div>
        <div class="tip-text">我的</div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('home:app', '/home')">首页</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('message:app', '/message')">消息</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('details', '/details')">详情</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="finishAndGoToLogin">退出登录(finishAndGoToLogin)</van-button></div>

        <div>按钮权限</div>
        <van-button v-auth="'wd-add'" type="success">新增</van-button>
        <van-button v-auth="'wd-sc'" type="success">删除</van-button>
        <van-button v-auth="'wd-xg'" type="success">修改</van-button>
        <van-button v-auth="'wd-xq'" type="success">详情</van-button>
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
