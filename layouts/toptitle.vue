<template>
    <div class="toptitle">

        <Head>
            <Link rel="stylesheet" href="//at.alicdn.com/t/c/font_3736505_bbzb36dxh2s.css">
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
                    <div class="nav" v-for="val in navArr" :key="val" @click="go(val)">
                        <span>{{ val }}</span>
                    </div>
                </div>
                <div class="switch">
                    <ElSwitch v-model="value1" inline-prompt active-text="日" inactive-text="夜" />
                </div>
                <div class="menu" @click="showDrawer">
                    <i class="iconfont icon-caidan"></i>
                </div>
                <el-drawer v-model="drawerFlag" :append-to-body="true" :show-close="false" :with-header="false">
                    <div class="nav-list-phone">
                        <div class="nav" v-for="val in navArr" :key="val" @click="go(val)">
                            <span>{{ val }}</span>
                        </div>
                    </div>
                </el-drawer>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { ElSwitch, ElDrawer,ElButton } from 'element-plus'
import { useApp } from '@/stores/index'
const $router = useRouter()
const AppPinia = useApp()
const navArr = ['首页', '文章', '实验室', '平成十年']
let value1 = ref(true)

let drawerFlag = ref(true)
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
.toptitle {
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
                    margin-left: 5px;
                    border-radius: .4em;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;

                    >span {
                        font-size: 16px;
                        color: white;
                    }

                    &:hover {
                        background: white;

                        >span {
                            color: @title-color;
                        }
                    }
                }
            }

            @media (max-width:512px) {
                .nav-list {
                    display: none
                }
            }

            .switch {
                position: absolute;
                right: 0;
                display: none;
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

            @media (max-width: 512px) {
                .menu {
                    display: block;
                }
            }
        }

        @media (max-width: 1024px) {
            .title-main {
                width: 100%;
            }
        }
    }
}

.nav-list-phone{
    .nav{
        display: flex;
        align-items: center;
        height: 40px;
        user-select: none;
        cursor: pointer;
        >span{
            padding-left: 20px;
        }
        &:hover{
            background-color: red;
        }
    }
}
</style>