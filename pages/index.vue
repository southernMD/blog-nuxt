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
            <el-scrollbar ref="scrollbarRef" @scroll="barScroll">
                <LazyNuxtPage></LazyNuxtPage>
            </el-scrollbar>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ElScrollbar } from 'element-plus';
import { useApp } from '@/stores'
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const AppPinia = useApp()
let toTopFlag = toRef(AppPinia, 'toTopFlag')
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')
let windowWidth = toRef(AppPinia, 'windowWidth')

watch(toTopFlag, () => {
    if (toTopFlag.value == true) {
        goToTop()
    }
    toTopFlag.value = false
})

const goToTop = () => {
    scrollbarRef.value!.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

const barScroll = (scrollObj: any) => {
    // console.log(scrollObj.scrollTop);
    scrollbarVal.value = scrollObj.scrollTop
}
</script>

<style lang="less">
.el-scrollbar__thumb {
    display: none;
}

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
        background: none;
        margin-bottom: 10px;
        width: 100%;
        border-radius: @border-ra;
        margin-top:5px ;
        .el-input__wrapper {
            border-radius: @border-ra;
            width: 100%;
            box-shadow: none !important;
            background-color: @background-color-op;

            input {
                width: 100%;
                color: @font-color;
                font-size: 14px;

                &::placeholder {
                    color: @font-color;
                    opacity: 0.4;
                }
            }
        }
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