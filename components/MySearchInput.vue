<template>
    <el-input v-model="searchVal" :placeholder="`search in ${$route.path.includes('years') ? 'years' : 'station'} ...`"
        @keydown.enter="goSearch">
        <template #suffix>
            <i class="iconfont icon-search" style="font-size:18px;cursor: pointer;" @click.self="goSearch"></i>
        </template>
    </el-input>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus';

let searchVal = ref('')

const goSearch = () => {
    console.log(searchVal.value);
    searchVal.value = ''
}
</script>

<style scoped lang="less">
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
</style>