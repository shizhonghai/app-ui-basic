import { defineStore } from 'pinia';

/**
 * @function useUserInfo
 * @returns {UserInfoStore}
 */
export const useUserInfo = defineStore('userInfo', {
    state: () => ({
        userInfo: {
            userData: {
                appPermissions: []
            },
        },
    }),

    actions: {
        /**
         * 获取用户信息方法
         * @function setUserInfo
         * @async
         */
        async setUserInfo(userInfo: any) {
            this.userInfo = userInfo;
        },
    },
    // 持久化
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'app:userInfo',
                storage: localStorage,
            },
        ],
    },
});
