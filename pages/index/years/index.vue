<template>
    <div class="search-block" v-show="$route.query.searchType">
      <span>{{ $route.query.searchType === 'tag' ? '标签搜索' : '关键词搜索' }}</span>
      <span>"{{ $route.query.searchKey }}"</span>
    </div>
    <div class="article-list">
      <ArticleItem v-for="(val, index) in ArticlesList" :key="val.id" :ArticlesList="ArticlesList[index]" />
      <div class="noData" v-show="ArticlesList?.length == 0">
        暂无内容
      </div>
    </div>
    <div>
      <el-pagination background layout="prev, pager, next" :page-count="total" v-model:currentPage="nowPage" />
    </div>
</template>


<script setup lang="ts">
import { ElDrawer, ElScrollbar, ElPagination } from 'element-plus'
import { Ref } from 'vue'
import { useApp, useOneArticle } from '~~/stores';
import _ from 'lodash'
const { throttle } = _

const AppPinia = useApp()
const OneArticle = useOneArticle()

const SearchDrawerFlag = toRef(AppPinia, 'SearchDrawerFlag')
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const $route = useRoute()
let toTopFlag = toRef(AppPinia, 'toTopFlag')
let toTopFlagim = toRef(AppPinia, 'toTopFlagim')
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')
let windowWidth = toRef(AppPinia, 'windowWidth')
const taglist = toRef(OneArticle, 'tags_list_years')
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
const barScrollthrottle = throttle(barScroll, 800)
const path2 = toRef($route, 'path')
watch(path2, () => {
  console.log(path2);
  setTimeout(() => {
    scrollbarRef.value!.update()
  })
})
const ArticlesList = toRef(AppPinia, 'ArticlesListYear') as unknown as Ref<ArticleObj[]>
const total = toRef(AppPinia, 'totalPages')

onMounted(async () => {
  if (!$route.query.searchType) {
    const HttpRequestArticlesList = await useGetArticlesList(nowPage.value, 5, '', 1) as ArticleListHttp<ArticleObj[]>
    ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
    total.value = HttpRequestArticlesList.totalPages
  }
})
const nowPage = toRef(AppPinia, 'nowPage')

watch(nowPage, async () => {
  if (!$route.query.searchType) {
    const HttpRequestArticlesList = await useGetArticlesList(nowPage.value, 5, '', 1) as ArticleListHttp<ArticleObj[]>
    ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
    AppPinia.toTopFlag = true
  }
})

const $router = useRouter()
const searchByTag = async (key: string) => {
  nowPage.value = 1
  const HttpRequestArticlesList = await useGetArticlesList(1, 5, key, 2) as ArticleListHttp<ArticleObj[]>
  ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
  total.value = HttpRequestArticlesList.totalPages
  $router.push({
    path: '/years',
    query: {
      searchType: 'tag',
      searchKey: key
    }
  })
}
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

  .noData {
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

.search-block {
  width: 100%;
  height: 150px;
  background: @background-color-op;
  border-radius: @border-ra;
  margin-bottom: 20px;
  display: flex;
  justify-self: start;
  align-items: center;

  span:first-child {
    margin-left: 20px;
    font-size: 25px;
    color: @font-color;
  }

  span:last-child {
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

</style>