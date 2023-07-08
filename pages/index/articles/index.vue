<template>
    <div class="article">
        <div class="search-block" v-show="$route.query.searchType">
            <span>{{$route.query.searchType === 'tag'?'标签搜索':'关键词搜索'}}</span>
            <span>"{{$route.query.searchKey }}"</span>
        </div>
        <div class="article-list">
            <ArticleItem v-for="(val, index) in ArticlesList" :key="val.id"
                :ArticlesList="ArticlesList[index]" />
            <div class="noData" v-show="ArticlesList?.length == 0">
                暂无内容
            </div>
        </div>
        <el-pagination background layout="prev, pager, next" :page-count="total"
            v-model:currentPage="nowPage" />
    </div>
</template>
  
<script setup lang="ts">
import { ElPagination } from 'element-plus';
import {Ref} from 'vue'
import { useApp,useOneArticle } from '~~/stores';
const AppPinia = useApp()
const OneArticle = useOneArticle()
const ArticlesList = toRef(AppPinia,'ArticlesList') as unknown as Ref<ArticleObj[]>
const total = toRef(AppPinia,'totalPages')
// const searchFlag = toRef(AppPinia,'searchFlag')
const $route = useRoute()
const $router = useRouter()
onMounted(async()=>{
    if(!$route.query.searchType){
        const HttpRequestArticlesList = await useGetArticlesList(nowPage.value, 5,'',0) as ArticleListHttp<ArticleObj[]>
        ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
        total.value = HttpRequestArticlesList.totalPages
    }
})
const nowPage = toRef(AppPinia,'nowPage')
watch(nowPage, async () => {
    if(!$route.query.searchType){
        const HttpRequestArticlesList = await useGetArticlesList(nowPage.value, 5,'',0) as ArticleListHttp<ArticleObj[]>
        ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
    }
})
</script>
  
<style scoped lang="less">
.search-block {
    width: 100%;
    height: 150px;
    background: @background-color-op;
    border-radius: @border-ra;
    margin-bottom: 20px;
    display: flex;
    justify-self: start;
    align-items: center;
    color: @font-color;
    span:first-child{
        margin-left: 20px;
        font-size: 25px;
    }
    span:last-child{
        font-size: 30px;
    }
}

.el-tag {
    background-color: rgba(0, 0, 0, 0);
    margin: 5px 5px;
    user-select: none;
    cursor: pointer;
}

.article {
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .article-list {
        width: 100%;
        .noData{
            width: 100%;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: @background-color-op;
            border-radius: @border-ra;
            margin-bottom: 20px;
            font-size: 30px;
            color: @font-color;
        }
    }

    :deep(.el-pagination) {
        margin-bottom: 50px;

        button,
        li {
            border-radius: @border-ra;
            background: @background-color !important;
            color: @font-color !important;
        }

        .is-active {
            background: @background-color-op !important;
        }
    }
}
</style>