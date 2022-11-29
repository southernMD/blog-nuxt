<template>
  <div class="article">
    <BaseLook>
      <template #right>
        <div class="search-block" v-show="false"></div>
        <div class="article-list">
          <ArticleItem v-for="(val,index) in ArticlesList" :key="val.id" :ArticlesList="ArticlesList[index]"/>
        </div>
        <el-pagination background layout="prev, pager, next" :page-count="total" v-model:currentPage="nowPage"/>
      </template>
    </BaseLook>
  </div>
</template>

<script setup lang="ts">
import { ElPagination } from 'element-plus';
const HttpRequestArticlesList = await useGetArticlesList(1,5) as ArticleListHttp<ArticleObj[]>
const ArticlesList  = ref(HttpRequestArticlesList.result as ArticleObj[])
const total = ref(HttpRequestArticlesList.totalPages)
const nowPage = ref(1)
watch(nowPage,async()=>{
  const HttpRequestArticlesList = await useGetArticlesList(nowPage.value,5) as ArticleListHttp<ArticleObj[]>
    ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
})
</script>

<style scoped lang="less">
.search-block {
  width: 100%;
  height: 150px;
  background: red;
  border-radius: @border-ra;
  margin-bottom: 20px;
}

.el-tag {
  background-color: rgba(0, 0, 0, 0);
  margin: 5px 5px;
  user-select: none;
  cursor: pointer;
}

.article {
  margin-bottom: 50px;

  .article-list {
    width: 100%;
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