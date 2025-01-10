<template>
    <div>
        <van-nav-bar title="标题(finishActivity)" left-text="返回" left-arrow @click-left="finishActivity" />
        <div class="tip-text">详情页面</div>
        <div class="tip-text" @click="gotoPage('/details2')">详情页面2</div>

        <div class="div-btn-box">
            <h2>传递参数：</h2>
            {{ JSON.stringify(paramData) }}
        </div>

        <div class="div-btn-box">
            <h2>全部登录信息：</h2>
            {{ JSON.stringify(loginInfo) }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { finishActivity, gotoPage } from '@/utils/app';
let paramData = ref({});
let loginInfo: any = ref({});

// 获取参数
window.getParam = (res: string) => {
    paramData.value = JSON.parse(res);
};

// 获取设备信息
window.getLoginInfo = (res: string) => {
    loginInfo.value = JSON.parse(res);
};

onMounted(() => {
});
</script>
<style lang="scss" scoped>
.tip-text {
    font-size: 30px;
    text-align: center;
    margin-top: 80px;
    word-wrap: break-word;
}
.div-btn-box {
    text-align: center;
    background-color: #cccccc;
    margin: 20px;
    padding: 26px 20px;
    word-wrap: break-word;
}
</style>
