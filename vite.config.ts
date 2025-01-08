import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import { resolve } from 'path';
// 将 px 转换为 vw
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin';

const pathResolve = (dir: string) => {
    return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
    '/@': pathResolve('./src/'),
};

export default defineConfig((mode: ConfigEnv) => {
    const env = loadEnv(mode.mode, process.cwd());
    return {
        // 生产环境增加资源路径前缀
        base: process.env.NODE_ENV === 'development' ? '' : '/app/',
        plugins: [
            vue(),
            Components({
                resolvers: [VantResolver()],
            }),
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'], // 自动导入的依赖库数组
                dts: './auto-imports.d.ts', // 自动导入类型定义文件路径
            }),
        ],
        /*resolve: {
            alias: {
                '/@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },*/
        resolve: { alias }, // 路径别名配置
        server: {
            host: '0.0.0.0', // 服务器地址
            open: true, // 是否自动打开浏览器
            hmr: true, // 启用热更新
            port: 1000, //自定义端口
            proxy: {
                '/api': {
                    target: env.VITE_ADMIN_PROXY_PATH, // 目标服务器地址
                    ws: false, // 是否启用 WebSocket
                    changeOrigin: true, // 是否修改请求头中的 Origin 字段
                    rewrite: path => path.replace(/^\/api/, ''),
                },
            },
        },
        build: {
            outDir: 'dist', // 打包输出目录
            chunkSizeWarningLimit: 1500, // 代码分包阈值
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name].[hash].js`,
                    chunkFileNames: `assets/[name].[hash].js`,
                    assetFileNames: `assets/[name].[hash].[ext]`,
                    compact: true,
                    manualChunks: {
                        vue: ['vue', 'vue-router', 'pinia'],
                        echarts: ['echarts'],
                    },
                },
            },
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true, // 打包时去除 console
                    drop_debugger: true, // 打包时去除 debugger
                },
            },
        },
        css: {
            postcss: {
                plugins: [
                    postcssPxToViewport({
                        unitToConvert: 'px', // 要转化的单位
                        viewportWidth: 750, // UI设计稿的宽度，一般写 320

                        // 下面的不常用，上面的常用
                        unitPrecision: 6, // 转换后的精度，即小数点位数
                        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                        viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
                        fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
                        selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
                        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                        replace: true, // 是否转换后直接更换属性值
                        landscape: false, // 是否处理横屏情况
                    }),
                ],
            },
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "./src/assets/styles/variables.module.scss";`, // 此处全局的scss文件
                },
            },
        },
        define: {
            __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
            'process.env': process.env,
        },
    };
});
