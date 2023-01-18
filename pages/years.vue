<template>

  <Head>
    <Title>南山有壶酒-十年生死</Title>
    <Meta name="author" content="southernMD">
    </Meta>
    <Meta name="keywords" content="南山有壶酒,十年生死">
    </Meta>
    <Meta name="viewport" content="width=device-width,initial-scale=1">
    </Meta>
    <Meta name="description" content="南山有壶酒-十年生死">
    </Meta>
  </Head>
  <NuxtLayout name="maintemplate">
    <template #default>
      <el-scrollbar ref="scrollbarRef" @scroll="barScroll">
        <div style="height:100vh;">
          <NuxtLayout name="container">
            <template #left>
              <div class="title">分类</div>
              <el-scrollbar>
                <ul class="list">
                  <li v-for="val in 24">
                    <span>tags </span>
                    <span>(2)</span>
                  </li>
                </ul>
              </el-scrollbar>
            </template>
            <template #right>
              <div class="search-block" v-show="$route.query.searchType"></div>
              <div class="article-list">
                <ArticleItem v-for="(val, index) in ArticlesList" :key="val.id" :ArticlesList="ArticlesList[index]" />
              </div>
              <el-pagination background layout="prev, pager, next"  :page-count="total"
                v-model:currentPage="nowPage" />
            </template>
          </NuxtLayout>
        </div>

      </el-scrollbar>
    </template>
  </NuxtLayout>
  <el-drawer v-if="$route.path.includes('years')" direction="ltr" v-model="SearchDrawerFlag" :append-to-body="true"
    :show-close="false" :with-header="false" size="70%">
    <my-search-input></my-search-input>
    <div class="drawer-ltr-bk">
      <div class="title">分类</div>
      <el-scrollbar>
        <ul class="list">
          <li v-for="val in 24">
            <span>tags(2) </span>
          </li>
        </ul>
      </el-scrollbar>
    </div>

  </el-drawer>
</template>

<script setup lang="ts">
import { ElDrawer, ElScrollbar, ElPagination } from 'element-plus'
import { Ref} from 'vue'
import { useApp,useOneArticle } from '~~/stores';
const AppPinia = useApp()
const OneArticle = useOneArticle()

const SearchDrawerFlag = toRef(AppPinia, 'SearchDrawerFlag')
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const $route = useRoute()
let toTopFlag = toRef(AppPinia, 'toTopFlag')
let toTopFlagim = toRef(AppPinia, 'toTopFlagim')
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')
let windowWidth = toRef(AppPinia, 'windowWidth')
// const searchFlag = toRef(AppPinia,'searchFlag')

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

const goToTop = (behavior: string) => {
  scrollbarRef.value!.scrollTo({
    top: 0,
    behavior
  })
}

const barScroll = (scrollObj: any) => {
  // console.log(scrollObj.scrollTop);
  scrollbarVal.value = scrollObj.scrollTop
}

const path2 = toRef($route, 'path')
watch(path2, () => {
  console.log(path2);
  setTimeout(() => {
    scrollbarRef.value!.update()
  })
})
const ArticlesList  = toRef(AppPinia,'ArticlesListYear') as unknown as Ref<ArticleObj[]>
const total = toRef(AppPinia,'totalPages')

onMounted(async()=>{
  if(!$route.query.searchType){
    const HttpRequestArticlesList = await useGetArticlesList(nowPage.value, 5,'',1) as ArticleListHttp<ArticleObj[]>
    ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
    total.value = HttpRequestArticlesList.totalPages
  }
})
const nowPage = toRef(AppPinia,'nowPage')

watch(nowPage, async () => {
  if(!$route.query.searchType){
    const HttpRequestArticlesList = await useGetArticlesList(nowPage.value, 5, '', 1) as ArticleListHttp<ArticleObj[]>
    ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
  }
})


</script>

<style scoped lang="less">
.title {
  font-size: 20px;
  color: @font-color;
  margin-top: 10px;
  margin-left: 10px;
  user-select: none;
}

.drawer-ltr-bk {
  height: 500px;
  position: relative;
  z-index: 3;
}

.list {
  width: 100%;
  min-height: 300px;
  height: auto;
  margin-top: 10px;

  li {
    width: 100%;
    user-select: none;
    // background-color: red;
    height: 40px;
    line-height: 40px;

    >span {
      cursor: pointer;
      color: @font-color;
      padding-left: 20px;

      &:hover {
        color: @font-color-hover;
      }
    }

  }
}

.article-list {
  width: 100%;

  .article-item-year {
    width: 100%;
    height: 500px;
    background: @background-color-op;
    margin-bottom: 50px;
    border-radius: @border-ra ;
  }
}

.search-block {
  width: 100%;
  height: 150px;
  background: red;
  border-radius: @border-ra;
  margin-bottom: 20px;
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
</style>