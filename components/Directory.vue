<template>
  <div class="catalog-1">
    <el-scrollbar>
      <div class="catalog">
        <md-catalog editorId="MD" @on-click="goLink" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { ElScrollbar } from 'element-plus';
import MdEditor, { Themes } from 'md-editor-v3';
import { TocItem } from 'md-editor-v3/lib/MdEditor/extensions/MdCatalog';
import { useApp } from '~~/stores';
import 'md-editor-v3/lib/style.css';
import { useRouter, useRoute } from 'vue-router'
const MdCatalog = MdEditor.MdCatalog;
const AppPinia = useApp()
const $router = useRouter()
const $route = useRoute()
const theme = toRef(AppPinia, 'theme') as Ref<Themes>

const goLink = (e: MouseEvent, t: TocItem) => {
  console.log(document.querySelector(`a[href="#${t.text}"]`));
  nextTick(() => {
    document.querySelector(`a[href="#${t.text}"]`)!.scrollIntoView(
      {
        block: "start",
      }
    )
  })
}
</script>

<style scoped lang="less">
.catalog-1 {
  order: 2;
}

.catalog {
  height: 461px;
  min-height: 461px;
  width: 200px;
  margin: 0 auto;
}
</style>