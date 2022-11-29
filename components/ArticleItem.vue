<template>
    <div class="article-list-item" v-lazy-directive>
        <el-image :src="ArticlesList.imgUrl" fit="cover">
        </el-image>
        <div class="txt">
            <div class="title">
                {{ArticlesList.title}}</div>
            <div class="title2" v-show="true">{{ArticlesList.title2}}
            </div>
            <div class="icons">
                <div class="time">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>{{ArticlesList.time}}</span>
                    &nbsp;|
                </div>
                <div class="pl">
                    <el-icon>
                        <ChatDotRound />
                    </el-icon>
                    <span>{{ArticlesList.comments}}</span>
                    &nbsp;|
                </div>
                <div class="see">
                    <el-icon>
                        <View />
                    </el-icon>
                    <span>{{ArticlesList.click}}</span>
                </div>
                <div class="tags">
                    <el-tag size="small" v-for="(val,index) in (tags)" :key="index">{{val}}</el-tag>
                </div>
            </div>
            <div class="main-txt">
               {{ArticlesList.text}}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Directive,ComponentInternalInstance } from 'vue';
import { Calendar, ChatDotRound, View } from '@element-plus/icons-vue';
import {  ElImage, ElIcon, ElTag } from 'element-plus';
const $el = getCurrentInstance() as ComponentInternalInstance 
defineProps<{
    ArticlesList:ArticleObj
}>()
const tags =($el.props.ArticlesList as ArticleObj).tags.length == 0?[]:($el.props.ArticlesList as ArticleObj).tags.split(',')
const vLazyDirective: Directive = (el: HTMLElement) => {
    console.log(el);
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
            el.classList.add('article-list-item-show')
            const t = setTimeout(() => {
                el.classList.add('article-list-item-limit')
                clearTimeout(t);
            }, 500)
        }
    })
    observer.observe(el)
}

</script>

<style lang="less" scoped>
.article-list-item {
    width: 100%;
    height: 220px;
    background: @background-color-op;
    margin-bottom: 50px;
    transform: rotateX(-180deg);
    border-radius: @border-ra ;
    display: flex;
    align-items: center;
    overflow: hidden;

    .el-image {
        border-radius: @border-ra;
        width: 35%;
        min-width: 35%;
        height: 100%;
        overflow: hidden;
    }
    :deep(img) {
        transition: transform .2s linear;
    }
    &:hover :deep(img) {
        transform: scale(1.1, 1.1);
    }

    &:hover {
        transform: scale(1.01, 1.01);
        box-shadow: @box-sh-string;
    }

    .txt {
        color: @font-color;
        margin-left: 20px;

        >* {
            margin-top: 10px;
        }

        .el-icon {
            margin-right: 5px;
        }

        .icons {
            display: flex;

            >* {
                display: flex;
                align-items: center;
                margin-right: 5px;
            }
            .tags{
                .el-tag{
                    background: none;
                    border-color: @font-color;
                    margin-right: 5px;
                }
            }
        }

        .title {
            font-size: 18px;
            max-width: 80%;
            letter-spacing: 2px;
            line-height: 20px;
            max-height: 40px;
            overflow: hidden;
        }

        .title2 {
            height: 20px;
            max-width: 80%;
            width: 80%;
            max-height: 20px;
            overflow: hidden;
            line-height: 20px;
        }

        .main-txt {
            line-height: 21px;
            max-width: 80%;
            max-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-flex;
        }
    }
}

.article-list-item-show {
    transition: transform .5s linear;
    transform: rotateX(0deg);
}

.article-list-item-limit {
    transition: transform .1s linear !important;
}
</style>