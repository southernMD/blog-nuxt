<template>
    <div>
        <el-image :src="imgSrc" style="width:300px; height: 200px;" fit="cover">
            <template #placeholder>
                <div></div>
            </template>
        </el-image>
        <img draggable="false" src="https://gravatar.loli.net/avatar/e6b6cb8333565fd6cff15e3c8ba8ade1?s=80" alt="">
        <div class="name">南山有壶酒</div>
        <div class="yiyan">
            <span>{{ yiyan }}</span>
        </div>
        <div class="nav-list">
            <div class="nav" v-for="(val, index) in navMessage" :key="val">
                <div class="nav-item">
                    <div class="title">{{ navTitle[index] }}</div>
                    <div class="number">{{ val }}</div>
                </div>
            </div>
        </div>
        <div class="link">
            <NuxtLink to="https://github.com/southernMD" target="_blank">
                <div class="github">
                    <i class="iconfont icon-github"></i>
                    <span>gihub</span>
                </div>
            </NuxtLink>
            <NuxtLink to="https://gitee.com/southernMD" target="_blank">
                <div class="gitee">
                    <i class="iconfont icon-gitee"></i>
                    <span>gitee</span>
                </div>
            </NuxtLink>
        </div>
    </div>

</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { ElImage, ElAvatar } from 'element-plus';
const imgObj = await useGetImage() as ResOptions<any>
const { public: { VITE_PACK_ENV } } = useRuntimeConfig() // 3.0正式版环境变量要从useRuntimeConfig里的public拿
let imgSrc = ref() as Ref<ResOptions<any>>
if (VITE_PACK_ENV == 'build') {
    imgSrc.value = imgObj.result[1]
} else {
    imgSrc.value = imgObj.result[0]
}
const navMessage = [0, 0, 0]
const navTitle = ['文章', '分类', '标签']
const yiyan = await useGetYiYan()

</script>

<style scoped lang="less">
.el-image {
    border-radius: @border-ra;
    user-select: none;

    img {
        user-select: none;
    }
}

img {
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

.name {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 125px;
    top: calc(200px - 50px + 120px);
    color: @font-color;
    font-weight: bolder;
    font-size: 25px;
    user-select: none;
}

.yiyan {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(200px - 50px + 170px);
    margin: 0 auto;
    width: 100%;

    >span {
        display: inline-block;
        width: 100%;
        text-align: center;
        color: @font-color;
    }
}

.nav-list {
    height: 40px;
    width: 125px;
    position: absolute;
    bottom: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;

    .nav {
        display: flex;

        &:not(:last-child)::after {
            content: '';
            margin: 0 6px;
            height: 80%;
            width: 0px;
            border-right: 1px solid @split-color;
        }
    }

    .nav-item {
        display: flex;
        flex-direction: column;
        width: 32px;
        justify-content: center;
        align-items: center;
        color: @font-color;

        .title {
            width: 100%;
            user-select: none;
        }

        .number {
            user-select: none;
            height: 20px;
            margin-top: 5px;
        }
    }
}

.link {
    position: absolute;
    bottom: 70px;
    left: 0;
    right: 0;
    width: 150px;
    margin: 0 auto;
    display: flex;

    a {
        margin: 0 5px;

        div {
            display: flex;

            i,
            span {
                color: @font-color;
                display: inline-flex;
                user-select: none;
            }

            i {
                margin-right: 5px;
            }
        }

    }

}
</style>