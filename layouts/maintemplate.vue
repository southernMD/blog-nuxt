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
                    <div class="nav" v-for="(val, index) in navArr" :key="val" @click="go(val)"
                        :class="{ active: val == '首页' }">
                        <i class="iconfont" :class="navicons[index]"></i>
                        <span>{{ val }}</span>
                    </div>
                </div>
                <div class="menu" @click="showDrawer">
                    <i class="iconfont icon-caidan"></i>
                </div>
                <el-drawer v-model="drawerFlag" :append-to-body="true" :show-close="false" :with-header="false">
                    <div class="nav-list-phone">
                        <div class="nav" v-for="(val, index) in navArr" :key="val" @click="go(val)"
                            :class="{ active: val == '首页' }">
                            <span><i class="iconfont" :class="navicons[index]"></i>{{ val }}</span>
                        </div>
                    </div>
                </el-drawer>
            </div>
        </div>
        <slot></slot>
        <div class="float-option" :class="{'float-option-l':optionDirectionFlag,'float-option-active':optionActiveFlag}">
            <Block :height="'30px'" class="change-direction" @click="handleChangeDirection" :class="{'hide':optionActiveFlag}" :orderChange="orderChange">
                <template #icon>
                    <el-icon>
                        <ArrowLeftBold v-if="!optionDirectionFlag"  />
                        <ArrowRightBold v-else />
                    </el-icon>
                </template>
                <template #message>
                    <div class="message">{{!optionDirectionFlag?'移至左侧':'移至右侧'}}</div>
                </template>
            </Block>
            <Block class="one" :orderChange="orderChange"></Block>
            <Block class="skin" @click="handleChangeSkin" :orderChange="orderChange"></Block>
            <Block class="three" :orderChange="orderChange"></Block>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { ElDrawer, ElButton,ElIcon } from 'element-plus'
import {ArrowLeftBold,ArrowRightBold} from '@element-plus/icons-vue'
import { useApp } from '@/stores/index'
const $router = useRouter()
const AppPinia = useApp()
const navArr = ['首页', '文章', '留言版', '实验室', '十年', '关于'];
const navicons = ['icon-shouye', 'icon-wenzhang', 'icon-liuyan', 'icon-flask', 'icon-zhiwu', 'icon-guanyu']
let theme = toRef(AppPinia,'theme')
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

let optionDirectionFlag = ref(false)
let optionActiveFlag = ref(false)
let orderChange = ref(false)
const handleChangeDirection = ()=>{
    optionActiveFlag.value = true
    let time2 = setTimeout(()=>{
        orderChange.value = !orderChange.value
        clearTimeout(time2)
    },200)
    let time = setTimeout(()=>{
        optionDirectionFlag.value = !optionDirectionFlag.value
        clearTimeout(time)
        optionActiveFlag.value = false
    },300)
}

onMounted(()=>{
    skin(theme.value);
})

const handleChangeSkin = ()=>{
    if(theme.value == 'light'){
        theme.value = 'dark'
    }else{
        theme.value = 'light'
    }
    skin(theme.value);
}

</script>

<style scoped lang="less">
.hide{
    display: none !important;
}
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
                    border-radius: @border-ra;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;

                    >span,
                    i {
                        font-size: 16px;
                        color: white;
                    }

                    i {
                        margin-right: 4px;
                    }

                    &:hover {
                        background: white;

                        >span,
                        i {
                            color: @title-color;
                        }
                    }
                }

                .active {
                    background: white;

                    >span,
                    i {
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

    .float-option {
        position: fixed;
        z-index: 999;
        bottom: 30px;
        right: 30px;
        width: 130px;
        transition: opacity .2s linear;
        >.change-direction{
            height: 30px;
            opacity: 0;
            transition: all .2s linear;
            transform: translateY(10px);
        }
        &:hover .change-direction{
            opacity: 1;
            transform: translateY(0px);
        }
    }
    .float-option-active{
        opacity: 0;
    }
    .float-option-l{
        bottom: 30px;
        left: 30px;
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
            color: @font-color;
            i {
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
            background-color: @background-btn;
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            z-index: 1;
            border-radius: @border-ra;

            &:hover {
                background: red;
            }
        }
    }

    .active {
        font-weight: bolder;
    }
}
</style>