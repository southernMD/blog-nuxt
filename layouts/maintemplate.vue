<template>
    <div class="maintemplate">

        <Head>
            <Link rel="stylesheet" href="//at.alicdn.com/t/c/font_3736505_2r0neje2dx6.css">
            </Link>
            <Link rel="icon" href="/favicon.ico">
            </Link>
        </Head>
        <div class="title">
            <div class="title-main">
                <div class="name" @click="go('/')">
                    <span>southernMD&nbsp;南山有壶酒</span>
                </div>
                <div class="nav-list">
                    <div class="nav" v-for="(val,index) in navArr" :key="val" @click="go(val)" :class="{ active: val == '首页' }">
                        <i class="iconfont" :class="navicons[index]"></i>
                        <span>{{ val }}</span>
                    </div>
                </div>
                <div class="menu" @click="showDrawer">
                    <i class="iconfont icon-caidan"></i>
                </div>
                <el-drawer v-model="drawerFlag" :append-to-body="true" :show-close="false" :with-header="false">
                    <div class="nav-list-phone">
                        <div class="nav" v-for="(val,index) in navArr" :key="val" @click="go(val)"
                            :class="{ active: val == '首页' }">
                            <span><i class="iconfont" :class="navicons[index]"></i>{{ val }}</span>
                        </div>
                    </div>
                </el-drawer>
            </div>
        </div>
        <slot></slot>
        <div class="float-option">
            <div class="one"></div>
            <div class="two"></div>
            <div class="three"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { ElDrawer, ElButton } from 'element-plus'
import { useApp } from '@/stores/index'
const $router = useRouter()
const AppPinia = useApp()
const navArr = ['首页', '文章', '留言版', '实验室', '十年','关于'];
const navicons = ['icon-shouye','icon-wenzhang','icon-liuyan','icon-flask','icon-zhiwu','icon-guanyu']

let drawerFlag = ref(false)
const go = (path: string) => {
    $router.push({

    })
}
let windowWidth = toRef(AppPinia, 'windowWidth')
const getWindowWidth = () => {
    windowWidth.value = document.documentElement.clientWidth
    console.log(windowWidth.value);
}

onMounted(() => {
    getWindowWidth()
    window.addEventListener('resize', getWindowWidth)
})

watch(windowWidth, () => {
    if (windowWidth.value >= 512) {
        drawerFlag.value = false
    }
})

const showDrawer = () => {
    console.log('123');

    drawerFlag.value = true
    console.log(drawerFlag.value);
}
</script>

<style scoped lang="less">
.maintemplate {
    .title {
        width: 100vw;
        height: 55px;
        background: @title-color;
        display: flex;
        align-items: center;
        justify-content: center;

        .title-main {
            width: 80%;
            height: 100%;
            display: flex;
            position: relative;

            .name {
                user-select: none;
                width: 200px;
                height: 100%;
                display: flex;
                align-items: center;
                padding-left: 10px;
                cursor: pointer;
                >span {
                    color: white;
                    font-size: 14px;
                }

            }

            .nav-list {
                display: flex;
                align-items: center;

                .nav {
                    width: 80px;
                    height: 30px;
                    margin-left: 10px;
                    border-radius: .4em;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;

                    >span,i{
                        font-size: 16px;
                        color: white;
                    }
                    i{
                        margin-right: 4px;
                    }
                    &:hover {
                        background: white;

                        >span,i{
                            color: @title-color;
                        }
                    }
                }
                .active {
                    background: white ;

                    >span,i{
                        color: @title-color ;
                    }
                }
            }

            @media (max-width:720px) {
                .nav-list {
                    display: none
                }
            }

            .menu {
                position: absolute;
                right: 10px;
                top: 0;
                bottom: 0;
                margin: auto 0;
                width: 20px;
                height: 20px;
                display: none;
                cursor: pointer;

                >i {
                    font-size: 20px;
                    color: white;
                    height: 20px;
                    width: 20px;
                    display: inline;
                }
            }

            @media (max-width: 720px) {
                .menu {
                    display: block;
                }
            }
        }

        @media (max-width: 1024px) {
            .title-main {
                width: 100%;
            }

            .title-main .nav-list {
                position: absolute;
                right: 10px;
                top: 0;
                bottom: 0;
                margin: auto 0;
            }
        }
    }
}

.nav-list-phone {
    .nav {
        display: flex;
        align-items: center;
        height: 40px;
        user-select: none;
        z-index: 2;
        position: relative;
        transition: all .2s linear;
        margin-top: 5px;

        >span {
            padding-left: 20px;
            z-index: 2;
            position: relative;
            cursor: pointer;
            i{
                margin-right: 5px;
            }
        }

        &:not(.active):hover {
            transform: translateY(-5px);
        }

        &::after {
            content: '';
            cursor: pointer;
            width: 90%;
            height: 80%;
            background-color: rgba(255, 255, 255, .5);
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            z-index: 1;
            border-radius: .5em;

            &:hover {
                background: red;
            }
        }
    }

    .active {
        font-weight: bolder;
    }
}
.float-option{
    position: fixed;
    z-index: 999;
    bottom: 30px;
    right: 30px;
    >div{
        width: 40px;
        height: 40px;
        margin-top: 10px;
        background: red;
    }
}
</style>