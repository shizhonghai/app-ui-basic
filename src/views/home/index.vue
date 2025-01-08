<template>
    <div>
        <div>我是首页</div>
        <van-button type="primary" @click="clickBack">返回APP首页</van-button>
    </div>
</template>
<script lang="ts" setup>
import { backButtonClick } from '/@/utils/app';

const clickBack = () => {
    backButtonClick();
};

// 获取设备信息
const terminalDeviceInfo = (res: string) => {
    console.log(JSON.parse(res));
};

window.terminalDeviceInfo = terminalDeviceInfo;

onMounted(() => {});
</script>
