<template>
  <BaseLook :componentList="['MyMessage', 'TagList', 'Directory']" :tagsName="['站点信息', '标签云', '目录']"
    :directory="`${id}`">
    <template #right>
      <div class="img" draggable="false">
        <el-image :src="msg.imgUrl" fit="cover" draggable="false"></el-image>
        <div class="msg">
          <div class="title" @click.stop>
            {{ msg.title }}
          </div>
          <div class="icons" @click.stop>
            <div class="time">
              <el-icon>
                <Calendar />
              </el-icon>
              <span>{{ msg.time }}</span>
              &nbsp;|
            </div>
            <div class="pl">
              <el-icon>
                <ChatDotRound />
              </el-icon>
              <span>{{ msg.comments }}</span>
              &nbsp;|
            </div>
            <div class="see">
              <el-icon>
                <View />
              </el-icon>
              <span>{{ msg.click }}</span>
            </div>
            <div class="tags">
              <el-tag size="small" v-for="(val, index) in (tags)" :key="index">{{ val }}</el-tag>
            </div>
          </div>
          <div class="title2" v-show="true" @click.stop>
            {{ msg.title2 }}
          </div>
        </div>
      </div>
      <div class="md-editor-bk">
        <md-editor v-model="Text" preview-only :theme="theme" editorId="MD" />
      </div>
      <div class="comment">
        <div class="title">评论</div>
        <el-divider></el-divider>
        <div class="line" v-for="(val, index) in 3" :class="{ 'line-none': must[index] }">
          <div class="detail">{{ inptsDetail[index] }}</div>
          <el-input v-model="inpts[index]" :placeholder="placeholder[index]"></el-input>
        </div>
        <div class="txt" :class="{ 'txt-none': must[3] }">
          <div class="detail">评论</div>
          <el-input v-model="inpts[3]" :rows="4" type="textarea" placeholder="说点什么" resize="none" />
        </div>
        <el-button type="success" @click="submit">提交评论</el-button>
      </div>
    </template>
  </BaseLook>
</template>

<script setup lang="ts">
import { useApp } from '~~/stores';
import { Ref } from 'vue';
import MdEditor, { Themes } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { Calendar, ChatDotRound, View } from '@element-plus/icons-vue';
import { ElImage, ElIcon, ElTag, ElDivider, ElInput, ElButton, ElMessage } from 'element-plus';
import { fa } from 'element-plus/es/locale';
const MdCatalog = MdEditor.MdCatalog;
const route = useRoute();
const AppPinia = useApp()
const id = ref(route.params.id) as Ref<string>;
const article = await useGetArticle(id.value)
const msg = article.result[0] as ArticleObj
const Text = ref(msg.text)
const theme = toRef(AppPinia, 'theme') as Ref<Themes>
// const scrollElement = document?.documentElement;
const inptsDetail = ref(['昵称', '邮箱', '网站'])
const inpts = ref(['', '', '', ''])
const must = ref([false, false, false, false])
const placeholder = ref(['输入你的昵称', '不填写将收不到回复', '可选'])
const tags = msg.tags.length == 0 ? [] : msg.tags.split(',')

watch(inpts, () => {
  if (inpts.value[0] != '') {
    must.value[0] = false
  }
  if (inpts.value[3] != '') {
    must.value[3] = false
  }
}, { deep: true })

const suo = ref(true)
const submit = async () => {
  if (suo.value) {
    suo.value = false
    let flag = true
    if (inpts.value[0] == '') {
      must.value[0] = true
      flag = false
    } else {
      must.value[0] = false
    }
    if (inpts.value[3] == '') {
      must.value[3] = true
      flag = false
    } else {
      must.value[3] = false
    }
    if (flag == false) {
      ElMessage({
        message: '请填写必填项',
        type: 'error',
        onClose() {
          suo.value = true
        }
      })
    }else{
      const obj = {
        nickname:inpts.value[0],
        email:inpts.value[1],
        _host:inpts.value[2],
        _text:inpts.value[3],
        article_id:+id.value,
        parent_id:null
      }
      try {
        const result =  await usePostComment(obj)
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      flag = true
    }
  }

}
</script>

<style scoped lang="less">
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

.comment {
  width: 100%;
  height: 400px;
  background-color: @background-color-op;
  border-radius: @border-ra;
  margin-top: 10px;
  color: @font-color;

  .title {
    font-size: 18px;
    display: flex;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
  }

  .el-divider {
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    width: 99%;
  }

  .line {
    display: flex;
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;
    margin-left: 20px;

    :deep(.el-input) {
      height: 30px;
      background: none;
      margin-bottom: 20px;
      width: 280px;
      border-radius: @border-ra;

      .el-input__wrapper {
        height: 30px;
        background-color: @background-color-op;
      }

      input {
        color: @font-color;
      }
    }

    .detail {
      height: 30px;
      margin-right: 10px;
      user-select: none;
    }
  }

  .line-none {
    :deep(.el-input__wrapper) {
      box-shadow: 0 0 0 1px red;
    }
  }

  .txt {
    width: 80%;
    margin-left: 20px;
    display: flex;

    .detail {
      width: 55px;
    }

    .detail::before {
      content: '*';
      color: red;
      margin-right: 5px;
    }

    :deep(.el-textarea) {
      background-color: @background-color-op;

      textarea {
        box-sizing: border-box;
        background: none !important;
        color: @font-color;
      }
    }
  }

  .txt-none {
    :deep(.el-textarea__inner) {
      box-shadow: 0 0 0 1px red;
    }
  }

  .el-button {
    margin-left: 20px;
    margin-top: 20px;
    background-color: rgb(102, 204, 255);
    border: none;

    &:hover {
      background-color: rgba(102, 204, 255, .8);
    }
  }
}


.comment .line .detail::before {
  content: ' ';
  white-space: pre;
  color: red;
  margin-right: 7px;
}

.comment .line:nth-of-type(3) .detail::before {
  content: '*';
  color: red;
  margin-right: 5px;
}
</style>