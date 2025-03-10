import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
const pathResolve = (dir: string) => {
    return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
    '@': pathResolve('./src/'),
};

export default defineConfig((mode: ConfigEnv) => {
    const env = loadEnv(mode.mode, process.cwd());
    return {
        // 生产环境增加资源路径前缀

        plugins: [
            vue(),
            Components({
                resolvers: [VantResolver()],
            }),
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'], // 自动导入的依赖库数组
                dts: './auto-imports.d.ts', // 自动导入类型定义文件路径
            }),
            basicSsl()
        ],
        /*resolve: {
            alias: {
                '/@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },*/
        root: process.cwd(), // 项目根目录
        resolve: { alias }, // 路径别名配置
        base: env.VITE_PUBLIC_PATH,
        server: {
            host: '0.0.0.0', // 服务器地址
            https: false,
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
        define: {
            __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
            'process.env': process.env,
        },
    };
});
