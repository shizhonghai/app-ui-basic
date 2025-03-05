import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { showToast } from 'vant';
import { Local } from '@/utils/storage';

/**
 * 创建并配置一个 Axios 实例对象
 */
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 50000, // 全局超时时间
});
/**
 * Axios请求拦截器，对请求进行处理
 * 1. 序列化get请求参数
 * 2. 统一增加Authorization和TENANT-ID请求头
 * 3. 自动适配单体、微服务架构不同的URL
 * @param config AxiosRequestConfig对象，包含请求配置信息
 */
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 对get请求参数进行序列化
        if (config.method === 'get') {
            // @ts-ignore 使用qs库来序列化查询参数
            config.paramsSerializer = (params: any) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            };
        }
        // 统一增加Authorization请求头, skipToken 跳过增加token
        const token = Local.get('token');
        if (token && !config.headers?.skipToken) {
            config.headers!['Authorization'] = `Bearer ${token}`;
            config.headers!['ACCESS_TOKEN'] = token;
            config.headers!['androidId'] = Local.get('androidId');
        }
        // 处理完毕，返回config对象
        return config;
    },
    error => {
        // 对请求错误进行处理
        return Promise.reject(error);
    }
);

/**
 * 响应拦截器处理函数
 * @param response 响应结果
 * @returns 如果响应成功，则返回响应的data属性；否则，抛出错误或者执行其他操作
 */
const handleResponse = (response: AxiosResponse<any>) => {
    if (response.config.responseType !== 'blob') {
        if (response.data.msg) {
            showToast({ message: response.data.msg, duration: 3000 });
        }
    }
    return response.data;
};

/**
 * 添加 Axios 的响应拦截器，用于全局响应结果处理
 */
service.interceptors.response.use(handleResponse, error => {
    const status = Number(error.response.status) || 200;
    if (status === 424) {
        localStorage.clear(); // 清除浏览器全部临时缓存
        /*useMessageBox()
            .confirm('令牌状态已过期，请点击重新登录')
            .then(() => {
                Session.clear(); // 清除浏览器全部临时缓存
                window.location.href = '/'; // 去登录页
                return;
            });*/
    }
    return Promise.reject(error.response.data);
});

// 常用header
export enum CommonHeaderEnum {
    'AUTHORIZATION' = 'Authorization',
}

// 导出 axios 实例
export default service;
