import { useApp } from '@/stores'

export default defineNuxtRouteMiddleware((to, from) => {
    console.log(to.path);
    const AppPinia = useApp()
    switch (to.path) {
        case '/':
            AppPinia.activeBlock = '首页'
            break;
        case '/articles':
            AppPinia.activeBlock = '文章'
            break;
        case '/board':
            AppPinia.activeBlock = '留言版'
            break;
        case '/experiment':
            AppPinia.activeBlock = '实验室'
            break;
        case '/years':
            AppPinia.activeBlock = '十年'
            break;
        case '/about':
            AppPinia.activeBlock = '关于'
            break;
    }
    if(to.path.includes('articles'))AppPinia.activeBlock = '文章'
})