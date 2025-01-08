import { defineStore } from 'pinia';

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useQuestionStore = defineStore('questionStore', {
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            questionData: null,
        };
    },
    actions: {
        setQuestionData(value: any) {
            this.questionData = value;
        },
    },
    getters: {},
    persist: {
        // 开启持久化
        enabled: true,
        // token 字段用 localstorage 存储
        strategies: [{ storage: sessionStorage }],
        /*strategies: [
            // firstName 和 lastName字段用sessionStorage存储
            { storage: sessionStorage, paths: ['firstName', 'lastName'] },
            // accessToken字段用 localstorage存储
            { storage: localStorage, paths: ['accessToken'] },
        ],*/
    },
});
