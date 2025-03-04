import { createApp } from 'vue';
import pinia from '@/stores/index';
import { directive } from '@/directive';
import App from './App.vue';
import router from './router';
import { Icon } from 'vant';
/**
 * Vant 中有个别组件是以函数的形式提供的，包括 Toast，Dialog，Notify 和 ImagePreview 组件。
 * 在使用函数组件时，unplugin-vue-components 无法解析自动注册组件，
 * 导致 @vant/auto-import-resolver 无法解析样式，因此需要手动引入样式。
 */
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/toast/style';
import 'vant/es/image-preview/style';
import './assets/base.scss';


const app = createApp(App);

/*if (import.meta.env.MODE === 'development') {
    import('vconsole').then(VConsole => {
        new VConsole.default();
    });
}*/

import('vconsole').then(VConsole => {
    new VConsole.default();
});

// 导入通用自定义组件
// app.component('Back', Back);
directive(app);
app.use(Icon).use(pinia).use(router).mount('#app');
