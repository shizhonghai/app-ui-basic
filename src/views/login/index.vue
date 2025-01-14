<template>
    <div class="login-container">
        <div class="login-box">
            <h2 class="login-title">登录</h2>
            <van-cell-group inset>
                <van-field v-model="state.username" label="用户名" placeholder="请输入用户名" />
                <van-field v-model="state.password" label="密码" placeholder="请输入密码" />
            </van-cell-group>
            <div class="register-link">
                <van-button type="primary" @click="gotoLogin" size="large">登录</van-button>
            </div>
            <div class="login-radio">
                <van-icon name="circle" v-show="!state.checked" @click="state.checked = !state.checked" />
                <van-icon name="checked" v-show="state.checked" @click="state.checked = !state.checked" />
                <div style="margin-left: 6px">是否自动登录</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { loginSuccess } from '@/utils/app';
import other from '@/utils/other';
import request from '@/utils/request';
import { showToast } from 'vant';
const router = useRouter();
let hostUrl = import.meta.env.VITE_ADMIN_HOST_URL;
// let hostUrl = window.location.host;
let websocketURL = import.meta.env.VITE_WEBSOCKET_URL;
const state = reactive({
    username: 'developer',   
    password: 'Yiview836266@',
    checked: false,
});

// bd6Z2jiHdk/P/7U0DQ==
console.log('hostUrlhostUrl', hostUrl);

// 菜单列表
const menuParam = ref([
    {
        showIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        unShowIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
        title: '首页',
        key: 'home',
        showTitleColor: '#111111',
        unShowTitleColor: '#1989fa',
        webUrl: hostUrl + '/home',
    },
    {
        showIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        unShowIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
        title: '消息',
        key: 'message',
        showTitleColor: '#111111',
        unShowTitleColor: '#1989fa',
        webUrl: hostUrl + '/message',
    },
    {
        showIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        unShowIconImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
        title: '我的',
        key: 'center',
        showTitleColor: '#111111',
        unShowTitleColor: '#1989fa',
        webUrl: hostUrl + '/center',
    },
]);

// 假设登录成功，可以进行页面跳转或其他操作
const gotoLogin = async () => {
    if (state.username == '' || state.password == '') {
        showToast({ message: '用户名或密码不能为空', duration: 3000 });
        return;
    }
    // 请求登录接口
    login({
        username: state.username,
        password: state.password,
        grant_type: 'password',
        app_login: 'app_login',
        scope: 'server',
    }).then((result: any) => {
        // router.push('/home');
        // showToast({ message: '登录成功', duration: 3000 });
        // 通知app登录成功loginSuccess
        console.log('登录成功', `ws://${websocketURL}/websocket/webSocketServer/1/0/${result.user_id}/${result.access_token}`);
        // ws://192.168.2.136:9999/websocket/webSocketServer/1/0/aa3c77e2a32be0ee3de3fab0a78d1936/4133f9cf-0df2-476f-a5f3-0d2d371b5705
        // ws://192.168.2.136:9999/websocket/webSocketServer/1/0/aa3c77e2a32be0ee3de3fab0a78d1936/10e04680-0fa4-43dd-90a7-710847d2d900
        loginSuccess({
            menuParam: menuParam.value,
            menuThemeColor: '#FFFFFF',
            mainPageStatusBarColor: '#FFFFFF',
            userInfo: {
                userName: result.userName,
                password: state.password,
                userRealName: result.sysUser.name,
                phoneNumber: '13856788888',
                headPath: result.sysUser.avatar,
            },
            deviceInfo: {
                projectName: '华为手机',
                logoAddress: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
                themeColor: '#ffffff',
                addressIp: '123456789',
                addressPort: '1000',
                isHttps: '',
                tenantId: '',
                socketAddress: `ws://${websocketURL}/websocket/webSocketServer/1/0/${result.user_id}/${result.access_token}`,
            },
            token: result.access_token,
            isAutoLogin: state.checked,
            clickBottomIsReload: false,
        });
    });
};

const login = (data: any) => {
    // 密码加密
    const encPassword = other.encryption(data.password, import.meta.env.VITE_PWD_ENC_KEY);
    const { username, grant_type, app_login, scope } = data;
    return request({
        url: '/auth/oauth2/token',
        method: 'post',
        params: { username, grant_type, app_login, scope },
        data: { password: encPassword },
        headers: {
            Authorization: 'Basic YXBwOmFwcA==',
            skipToken: true,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f2f2f2;
    background-image: linear-gradient(to right, #6dd5ed, #2193b0);
}
.login-title {
    font-size: 36px;
}
.login-box {
    width: 500px;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.register-link {
    margin-top: 40px;
    color: #409eff;
    font-size: 14px;
    cursor: pointer;
}
.login-radio {
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-top: 40px;
}
</style>
