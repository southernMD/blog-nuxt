<template>
  <Head>
    <Title>南山有壶酒-音乐</Title>
    <Meta name="keywords" content="南山有壶酒-音乐">
    </Meta>
    <Meta name="description" content="南山有壶酒-音乐">
    </Meta>
  </Head>
  <div class="about">
    <div class="top">
      <div class="img" ref="imgFatherRef">
        <el-image draggable="false" style="min-width: 240px;" :style="{ width: coverWidth + 'px', height: coverHeigh + 'px' }"
          :src="musicList[playIndex].coverUrl" />
      </div>
      <div class="message">
        <div class="name">{{ musicList[playIndex].name }}</div>
        <div class="ar-al">{{ musicList[playIndex].ar }}-{{ musicList[playIndex].al }}</div>
        <el-scrollbar>
          <div class="lrc">
            <div class="two-line">
              <div class="team" v-for="(item, index) in (lrcArray)" >
                <!-- :class="{
                active:AppPinia.songTime >= lrcArray[index].time && AppPinia.songTime <= (lrcArray[index+1]?.time ?? Number.MAX_VALUE)
                }" -->
                <div class="lrc-one" >{{ lrcArray[index].lyric }}</div>
                <div class="lrc-translate" v-if="useBoolean(musicList[playIndex].ifTranslate)">{{ getLrc(index) }}</div>
              </div>
            </div>
            <!-- <div class="one-line" v-if="traArray.length==0">
              <div class="lrc-two"></div>
            </div> -->
          </div>
        </el-scrollbar>

      </div>
    </div>
    <div class="bottom">
      <div class="btn" @click="chagnePlay">
        <i class="iconfont icon-gf-play" v-if="!AppPinia.music" ></i>
        <i class="iconfont icon-zanting" v-else></i>
      </div>
      <div class="next" @click="next">
        <i class="iconfont icon-xiayishou" ></i>
      </div>
      <div class="moveing-line">
        <div class="color-line" :style="{width:colorRight + '%'}">
          <div class="ball"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApp } from '@/stores';

// const aboutHtml = (await useAboutHtml() as ArticleListHttp<ArticleObj[]>).result
const AppPinia = useApp()
const coverWidth = ref(240)
const coverHeigh = ref(240)
const imgFatherRef = ref<HTMLElement>()
const playIndex = toRef(AppPinia, 'playIndex')
const musicList = toRef(AppPinia, 'musicList')
const ifOneLine = toRef(AppPinia, 'ifOneLine')
const lrcArray = toRef(AppPinia, 'lrcArray')
const traArray = toRef(AppPinia, 'traArray')
const songTime = toRef(AppPinia, 'songTime')
onMounted(() => {
  const resizeObserver = new ResizeObserver(entries => {
    // entries 是一个 ResizeObserverEntry 对象的数组，每个对象表示一个被观察元素的信息
    for (let entry of entries) {
      // 获取盒子的新宽度
      const newWidth = entry.contentRect.width;
      console.log('盒子的宽度变为：', newWidth);
      coverWidth.value = newWidth * 0.7 < 240 ? 240 : newWidth * 0.7
      coverHeigh.value = coverWidth.value
      // 在这里可以执行任何你想要的操作，比如更新界面等
    }
  });

  // 开始观察盒子元素的大小变化
  resizeObserver.observe(imgFatherRef.value!);
})

const getLrc = (index: number) => {
  try {
    for (let i = 0; i < traArray.value?.length; i++) {
      if (
        traArray.value[i]?.time >= lrcArray.value[index]?.time &&
        traArray.value[i]?.time < lrcArray.value[index + 1]?.time
      ) {
        return traArray.value[i].lyric;
      }
    }
  } catch (error) {
    return
  }
}
const colorRight = ref(0)
watch(songTime,()=>{
  // console.log(songTime.value,AppPinia.songDuration);
  
  colorRight.value = isNaN(songTime.value / AppPinia.songDuration * 100) ? 0:songTime.value / AppPinia.songDuration * 100
},{immediate:true})

const next = ()=>{
  console.log('asdas');
  AppPinia.next++
}

const chagnePlay = ()=>{
  AppPinia.chagnePlay = !AppPinia.chagnePlay
}
</script>

<style scoped lang="less">
.about {
  width: 100%;
  min-height: 600px;
  background-color: @background-color-op;
  border-radius: @border-ra;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .top {
    width: 96%;
    height: 80%;
    margin: 2%;
    margin-bottom: 20px;
    display: flex;

    .img {
      width: 47.5%;
      height: 100%;
      margin-right: 2.5%;
      display: flex;
      justify-content: center;
      align-items: center;

      .el-image {
        border-radius: .2em;
        user-select: none;
      }
    }

    .message {
      width: 47.5%;
      margin-left: 2.5%;
      height: 100%;
      color: @font-color;
      display: flex;
      align-items: center;
      flex-direction: column;

      .name {
        font-size: 25px;
        height: 30px;
        margin: 2%;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .ar-al {
        height: 25px;
        max-width: 100%;
        margin-bottom: 2%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

       .lrc {
        height: 440px;
        max-width: 100%;
        .two-line{
          .team{
            margin-bottom: 20px;
            >div{
              height: 17px;
              margin-bottom: 5px;
              overflow: hidden;
              white-space: nowrap;
              width: 100%;
              max-width: 500px;
            }
          }
        }
        .one-line{
          >div{
            margin-bottom: 20px;
            height: 17px;
          }
        }
      }
    }
    // background-color: red;
  }

  .bottom {
    width: 96%;
    height: 10%;
    display: flex;
    align-items: center;
    // background-color: red;
    .btn{
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2em;
      background-color: @background-btn;
      color: @font-color;
      margin-right:10px  ;
      cursor: pointer;
    }
    .next{
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2em;
      background-color: @background-btn;
      color: @font-color;
      margin-right:20px  ;
      cursor: pointer;
    }
    .moveing-line{
      width: calc(100% - 80px);
      background-color: @background-btn;
      height: 6px;
      border-radius: 2em;
      position: relative;
      .color-line{
        position: absolute;
        left: 0;
        width: 20%;
        background-color: @font-color;
        height: 6px;
        border-radius: 2em;
        .ball{
          position: absolute;
          right: 0;
          top:-3px;
          width: 12px;
          height: 12px;
          background-color: @font-color;
          border-radius: 2em;
          cursor: pointer;
          border: 1px solid @split-color;
        }
      }
    }
  }
  .active{
    color: @font-active-color;
  }
}
@media (max-width:750px) {
  .top{
    display: flex;
    flex-direction: column;
    align-items: center;
    .message{
      .name{
        font-size: 15px !important;
        height: 20px !important;
      }
      .ar-al{
        font-size: 12px !important;
      }
    }
    .lrc{
      height: 200px !important;
      font-size: 12px !important;
    }
    .team >div{
      max-width: 300px !important;
    }
  }
}
</style>