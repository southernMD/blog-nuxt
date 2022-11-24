<template>
    <div style="height:100vh;">
        <div class="main" draggable="false">
            <div class="left" :class="{ 'left-f': scrollbarVal > 100 }">
                <el-image :src="imgSrc" style="width:300px; height: 200px;" fit="cover"></el-image>
                <img  draggable="false" src="https://gravatar.loli.net/avatar/e6b6cb8333565fd6cff15e3c8ba8ade1?s=80" alt="">
                <div class="name">南山有壶酒</div>
                <div class="yiyan">
                    <span>{{yiyan}}</span>
                </div>
            </div>
            <div class="left left-none" :class="{ 'placeholder': scrollbarVal <= 100 }"></div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useApp } from '@/stores'
import {Ref} from 'vue'
import { ElImage,ElAvatar } from 'element-plus';
const AppPinia = useApp()
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')
const imgObj = await useGetImage() as ResOptions<any>
const { public: { VITE_PACK_ENV } } = useRuntimeConfig() // 3.0正式版环境变量要从useRuntimeConfig里的public拿
let imgSrc = ref() as Ref<ResOptions<any>>
if(VITE_PACK_ENV == 'build'){
    imgSrc.value = imgObj.result[1]
}else{
    imgSrc.value = imgObj.result[0]
}
const yiyan = await useGetYiYan()
</script>

<style scoped lang="less">
.main {
    width: 95vw;
    height: auto;
    display: flex;
    margin: 0 auto;
    margin-top: 120px;
    max-width: 1400px;
    .left {
        height: 500px;
        min-width: 300px;
        box-sizing: border-box;
        background: @background-color-op;
        border-radius: @border-ra;
        margin-right: 30px;
        display: none;
        transition: all .2s linear;
        position: relative;
        .el-image{
            border-radius: @border-ra;
        }
        img{
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            top: calc(200px - 50px);
            user-select: none;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            box-shadow: @box-sh;
        }
        .name{
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 130px;
            top: calc(200px - 50px + 120px);
            color: @font-color;
            font-weight: bolder;
            font-size: 25px;
            user-select: none;
        }
        .yiyan{
            position: absolute;
            left: 0;
            right: 0;
            top: calc(200px - 50px + 170px);
            margin: 0 auto;
            width: 100%;
            >span{
                display: inline-block;
                width: 100%;
                text-align: center;
                color: @font-color;
            }
        }
    }

    .left-none {
        background: none;
        transition: none;
        opacity: 0;
        display: block !important;
    }

    .placeholder {
        display: none !important;
    }

    .left-f {
        position: fixed;
        top: 10px;
    }

    .right {
        height: 1000px;
        width: 100%;
        box-sizing: border-box;
        background: @background-color-op;
        border-radius: @border-ra;
        margin-bottom: 150px;
        transition: all .2s linear;
    }

    @media (min-width: 915px) {
        .left {
            display: block;
        }

        .right {
            width: calc(100% - 300px - 20px);
        }
    }
    @media (max-width:915px) {
        .left-none{
            display: none !important;
        }
    }
}

@media (min-width: 915px) {
    .main {
        width: 90vw;
    }
}
</style>