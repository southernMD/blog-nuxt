// https://v3.nuxtjs.org/api/configuration/nuxt.config
import path from 'path';
import ElementPlus from 'unplugin-element-plus/vite'
import { loadEnv } from 'vite'

const envScript = (process.env as any).npm_lifecycle_script.split(' ')
const envName = envScript[envScript.length - 1] // 通过启动命令区分环境
const envData = loadEnv(envName, 'env') 

console.log('当前环境：', envData)

export default defineNuxtConfig({
    css:['@/assets/base.css','element-plus/dist/index.css'],
    build: {
        transpile: ['element-plus/es'],
    },
    runtimeConfig: {
        public: envData // 把env放入这个里面，通过useRuntimeConfig获取
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
            ElementPlus(),
        ],
        envDir: '~/env', // 指定env文件夹
    },
    modules: ['@pinia/nuxt'],
})
