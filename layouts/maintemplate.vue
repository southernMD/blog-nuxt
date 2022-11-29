<template>
    <div class="maintemplate">

        <Head>
            <Link rel="stylesheet" href="//at.alicdn.com/t/c/font_3736505_oh3rlks2ki.css">
            </Link>
            <Link rel="icon" href="/favicon.ico">
            </Link>
        </Head>
        <Transition name="title-way">
            <div class="title" v-show="scrollbarVal < 100">
                <div class="title-main">
                    <div class="search" @click="showSearchDrawer">
                        <i class="iconfont icon-search"></i>
                    </div>
                    <div class="name" @click="go('首页')">
                        <span>southernMD&nbsp;南山有壶酒</span>
                    </div>
                    <div class="nav-list">
                        <div class="nav" v-for="(val, index) in navArr" :key="val" @click="go(val)"
                            :class="{ 'active': val == activeBlock }">
                            <i class="iconfont" :class="navicons[index]"></i>
                            <span>{{ val }}</span>
                        </div>
                    </div>
                    <div class="menu" @click="showDrawer">
                        <i class="iconfont icon-caidan"></i>
                    </div>
                    <Teleport to="body">
                        <el-drawer v-model="drawerFlag" :append-to-body="true" :show-close="false" :with-header="false"  size="70%">
                            <div class="nav-list-phone">
                                <div class="nav" v-for="(val, index) in navArr" :key="val" @click="go(val)"
                                    :class="{ 'active': val == activeBlock }">
                                    <span><i class="iconfont" :class="navicons[index]"></i>{{ val }}</span>
                                </div>
                            </div>
                        </el-drawer>
                        <el-drawer v-model="SearchDrawerFlag" :append-to-body="true" :show-close="false" :with-header="false" direction="ltr" size="70%">
                            <el-scrollbar>
                                <div id="left-drawer">
                                    <el-input v-model="searchVal" placeholder="search in station ..." @keydown.enter="goSearch">
                                    <template #suffix>
                                            <i class="iconfont icon-search" style="font-size:18px;cursor: pointer;" @click.self="goSearch"></i>
                                        </template>
                                    </el-input>
                                    <Component :is="flag == 0 ? MyMessage : TagList"></Component>
                                    <div class="option">
                                        <div class="one" @click="change(0)" :class="{ active: flag == 0 }">站点信息</div>
                                        <div class="two" @click="change(1)" :class="{ active: flag == 1 }">标签云</div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </el-drawer>
                    </Teleport>
                </div>
            </div>
        </Transition>

        <slot></slot>
        <div class="float-option" :class="{
            'float-option-l': optionDirectionFlag,
            'float-option-active': optionActiveFlag,
            'hide-option': !hideFlag && !optionDirectionFlag,
            'hide-option-l': !hideFlag && optionDirectionFlag,
        }">
            <Block :height="'30px'" class="change-direction" @block="handleChangeDirection"
                :class="{ 'hide': optionActiveFlag }">
                <template #icon>
                    <el-icon>
                        <CaretLeft v-if="!optionDirectionFlag" />
                        <CaretRight v-else />
                    </el-icon>
                </template>
                <template #message>
                    <div class="message">{{ !optionDirectionFlag ? '移至左侧' : '移至右侧' }}</div>
                </template>
            </Block>
            <Block class="top" @block="goToTop">
                <template #icon>
                    <el-icon>
                        <Top />
                    </el-icon>
                </template>
                <template #message>
                    <div class="message">回到顶部</div>
                </template>
            </Block>
            <Block class="skin" @block="handleChangeSkin">
                <template #icon>
                    <el-icon>
                        <Sunny v-show="theme == 'dark'" />
                        <Moon v-show="theme != 'dark'" />
                    </el-icon>
                </template>
                <template #message>
                    <div class="message">{{ theme == 'dark' ? '夜间模式' : '日间模式' }}</div>
                </template>
            </Block>
            <Block class="hide-btn" @block="handleHideOption">
                <template #icon>
                    <el-icon>
                        <Hide />
                    </el-icon>
                </template>
                <template #message>
                    <div class="message">隐藏面板</div>
                </template>
            </Block>
        </div>
        <transition name="sm-option">
            <div v-show="!hideFlag" class="float-option-small" :class="{ 'float-option-small-l': optionDirectionFlag }"
                @click="handleHideOption">
                <el-icon>
                    <ArrowLeftBold v-if="!optionDirectionFlag" />
                    <ArrowRightBold v-else />
                </el-icon>
            </div>
        </transition>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { ElDrawer, ElButton, ElIcon,ElInput,ElScrollbar} from 'element-plus'
import { ArrowLeftBold, ArrowRightBold, Sunny, Moon, Hide, CaretLeft, CaretRight, Top } from '@element-plus/icons-vue'
import { useApp } from '@/stores/index'
const MyMessage = resolveComponent('MyMessage')
const TagList = resolveComponent('TagList')
const $router = useRouter()
const AppPinia = useApp()
const navArr = ['首页', '文章', '留言版', '实验室', '十年', '关于'];
const navicons = ['icon-shouye', 'icon-wenzhang', 'icon-liuyan', 'icon-flask', 'icon-zhiwu', 'icon-guanyu']
let theme = toRef(AppPinia, 'theme')
let drawerFlag = ref(false)
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')

