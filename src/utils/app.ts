import router from '@/router/index';
import { setImageUrl, setWebUrl } from '@/utils/index';
/**
 * 跳转到APP首页
 */
// let $App: any = null;
// 加载完成，页面加载基础界面后給Android端此回调。通知Android端已经完成页面的基础加载。建议每个页面都需要调用此方法。

export const gotoPage = (routerName: string) => {
    router.push(routerName);
};

// 返回
export const gotoBack = () => {
    router.back();
};

// 加载完成，页面加载基础界面后給Android端此回调。通知Android端已经完成页面的基础加载。建议每个页面都需要调用此方法。
export const loadFinish = () => {
    $App?.loadFinish();
};

// 刷新页面，调用次方法刷新整体页面。
export const reloadView = () => {
    $App?.reloadView();
};

// 登录成功，完成登录时调用次方法并且会销毁当前页面。
export const loginSuccess = (result: any) => {
    let resultStr = JSON.stringify(result);
    $App?.loginSuccess(resultStr);
};

// 结束当前页面并返回登录页面。
export const finishAndGoToLogin = () => {
    localStorage.clear(); // 清空所有 localStorage 数据
    $App?.finishAndGoToLogin();
};

// 返回上一页

// 结束当前页面
export const finishActivity = () => {
    // router.back();
    $App?.finishActivity();
};


// 调整指定页面
export const goToActivity = (result: any) => {
    result.webUrl = setWebUrl(result.webUrl);
    let resultStr = JSON.stringify(result);
    $App?.goToActivity(resultStr);
};


// 发送socket指令
export const sendSocket = (result: any) => {
    let resultStr = JSON.stringify(result);
    $App?.sendSocket(resultStr);
};


// 设置底部菜单参数信息
export const setMenuParamInfo = (result: any) => {
    let resultStr = JSON.stringify(result);
    $App?.setMenuParamInfo(resultStr);
};


// 设置用户信息
export const setUserInfo = (result: any) => {
    let resultStr = JSON.stringify(result);
    $App?.setUserInfo(resultStr);
};


// 设置设备信息
export const setDeviceInfo = (result: any) => {
    let resultStr = JSON.stringify(result);
    $App?.setDeviceInfo(resultStr);
};

// 获取设备信息
// window.getLoginInfo = (res: string) => {
//     console.log('JSON.parse(res)', JSON.parse(res));
// };


// 接收socket信息
export const receiveSocketInfo = (result: any) => {
    let resultStr = JSON.stringify(result);
    $App?.receiveSocketInfo(resultStr);
};


// 获取APP版本号
export const getAppVersionName = () => {
    $App?.getAppVersionName();
};

// 回显APP版本号的信息
export const appVersionName = (result: any) => {
    $App?.appVersionName();
};