import request from '@/utils/request';
import { Local } from '@/utils/storage';
import other from '@/utils/other';

/**
 * https://www.ietf.org/rfc/rfc6749.txt
 * OAuth 协议 4.3.1 要求格式为 form 而不是 JSON 注意！
 */
const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded';

// 登录
export const login = (data: any) => {
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
      'Content-Type': FORM_CONTENT_TYPE,
    },
  });
};

// 获取app的Tab菜单数据
export const getTabMenu = (data = { menuClassification: '2' }) => {
  return request({
    url: '/base/menu/getUserMenu',
    method: 'get',
    params: data,
  });
};

/**
 * 获取用户信息
 */
export const getUserInfo = (data = { menuClassification: '2' }) => {
  return request({
    url: '/base/user/info',
    method: 'get',
    params: data,
  });
};




