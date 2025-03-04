import { defineStore } from 'pinia';

/**
 * @function useUserInfo
 * @returns {UserInfosStore}
 */
export const useUserInfo = defineStore('userInfo', {
    state: () => ({
        userInfos: {
            userData: {
                appPermissions: []
            }
        },
    }),

    actions: {
        /**
         * 获取用户信息方法
         * @function setUserInfos
         * @async
         */
        async setUserInfos(userInfo: any) {
            this.userInfos = userInfo;
        },
    },
    // 持久化
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'userInfo',
                storage: localStorage,
            },
        ],
    },
});
