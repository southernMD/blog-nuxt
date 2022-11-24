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
                <NuxtPage></NuxtPage>
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
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: -150px;
    min-height: 358px;

    &::after {
        content: '';
        background: @background-modle;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
}

body {
    width: 100% !important;
    &::before {
        content: '';
        display: block;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -2;
        background: url(/tamaonsen.jpeg);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
}

</style>