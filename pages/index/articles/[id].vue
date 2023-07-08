<template>
  <Head>
    <Title>南山有壶酒-文章-{{ss.msg?.title}}</Title>
    <!-- <Meta name="description" :content="ss.msg?.title+ss.msg?.title2"></Meta> -->
  </Head>
  <div class="contain" v-if="can">
    <div class="img" draggable="false">
    <el-image :src="ss.msg?.imgUrl" fit="cover" draggable="false"></el-image>
    <div class="msg">
      <div class="title" @click.stop>
        {{ ss?.msg.title }}
      </div>
      <div class="icons" @click.stop>
        <div class="time">
          <el-icon>
            <Calendar />
          </el-icon>
          <span>{{ ss.msg?.time }}</span>
          &nbsp;|
        </div>
        <div class="pl">
          <el-icon>
            <ChatDotRound />
          </el-icon>
          <span>{{ ss.msg?.comments }}</span>
          &nbsp;|
        </div>
        <div class="see">
          <el-icon>
            <View />
          </el-icon>
          <span>{{ ss.msg?.click }}</span>
        </div>
        <div class="tags">
          <el-tag size="small" v-for="(val, index) in (ss.tags)" :key="index">{{ val }}</el-tag>
        </div>
      </div>
      <div class="title2" v-show="true" @click.stop>
        {{ ss.msg?.title2 }}
      </div>
    </div>
    </div>
    <div class="md-editor-bk">
      <md-editor v-model="ss.Text" preview-only :theme="theme" editorId="MD" />
    </div>
    <div class="cc">
      <p class="p1">标题：{{ss.msg?.title}}</p>
      <p class="p2">作者：southernMD</p>
      <p class="p3">发布于：<a :href="href">{{href}}</a></p>
    </div>
    <MyForm :article_id="+ss.id"></MyForm>
    <div class="comment-list">
      <CommentList :list="ss.list"></CommentList>
    </div>
  </div>
  <div class="contain no" v-else>
    对象不可访问
  </div>
</template>

<script setup lang="ts">
import { useApp,useOneArticle } from '~~/stores';
import { Ref } from 'vue';
import MdEditor, { Themes } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { Calendar, ChatDotRound, View } from '@element-plus/icons-vue';
import { ElImage, ElIcon, ElTag, ElDivider, ElInput, ElButton, ElMessage, ElForm, ElFormItem, FormRules, FormInstance } from 'element-plus';
const MdCatalog = MdEditor.MdCatalog;
const $route = useRoute()
const $router = useRouter()
const AppPinia = useApp()
const OneArticle = useOneArticle()
const can = ref(true)
// const id = ref(0) as Ref<number>;
// const article:Ref<any> = ref()
// const msg:Ref<any> = ref()
// const Text = ref()
// const tags = ref()
const ss = reactive<{
  id:any,
  article:any,
  msg:any,
  Text:any,
  tags:any,
  list:any
}>({
  id:toRef(OneArticle.ss,'id'),
  article:toRef(OneArticle.ss,'article'),
  msg:toRef(OneArticle.ss,'msg'),
  Text:toRef(OneArticle.ss,'Text'),
  tags:toRef(OneArticle.ss,'tags'),
  list:toRef(OneArticle.ss,'list')
})

onMounted(async()=>{
  console.log($route.params.id);
  ss.id = +$route.params.id
  ss.article = await useGetArticle(ss.id,AppPinia)
  if(ss.article){
    if(ss.article.result.length == 0){
      can.value = false
    }
    ss.msg = ss.article.result[0] as ArticleObj
    ss.Text = ss.msg.text
    ss.tags = ss.msg.tags.length == 0 ? [] : ss.msg.tags.split(',')
  }
  ss.list = (await useGetArticleComment(ss.id)).result
})
const theme = toRef(AppPinia, 'theme') as Ref<Themes>
// const scrollElement = document?.documentElement;

AppPinia.toTopFlagim = true

const href = ref('')
onMounted(() => {
  setTimeout(() => {
    const hash = window.location.hash;
    href.value = window.location.href
    if(hash){
        const dom = document.querySelector(hash)
        if(dom){
            dom.scrollIntoView()
        }
    }
  })
})

</script>

<style scoped lang="less">
.contain{
  width: 100%;
}
.no{
  height: 300px;
  background-color: @background-color-op;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: @border-ra;

}
.img {
  // background-color: @background-color-op;
  width: 100%;
  border-radius: @border-ra;
  position: relative;
  z-index: 0;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .5);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    border-radius: @border-ra;

  }

  .msg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;

    .icons {
      display: flex;
      user-select: none;

      >* {
        display: flex;
        align-items: center;
        margin-right: 5px;
      }

      .time {
        >span {
          line-height: 20px;
        }
      }

      .tags {
        .el-tag {
          background: none;
          border-color: @font-color;
          margin-right: 5px;
        }
      }
    }

    :deep(.el-tag) {
      background: none;
      color: @font-color;
    }

    .title {
      font-size: 30px;
      letter-spacing: 5px;
      // margin-top: -60px;
      margin-bottom: 10px;
      white-space: nowrap;
    }

    .title2 {
      margin-top: 10px;
    }
  }

  .el-image {
    width: 100%;
    height: 250px;
    border-radius: @border-ra;
  }
}

div::selection,
span::selection {
  background: rgba(255, 255, 255, .6) !important;
}

div::-moz-selection,
span::-moz-selection {
  background: rgba(255, 255, 255, .6) !important;
}

div::-webkit-selection,
span::-moz-selection {
  background: rgba(255, 255, 255, .6) !important;
}

.md-editor {
  background: none;
  width: calc(100% - 10px - 10px);
  margin: 10px 10px;
}

.md-editor-bk {
  width: 100%;
  margin-top: 5px;
  border-radius: @border-ra;
  background-color: @background-color-op;
}

.cc{
  background-color: @background-color-op;
  height: 60px;
  width: 100%;
  margin-top: 10px;
  border-radius: @border-ra;
  display: flex;
  align-items: center;
  color:@font-color;
  a{
  color:@font-color;
  }
  p{
    margin: 10px 10px;
  }
  .p1,.p2,.p3{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.comment-list {
  width: 100%;
}
</style>