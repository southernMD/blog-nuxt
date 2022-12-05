<template>
  <div style="height:100vh;">
    <NuxtLayout name="container">
      <template #left>
        <!-- <Transition name="switch"> -->
          <Component :is="comps[flag]" :directory="flag == 2 ? directory : undefined "></Component>
        <!-- </Transition> -->
      </template>
      <template #option>
        <div class="option">
          <div v-for="(val, index) in tags" @click="change(index)" :class="{ active: flag == index }" :key="index">{{tags[index]}}
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
const tags = ref(['站点信息', '标签云'])
let flag = ref(0)
const change = (num: number) => {
  flag.value = num;
}

const props = defineProps<{
  directory?:any
}>()

if(props.directory != undefined){
  tags.value.push('目录')
  flag.value = 2
}

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