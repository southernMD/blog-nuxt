<template>
    <div class="block-gather">
        <div @click.stop class="message" ref="message" :class="{'message-way':orderChange,'show':showflag}">
            <slot name="message"></slot>
        </div>
        <div class="block" ref="block" @mouseover="showMessage" @mouseout="hideMessage">
            <slot name="icon"></slot>
        </div>
    </div>

</template>

<script setup lang="ts">

const el = getCurrentInstance()
type PROPS = {
    height?: string
    width?: string
    orderChange:boolean
}

withDefaults(defineProps<PROPS>(), {
    height: '42px',
    width: '42px'
})

onMounted(() => {
    let dom = el?.refs.block as HTMLElement
    let message = el?.refs.message as HTMLElement
    dom.style.width = el?.props.width as string
    dom.style.height = el?.props.height as string
})

let showflag = ref(false)
const showMessage = ()=>{
    console.log('121231232142');
    showflag.value = true
}
const hideMessage = ()=>{
    showflag.value = false
}

</script>

<style scoped lang="less">
.show{
    opacity: 1 !important;
}
.block-gather {
    display: flex;
    width: 200px;
    margin-top: 10px;
    align-items: center;
    .block {
        width: 42px;
        height: 42px;
        background: @background-color;
        border-radius: @border-ra;
        transition: all .2s linear;
        display: flex;
        justify-content: center;
        align-items: center;
        color: @font-color;
        margin-left: 10px;
        margin-right: 10px;
    }
    .message {
        box-sizing: border-box;
        width: 80px;
        height: 35px;
        background: #31365b;
        border-radius: @border-ra;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: all .2s linear;
        :slotted(.message) {
            color: #bebebe;
            font-weight: bold;
            font-size: 13px;
            user-select: none;
        }

        // top: 0;
        // bottom: 0;
    }
    .message-way{
        order: 2;
    }
}
</style>