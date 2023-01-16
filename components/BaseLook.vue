<template>
  <div style="height:100vh;">
    <NuxtLayout name="container">
      <template #left>
        <!-- <Transition name="switch"> -->
          <Component :is="comps[flag]"></Component>
        <!-- </Transition> -->
      </template>
      <template #option>
        <div class="option">
          <div v-for="(val, index) in tagslen" @click="change(index)" :class="{ active: flag == index }" :key="index">{{tags[index]}}
          </div>
        </div>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </NuxtLayout>
  </div>
</template>
  
<script setup lang="ts">
import { useApp } from '@/stores'
import { Ref } from 'vue'

const AppPinia = useApp()
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')
const MyMessage = resolveComponent('MyMessage')
const TagList = resolveComponent('TagList')
const Directory = resolveComponent('Directory')
const comps = shallowRef([MyMessage, TagList,Directory])
const tags = ref(['站点信息', '标签云','目录'])
const tagslen = ref(2)
let flag = ref(0)
const change = (num: number) => {
  flag.value = num;
}

const directory = toRef(AppPinia,'directory')
watch(directory,()=>{
    if(directory.value == -1){
        flag.value = 0
        tagslen.value = 2
    }else{
        flag.value = 2
        tagslen.value = 3
    }
},{immediate:true})
</script>
  
<style scoped lang="less">
.option {
  width: 60%;
  display: flex;
  justify-content: space-between;
  color: @font-color;
  user-select: none;
  order: 3;

  >div {
    height: 25px;
    box-sizing: border-box;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
      color: @font-color-hover;
      border-color: @font-color-hover;
    }
  }

  .active {
    border-bottom: 2px solid @font-color;
  }
}

//开始过度
.switch-enter-from {
  opacity: 0;
}

//开始过度了
.switch-enter-active {
  transition: all .2s linear;
}

//过度完成
.switch-enter-to {
  opacity: 1;
}
</style>