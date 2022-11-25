<template>
    <div class="main" draggable="false">

        <div class="left" :class="{ 'left-f': scrollbarVal > 100 }">
            <slot name="left"></slot>
            <slot name="option"></slot>
        </div>
        <div class="left left-none" :class="{ 'placeholder': scrollbarVal <= 100 }"></div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useApp } from '@/stores'
const AppPinia = useApp()
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')

</script>

<style scoped lang="less">
.main {
    width: 95vw;
    height: auto;
    display: flex;
    margin: 0 auto;
    margin-top: 120px;
    max-width: 1400px;

    .left {
        height: 500px;
        min-width: 300px;
        box-sizing: border-box;
        background: @background-color-op;
        border-radius: @border-ra;
        margin-right: 30px;
        display: none;
        transition: all .2s linear;
        position: relative;
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
        height: 1000px;
        width: 100%;
        box-sizing: border-box;
        background: @background-color-op;
        border-radius: @border-ra;
        margin-bottom: 150px;
        transition: all .2s linear;
    }

    @media (min-width: 915px) {
        .left {
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