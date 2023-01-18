<template>
    <div class="MyMessage">
        <el-image :src="imgSrc" style="width:300px; height: 200px;" fit="cover">
            <template #placeholder>
                <div></div>
            </template>
        </el-image>
        <img class="header" draggable="false"
            src="https://gravatar.loli.net/avatar/e6b6cb8333565fd6cff15e3c8ba8ade1?s=80" alt="">
        <h1 class="name">南山有壶酒</h1>
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
import { useOneArticle } from '~~/stores';
import { ElImage, ElAvatar, ElSkeleton } from 'element-plus';
const imgObj = await useGetImage() as ResOptions<any>
const result= (await useGetBaseMessage() as ResOptions<{base_message:{tags_number:number,gather_number:number,article_number:number},tags_list:string[],tags_list_years:string[]}>).result
const {base_message,tags_list,tags_list_years} = result as {base_message:{tags_number:number,gather_number:number,article_number:number},tags_list:string[],tags_list_years:string[]}
const { public: { VITE_PACK_ENV } } = useRuntimeConfig() // 3.0正式版环境变量要从useRuntimeConfig里的public拿
const OneArticle = useOneArticle()
let imgSrc = ref() as Ref<ResOptions<any>>
if (VITE_PACK_ENV == 'build') {
    imgSrc.value = imgObj.result[0]
} else {
    imgSrc.value = imgObj.result[0]
}
const navMessage = ref([base_message.article_number,base_message.gather_number,base_message.tags_number])
OneArticle.tags_list = tags_list as any
OneArticle.tags_list_years = tags_list_years as any
const navTitle = ['文章', '分类', '标签']
const yiyan = await useGetYiYan()
</script>

<style scoped lang="less">
.MyMessage {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 461px;
    order: 2;

    >* {
        position: relative;
        z-index: 0;
        margin-top: 20px;
    }
}

.el-image {
    border-radius: @border-ra;
    user-select: none;
    margin-top: 0px;

    img {
        user-select: none;
    }
}

img {
    margin-top: -50px !important;
    user-select: none;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    box-shadow: @box-sh;
}

.name {
    width: 125px;
    color: @font-color;
    font-weight: bolder;
    font-size: 25px;
    user-select: none;
}

.yiyan {
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
        position: relative;
        z-index: 0;

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
    display: flex;
    position: relative;
    z-index: 0;

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