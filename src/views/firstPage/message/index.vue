<template>
    <div>
        <div class="tip-text">消息</div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('home', '/home')">首页</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('center', '/center')">我的</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('details', '/details')">详情</van-button></div>

        <van-button v-auth="'xx-add'" type="success">新增</van-button>
        <van-button v-auth="'xx-sc'" type="success">删除</van-button>
        <van-button v-auth="'xx-xg'" type="success">修改</van-button>
        <van-button v-auth="'xx-xq'" type="success">详情</van-button>
    </div>
</template>
<script lang="ts" setup>
import { finishAndGoToLogin, goToActivity, gotoPage } from '@/utils/app';
const router = useRouter();

// tab页跳转详情页
const gotodetail = (key: string, webUrl: string) => {
    let params = {
        key: key,
        param: { id: 1 },
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
