<template>

    <Head>
        <Title>南山有壶酒</Title>
        <Meta name="author" content="southernMD">
        </Meta>
        <Meta name="keywords" content="南山有壶酒,未定义人生,南山有壶酒的blog">
        </Meta>
        <Meta name="viewport" content="width=device-width,initial-scale=1">
        </Meta>
        <Meta name="description" content="欢迎来到我的世界">
        </Meta>
    </Head>
    <NuxtLayout name="maintemplate">
        <template #default>
            <el-scrollbar ref="scrollbarRef" @scroll="barScrollthrottle">
                <BaseLook>
                    <template #right>
                        <LazyNuxtPage></LazyNuxtPage>
                    </template>
                </BaseLook>
            </el-scrollbar>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ElScrollbar } from 'element-plus';
import { useApp } from '@/stores'
import _ from 'lodash'
const {throttle} = _
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const AppPinia = useApp()
const $route = useRoute()
let toTopFlag = toRef(AppPinia, 'toTopFlag')
let toTopFlagim = toRef(AppPinia, 'toTopFlagim')
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')
let windowWidth = toRef(AppPinia, 'windowWidth')

watch(toTopFlag, () => {
    if (toTopFlag.value == true) {
        goToTop("smooth")
    }
    toTopFlag.value = false
})

watch(toTopFlagim, () => {
    if (toTopFlagim.value == true) {
        goToTop("instant")
    }
    toTopFlagim.value = false
})

const goToTop = (behavior:string) => {
    console.log('behaviorbehaviorbehavior',behavior);
    scrollbarRef.value!.scrollTo({
        top: 0,
        behavior
    })
}
const path2 = toRef($route,'path')
watch(path2,()=>{
    console.log(path2);
    setTimeout(()=>{
        scrollbarRef.value?.update()
    })
})

const barScroll = (scrollObj: any) => {
    console.log( scrollObj.scrollTop);
    scrollbarVal.value = scrollObj.scrollTop
}
const barScrollthrottle = throttle(barScroll,800)

const flag = useCookie('flag')
onMounted(()=>{
    window.addEventListener('beforeunload', function (event) {
        flag.value = false
    });
})
</script>

<style lang="less">
// .el-scrollbar__thumb {
//     display: none;
// }

.el-drawer__body {
    padding: 0 !important;
    background-image: url(/tamaonsen.jpeg);
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position-x: -150px;
    min-height: 358px;
    height: 1000px;
    overflow: hidden;
    &::before {
        content: '';
        background: @background-modle;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
}
.ltr{
    .el-image{
        width: 100% !important;
    }
    .el-input {
        width: 100% !important;
    }

    &::before {
        content: '';
        background: @background-color-op;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

}
body {
    width: 100% !important;
    scroll-behavior: smooth;
    &::before {
        content: '';
        display: block;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -5;
        background: url(/tamaonsen.jpeg);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
}
.option {
    width: 60%;
    display: flex;
    justify-content: space-between;
    color: @font-color;
    user-select: none;
    position: relative;
    z-index: 0;
    margin: 0 auto;
    margin-top: 5px;
    order: 3;
    >div {
        height: 25px;
        box-sizing: border-box;
        margin: 0 5px;
        cursor: pointer;

        &:hover {
            color: @font-color-hover;
            border-color: @font-color-hover;
        }
    }

    .active {
        border-bottom: 2px solid @font-color;
    }
}
</style>