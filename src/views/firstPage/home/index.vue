<template>
    <div>
        <div class="tip-text">首页</div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('message:app', '/message')">消息(goToActivity)</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('center:app', '/center')">我的(goToActivity)</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="gotodetail('details', '/details')">详情(goToActivity)</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="reloadViewApp">刷新页面(reloadView)</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="setMenuParamInfoApp">更新底部菜单信息(setMenuParamInfo)</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="getLoginInfoApp">获取登录返回信息(getLoginInfo)</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="setUserInfoApp">设置用户信息(setUserInfo)</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="setDeviceInfoApp">设置设备信息(setDeviceInfo)</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="sendSocketApp">发送socket指令(sendSocket)</van-button></div>
        <div class="div-btn-box"><van-button type="primary" @click="getAppVersionNameApp">获取APP版本号(getAppVersionName)</van-button></div>

        <div class="div-btn-box">
            <h2>收到socket信息：</h2>
            {{ JSON.stringify(content) }}
        </div>
        <div class="div-btn-box">
            <h2>用户信息</h2>
            {{ JSON.stringify(loginInfo.userInfo) }}
        </div>
        <div class="div-btn-box">
            <h2>设备信息</h2>
            {{ JSON.stringify(loginInfo.deviceInfo) }}
        </div>
        <div class="div-btn-box">
            <h2>全部登录信息：</h2>
            {{ JSON.stringify(loginInfo) }}
        </div>
        <div class="div-btn-box">
            <h2>APP版本号信息：</h2>
            {{ versionName }}
        </div>

        <div>按钮权限</div>
        <van-button v-auth="'sy-add'" type="success">新增</van-button>
        <van-button v-auth="'sy-sc'" type="success">删除</van-button>
        <van-button v-auth="'sy-xg'" type="success">修改</van-button>
        <van-button v-auth="'sy-xq'" type="success">详情</van-button>
    </div>
</template>
<script lang="ts" setup>
import { goToActivity, reloadView, setUserInfo, setDeviceInfo, setMenuParamInfo, sendSocket, getAppVersionName } from '@/utils/app';
import { setWebUrl } from '@/utils/index';
import { getRandomInt } from '@/utils/index';
let loginInfo: any = ref({});
let content: any = ref('');
let versionName: any = ref('');
import { Local } from '@/utils/storage';

// 获取设备信息
let getLoginInfoApp = (res: string) => {
    loginInfo.value = JSON.parse(res);
};
window.getLoginInfo = getLoginInfoApp;

// 接收socket信息
window.receiveSocketInfo = (res: string) => {
    content.value = JSON.parse(res);
};

// 设置用户信息
const setUserInfoApp = () => {
    loginInfo.value.userInfo.userName = '苹果手机' + getRandomInt(1, 100);
    loginInfo.value.userInfo.phoneNumber = getRandomInt(13800000000, 13899999999);
    setUserInfo(loginInfo.value.userInfo);
};

// 设置设备信息
const setDeviceInfoApp = () => {
    loginInfo.value.deviceInfo.projectName = '小米手机xx' + getRandomInt(1, 100);
    loginInfo.value.deviceInfo.addressIp = '我是xxIp' + getRandomInt(13800000000, 13899999999);
    setDeviceInfo(loginInfo.value.deviceInfo);
};

// 发送socket指令
const sendSocketApp = () => {
    sendSocket({
        cmd: 'CMD_TEST',
        paramContent: '测试sendSocket发生指令：' + getRandomInt(13800000000, 13899999999), // 必填
    });
};

// 触发获取app版本号
const getAppVersionNameApp = () => {
    getAppVersionName();
};

const appVersionName = (res: string) => {
    versionName.value = res;
};
window.appVersionName = appVersionName;

// 刷新页面，调用次方法刷新整体页面
const reloadViewApp = () => {
    reloadView();
};

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

// 设置底部菜单参数信息
let menu = [
    {
        showIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        unShowIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
        title: '首页',
        key: 'home',
        showTitleColor: '#111111',
        unShowTitleColor: '#1989fa',
        webUrl: setWebUrl('/home'),
    },
    {
        showIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        unShowIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
        title: '消息',
        key: 'message',
        showTitleColor: '#111111',
        unShowTitleColor: '#1989fa',
        webUrl: setWebUrl('/message'),
    },
    {
        showIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        unShowIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
        title: '我的',
        key: 'center',
        showTitleColor: '#111111',
        unShowTitleColor: '#1989fa',
        webUrl: setWebUrl('/center'),
    },
];

// 通知APP 更新底部菜单信息
const setMenuParamInfoApp = () => {
    menu[0].title = menu[0].title + getRandomInt(1, 10);
    menu[1].title = menu[1].title + getRandomInt(1, 10);
    menu[2].title = menu[2].title + getRandomInt(1, 10);
    setMenuParamInfo(menu);
};

onMounted(() => {});
</script>
<style lang="scss" scoped>
.div-btn-box {
    text-align: center;
    background-color: #cccccc;
    margin: 20px;
    padding: 26px 20px;
    word-wrap: break-word;
}
.tip-text {
    font-size: 30px;
    text-align: center;
    margin-top: 80px;
}
</style>