let activeBlock = toRef(AppPinia, 'activeBlock');
const go = (path: string) => {
    let p = ''
    drawerFlag.value = false
    activeBlock.value = path
    switch (path) {
        case '首页':
            p = '/'
            break;
        case '文章':
            p = '/articles'
            break;
        case '留言版':
            p = '/board'
            break;
        case '实验室':
            p = '/experiment'
            break;
        case '十年':
            p = '/years'
            break;
        case '关于':
            p = '/about'
            break;
    }
    $router.push({
        path: p
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
    if (windowWidth.value >= 750) {
        drawerFlag.value = false
    }
    if(windowWidth.value >=915){
        SearchDrawerFlag.value = false
    }
})

const showDrawer = () => {
    console.log('123');
    drawerFlag.value = true
    console.log(drawerFlag.value);
}

let SearchDrawerFlag = ref(false)
const showSearchDrawer = () =>{
    SearchDrawerFlag.value = true
}

let searchVal = ref('')

const goSearch = ()=>{
    console.log(searchVal.value);
    searchVal.value = ''
}

let flag = ref(0)
const change = (num: number) => {
    flag.value = num;
}

let optionDirectionFlag = toRef(AppPinia, 'optionDirectionFlag')
onMounted(() => {
    console.log(optionDirectionFlag.value, 'KKKK');
})
let orderChange = toRef(AppPinia, 'orderChange')
let optionActiveFlag = ref(false)
const handleChangeDirection = () => {
    optionActiveFlag.value = true
    let time2 = setTimeout(() => {
        orderChange.value = !orderChange.value
        clearTimeout(time2)
    }, 200)
    let time = setTimeout(() => {
        optionDirectionFlag.value = !optionDirectionFlag.value
        clearTimeout(time)
        optionActiveFlag.value = false
    }, 400)
}

onMounted(() => {
    useSkin(theme.value);
})

const handleChangeSkin = () => {
    if (theme.value == 'light') {
        theme.value = 'dark'
    } else {
        theme.value = 'light'
    }
    useSkin(theme.value);
}

let hideFlag = toRef(AppPinia, 'hideFlag')
const handleHideOption = () => {
    hideFlag.value = !hideFlag.value
}

const goToTop = () => {
    AppPinia.toTopFlag = true
}

</script>

<style scoped lang="less">
.hide {
    display: none !important;
}

.title-margin {
    margin-top: 60px;
}

.maintemplate {
    .title {
        width: 100vw;
        height: 55px;
        background: @title-color;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        z-index: 1000;

        .title-main {
            width: 80%;
            height: 100%;
            display: flex;
            position: relative;

            .name {
                user-select: none;
                width: 160px;
                height: 100%;
                display: flex;
                align-items: center;
                padding-left: 10px;
                cursor: pointer;
                margin-right: 40px;

                >span {
                    color: white;
                    font-size: 14px;
                }

            }

            .search {
                position: absolute;
                left: 10px;
                top: 0;
                bottom: 0;
                margin: auto 0;
                width: 20px;
                height: 20px;
                cursor: pointer;
                display: none;

                i {
                    width: 20px;
                    height: 20px;
                    font-size: 20px;
                    color: white;
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

            @media (max-width:750px) {
                .nav-list {
                    display: none
                }

                .name {
                    margin: 0 auto;
                    padding-left: 10px !important;
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

            @media (max-width: 750px) {
                .menu {
                    display: block;
                }
            }

            @media (max-width:915px) {
                .search {
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

            .name {
                padding-left: 40px !important;
            }

        }
    }

    .float-option {
        position: fixed;
        z-index: 999;
        bottom: 30px;
        right: 30px;
        width: 130px;
        transition: all .2s linear;

        >.change-direction {
            height: 30px;
            opacity: 0;
            transition: all .2s linear;
            transform: translateY(10px);
        }

        &:hover .change-direction {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    .float-option-active {
        opacity: 0;
    }

    .float-option-l {
        bottom: 30px;
        left: 30px;
    }

    .float-option-small {
        position: fixed;
        right: 0;
        left: auto;
        bottom: 30px;
        width: 20px;
        height: 40px;
        background-color: @background-color;
        z-index: 1000;
        border-top-left-radius: @border-ra;
        border-bottom-left-radius: @border-ra;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
        color: @font-color;

    }

    .float-option-small-l {
        left: 0;
        right: auto;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: @border-ra;
        border-bottom-right-radius: @border-ra;
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
            padding-left: 7%;
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

.hide-option {
    opacity: 0;
    transform: translateX(100px);
}

.hide-option-l {
    opacity: 0;
    transform: translateX(-100px);
}

.hide-option-small {
    opacity: 1 !important;
}


.title-way-enter-from {
    transform: translateY(-100px);
}

#left-drawer{
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    >.el-input{
        order: 1;
    }
}

//开始过度了
.title-way-enter-active {
    transition: all .2s linear;
}

//过度完成
.title-way-enter-to {
    opacity: 1 !important;
    transform: translateY(0px);
}

//离开的过度
.title-way-leave-from {
    transform: translateY(0px);

}

//离开中过度
.title-way-leave-active {
    transition: all .2s linear;
}

//离开完成
.title-way-leave-to {
    transform: translateY(-100px);
}


//开始过度
.sm-option-enter-from {
    opacity: 0 !important;
}

//开始过度了
.sm-option-enter-active {
    transition: all .2s linear;
}

//过度完成
.sm-option-enter-to {
    opacity: 1 !important;
}

//离开的过度
.sm-option-leave-from {
    opacity: 1 !important;
}

//离开中过度
.sm-option-leave-active {
    transition: all .2s linear;
}

//离开完成
.sm-option-leave-to {
    opacity: 0 !important;
}
</style>