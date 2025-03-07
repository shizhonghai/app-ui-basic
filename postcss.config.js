module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({ file }) {
                // 如果是 Vant 的样式，使用 37.5 作为 rootValue
                // 如果是自定义样式，也使用 37.5 作为 rootValue
                // return file.indexOf('vant') !== -1 ? 37.5 : 75;
                return 37.5;
            },
            propList: ['*'], // 指定需要转换的 CSS 属性
            unitPrecision: 5, // 指定转换后的 rem 值精度，默认为 5
            selectorBlackList: [], // 指定需要忽略转换的 CSS 选择器
            replace: true, // 指定是否替换原始的属性值，默认为 true
            mediaQuery: false, // 指定是否在媒体查询中也进行转换，默认为 false
            minPixelValue: 1, // 指定最小的像素值，小于该值的不进行转换，默认为 1
        },
    },
};
