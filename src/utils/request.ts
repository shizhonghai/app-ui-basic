import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { showToast, showLoadingToast, closeToast } from 'vant';
import { Local } from '@/utils/storage';
import other from '@/utils/other';
import qs from 'qs';
let loadingCount = 0;


// 加密处理
const encryptRequestData = (config: AxiosRequestConfig): void => {
    // 仅在需要加密时处理
    if (import.meta.env.VITE_API_ENCRYPT === 'true' && !config.url?.includes('/auth/oauth2/token')) {
        config.headers!['enc'] = 'true';
        // @ts-ignore
        const encryptionData = other.encryption(JSON.stringify(config[enumMethod[config.method]]), import.meta.env.VITE_PWD_ENC_KEY);
        // @ts-ignore
        config[enumMethod[config.method]] = { encryption: encryptionData };
    }
};
// 配置请求的序列化（仅针对 GET 请求）
const setGetRequestParams = (config: any): void => {
    if (config.method === 'get') {
        config.paramsSerializer = (params: any) => qs.stringify(params, { arrayFormat: 'repeat' });
    }
};

/**
 * 创建并配置一个 Axios 实例对象
 */
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 50000, // 全局超时时间
});


/**
 * 响应拦截器处理函数
 * @param response 响应结果
 * @returns 如果响应成功，则返回响应的data属性；否则，抛出错误或者执行其他操作
 */
const handleResponse = (response: AxiosResponse<any>) => {
    
    // 无论成功或失败都会执行的逻辑
    commonLogic();

    if (response.data.code === 1) {
        showToast({ message: response.data.msg, duration: 3000 });
        throw response.data;
    }
    // 解密返回的数据（如果需要）
    if (response.data.encryption) {
        response.data = JSON.parse(other.decryption(response.data.encryption, import.meta.env.VITE_PWD_ENC_KEY));
    }
    return response.data;
};

/**
 * 响应拦截器处理函数
 * @param error 错误结果
 * @returns 如果响应失败，则抛出错误或者执行其他操作
 */
const handleError = (error: any) => {
    // 无论成功或失败都会执行的逻辑
    commonLogic();
    const status = Number(error.response.status) || 200;
    if (status === 424) {
        localStorage.clear(); // 清除浏览器全部临时缓存
    } else {
        showToast({ message: '网络异常', duration: 3000 });
    }
    return Promise.reject(error.response.data);
};
// 接口loading加载
const commonLogic = () => {
    setTimeout(() => {
        loadingCount -= 1
        if (loadingCount <= 0) {
            closeToast()
        }
    }, 500)
}


/**
 * Axios请求拦截器，对请求进行处理
 * 1. 序列化get请求参数
 * 2. 统一增加Authorization和TENANT-ID请求头
 * 3. 自动适配单体、微服务架构不同的URL
 * @param config AxiosRequestConfig对象，包含请求配置信息
 */
axiosInstance.interceptors.request.use((config) => {
    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
    });
    loadingCount += 1
    // 对get请求参数进行序列化
    setGetRequestParams(config);

    // 统一增加Authorization请求头, skipToken 跳过增加token
    const token = Local.get('token');
    if (token && !config.headers?.skipToken) {
        config.headers!['Authorization'] = `Bearer ${token}`;
        config.headers!['ACCESS_TOKEN'] = token;
        config.headers!['androidId'] = Local.get('androidId');
    }
    // 处理完毕，返回config对象
    return config;
}, error => {
    // 对请求错误进行处理
    return Promise.reject(error);
});

/**
 * 添加 Axios 的响应拦截器，用于全局响应结果处理
 */
axiosInstance.interceptors.response.use(handleResponse, handleError);

// 导出 axios 实例
export default axiosInstance;
