<template>
    <div class="list">
        <div class="title">评论列表（{{ (list.length) }}）</div>
        <el-divider></el-divider>
        <!-- <ClientOnly> -->
        <C1 :message="showList" :deep="1" :key="nanoid(5)"></C1>
        <!-- </ClientOnly> -->
    </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { ElDivider } from 'element-plus';
import { nanoid } from 'nanoid';
import {useOneArticle} from '~~/stores'
// const props = defineProps<{
//     list: any[]
// }>()
const OneArticle = useOneArticle()
const showList = ref([]) as Ref<any>
const list = toRef(OneArticle.ss, 'list') as Ref<any>
watch(list, () => {
    showList.value = []
    for (let i = 0; i < list.value.length; i++) {
        if (list.value[i].parent_id == null) {
            showList.value.push(list.value[i])
        }
    }
}, { immediate: true })



</script>

<style scoped lang="less">
.list {
    width: 100%;
    min-height: 400px;
    background-color: @background-color-op;
    border-radius: @border-ra;
    margin-top: 10px;
    color: @font-color;
    padding-bottom: 20px;

    .title {
        font-size: 18px;
        display: flex;
        height: 40px;
        line-height: 40px;
        margin-left: 20px;
        user-select: none;
    }

    .el-divider {
        margin-top: 0;
    }
}
</style>