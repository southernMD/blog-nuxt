<template>
    <div class="main" draggable="false">
        <div class="left-bk" :class="{ 'left-f': scrollbarVal > 100 }">
            <el-input v-model="searchVal" placeholder="search in station ..." @keydown.enter="goSearch">
                <template #suffix>
                    <i class="iconfont icon-search" style="font-size:18px;cursor: pointer;" @click.self="goSearch"></i>
                </template>
            </el-input>
            <div class="left">
                <slot name="left"></slot>
                <slot name="option"></slot>
            </div>
        </div>
        <div class="left left-none" :class="{ 'placeholder': scrollbarVal <= 100 }"></div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useApp } from '@/stores'
import { ElInput } from 'element-plus';
const AppPinia = useApp()
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')
let searchVal = ref('')

const goSearch = ()=>{
    console.log(searchVal.value);
    searchVal.value = ''
}
</script>

<style scoped lang="less">
.main {
    width: 95vw;
    height: auto;
    display: flex;
    margin: 0 auto;
    margin-top: 120px;
    max-width: 1400px;
    scroll-behavior: smooth;
    .left-bk{
        display: none;
    }

    .left {
        height: 500px;
        min-width: 300px;
        box-sizing: border-box;
        background: @background-color-op;
        border-radius: @border-ra;
        margin-right: 30px;
        transition: all .2s linear;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .el-input {
        background: none;
        margin-bottom: 20px;
        width: 280px;
        border-radius: @border-ra;
        height: 50px;

        :deep(.el-input__wrapper) {
            border-radius: @border-ra;
            width: 280px;
            height: 50px;
            box-shadow: none !important;
            background-color: @background-color-op;

            input {
                width: 280px;
                color: @font-color;
                height: 50px;
                font-size: 18px;

                &::placeholder {
                    color: @font-color;
                    opacity: 0.4;
                }
            }
        }
    }

    .left-none {
        background: none;
        transition: none;
        opacity: 0;
        display: block !important;
    }

    .placeholder {
        display: none !important;
    }

    .left-f {
        position: fixed;
        top: 10px;
        z-index: 5;
    }

    .right {
        height: auto;
        width: 100%;
        box-sizing: border-box;
        // background: @background-color-op;
        // border-radius: @border-ra;
        transition: all .2s linear;
        margin-bottom: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (min-width: 915px) {
        .left-bk {
            display: block;
        }

        .right {
            width: calc(100% - 300px - 20px);
        }
    }

    @media (max-width:915px) {
        .left-none {
            display: none !important;
        }
    }
}

@media (min-width: 915px) {
    .main {
        width: 90vw;
    }
}
</style>