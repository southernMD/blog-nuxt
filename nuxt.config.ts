// https://v3.nuxtjs.org/api/configuration/nuxt.config
import path from 'path';
import ElementPlus from 'unplugin-element-plus/vite'

export default defineNuxtConfig({
    css:['@/assets/base.css','element-plus/dist/index.css'],
    build: {
        transpile: ['element-plus/es'],
    },
    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    charset: false,
                    javascriptEnabled: true,
                    // 这样就能全局使用 src/assets/styles/mixins.less 定义的 变量
                    additionalData: `@import "${path.resolve('./assets/mixins.less')}";`
                },
            }
        },
        plugins: [
            ElementPlus()
        ],
    },
    modules: ['@pinia/nuxt'],
})
