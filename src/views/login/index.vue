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
                <van-icon name="circle" v-show="!state.checked" @click="setChecked" />
                <van-icon name="checked" v-show="state.checked" @click="setChecked" />
                <div style="margin-left: 6px">是否自动登录</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { login, getUserInfo, getTabMenu, getPageLogoApi } from '@/api/login/index';
import { setImageUrl, setWebUrl } from '@/utils/index';
import { useUserInfo } from '@/stores/userInfo';
import { loginSuccess } from '@/utils/app';
import { Local } from '@/utils/storage';
import { showToast } from 'vant';
const userInfoStore = useUserInfo();
let websocketURL = import.meta.env.VITE_WEBSOCKET_URL;

const state = reactive({
    username: 'developer',
    password: 'Yiview836266@',
    checked: Local.get('isAutoLogin') || false,
    startPageImage: '',
    versionUpdateApi: import.meta.env.VITE_ADMIN_PROXY_PATH + '/base/sysVersion/getLatest/2',
});

// 假设登录成功，可以进行页面跳转或其他操作
const gotoLogin = async () => {
    // await getPageLogo();
    // localStorage.clear(); // 清除浏览器全部临时缓存
    // 检查用户名和密码是否为空
    if (!state.username || !state.password) {
        showToast({ message: '用户名或密码不能为空', duration: 3000 });
        return;
    }

    // 调用登录方法
    try {
        let res: any = await login({
            username: state.username,
            password: state.password,
            grant_type: 'password',
            app_login: 'app_login',
            scope: 'server',
        });
        Local.set('token', res.access_token);
        Local.set('refresh_token', res.refresh_token);
        // 通知登录成功
        signInSuccess(res);
    } catch (error) {
        console.log('error', error);
    }
};

// 登录成功后的跳转处理事件
const signInSuccess = async (loginResult: any) => {
    try {
        // 获取菜单数据 和 用户权限信息
        const menuData = await getTabMenu();
        const userData = await getUserInfo();

        // 登录成功 -- 封装数据 -- 用户基本信息
        let successInfo = {
            menuParam: menuParam(menuData.data),
            userData: userData.data,
            menuThemeColor: '#FFFFFF',
            mainPageStatusBarColor: '#FFFFFF',
            userInfo: {
                userName: loginResult.username,
                password: state.password,
                userRealName: loginResult.username,
                phoneNumber: '13856788888',
                headPath: loginResult.username,
            },
            deviceInfo: {
                projectName: '华为手机',
                logoAddress: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
                themeColor: '#ffffff',
                addressIp: import.meta.env.VITE_ADMIN_PROXY_PATH,
                addressPort: '1000',
                isHttps: '',
                tenantId: '',
                socketAddress: `ws://${websocketURL}/websocket/webSocketServer/1/1/${loginResult.user_id}/${loginResult.access_token}`,
            },
            token: loginResult.access_token,
            isAutoLogin: state.checked,
            clickBottomIsReload: false,
            startPageImage: setImageUrl(state.startPageImage),
            versionUpdateApi: state.versionUpdateApi,
        };

        // // 登录成功 -- 调用app段方法进行通知
        loginSuccess(successInfo);

        // // 设置用户信息存入缓存
        userInfoStore.setUserInfo(successInfo);
    } catch (error) {
        console.log('error', error);
    }
};

// 处理格式化菜单数据
const menuParam = (data: any) => {
    return data.map((item: any) => {
        let { checkedIcon, uncheckedIcon, checkedColor, uncheckedColor, name, permission, path } = item;
        return {
            showIconImage: setImageUrl(checkedIcon),
            unShowIconImage: setImageUrl(uncheckedIcon),
            title: name,
            key: permission,
            showTitleColor: checkedColor,
            unShowTitleColor: uncheckedColor,
            webUrl: setWebUrl(path),
        };
    });
};

// 获取进入app的启动页面的图片
const getPageLogo = async () => {
    try {
        const { data } = await getPageLogoApi();
        // 保存图片地址
        state.startPageImage = data.find((item: any) => item.publicKey === 'APP_LOGO')?.publicValue || '';
    } catch (error) {
        console.error('获取启动页面图片失败：', error);
    }
};

const setChecked = () => {
    state.checked = !state.checked;
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
