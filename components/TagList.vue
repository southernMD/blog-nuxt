<template>
    <div class="taglist-bk">
        <div class="inpt">
            <input type="text" v-model="searchVal" @input="debounceSearch" placeholder="Search Tags...">
        </div>
        <div class="taglist">
            <el-scrollbar>
                <el-tag v-for="val in tagsCopy" :key="val" :type="_.sample(tagsColor)" effect="plain">
                    {{ val }}
                </el-tag>
            </el-scrollbar>
        </div>
    </div>

</template>

<script setup lang="ts">
import { Ref } from 'vue'
import _  from 'lodash'
import { ElTag, ElScrollbar } from 'element-plus';
const tags = ref(['electron', 'nodejs', 'b', 'javascript', 'html', 'css', 'c++', 'asd', '十年'])
const tagsCopy = ref(tags.value) as Ref<any>
const tagsColor = ['success', 'warning', 'danger', '']
let searchVal = ref('')
const search = () => {
    tagsCopy.value = []
    tagsCopy.value = tags.value.filter((val) => {
        return val.includes(searchVal.value)
    })
}
const debounceSearch = _.debounce(search, 300)
</script>

<style scoped lang="less">
.taglist-bk{
    order: 2;
}
.inpt {
    height: 40px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid @font-color;
    z-index: 0;
    position: relative;
}

input {
    height: 30px;
    font-size: 20px;
    background: none;
    color: @font-color;
}

.taglist {
    width: 260px;
    margin: 0 auto;
    margin-top: 20px;
    height: 400px;
    max-width: 100%;

    .el-tag {
        background-color: rgba(0, 0, 0, 0);
        margin: 5px 5px;
        user-select: none;
        cursor: pointer;
    }
}
</style>