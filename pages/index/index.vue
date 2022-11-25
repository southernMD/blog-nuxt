<template>
    <div style="height:100vh;">
        <NuxtLayout name="container">
            <template #left>
                <Transition name="switch">
                    <Component :is="flag == 0 ? MyMessage : TagList"></Component>
                </Transition>
            </template>
            <template #option>
                <div class="option">
                    <div class="one" @click="change(0)" :class="{ active: flag == 0 }">站点信息</div>
                    <div class="two" @click="change(1)" :class="{ active: flag == 1 }">标签云</div>
                </div>
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

let flag = ref(0)
const change = (num: number) => {
    flag.value = num;
}

</script>

<style scoped lang="less">
.option {
    width: 60%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    color: @font-color;
    user-select: none;

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