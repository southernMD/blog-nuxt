<template>
    <div class="home">
        <div class="top">
            <div class="left rush">
                <el-carousel trigger="click" height="300px" arrow="never" :interval="5000">
                    <el-carousel-item>
                        <img src="~~/assets/q1.jpg" alt="">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="~~/assets/q2.jpg" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="right">
                首页：如你所见<br>
                文章：笔记与技术<br>
                留言板：字面意思<br>
                <!-- 实验室：demo<br> -->
                十年：生活<br>
                关于：字面意思<br>
            </div>
        </div>
        <div class="bottom">
            本站接入gravatar头像系统，只要提前在gravatar上设置头像并回复时填写email就可以显示头像。<br>
            一个只会写音乐播放器的程序员。
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElCarousel, ElCarouselItem, ElImage } from 'element-plus';
</script>

<style scoped lang="less">
.home {
    width: 100%;
    height: 570px;
    background-color: @background-color-op;
    border-radius: @border-ra;
    display: flex;
    flex-direction: column;
    .top{
        display: flex;
        flex-direction: row;
        .rush {
            width: 50%;
            margin-left: 20px;
            margin-top: 20px;

            img {
                height: 100%;
                width: 100%;
                border-radius: @border-ra;
                object-fit: cover;
            }
        }
        .right{
            width: calc(50% - 10px);
            margin-left: 20px;
            margin-top: 20px;
            color: @font-color;
            line-height: 20px;
            letter-spacing:5px;
        }
    }
    .bottom{
        margin-left: 20px;
        margin-top: 20px;
        color: @font-color;
        font-size: 18px;
    }
}
@media (max-width:750px){
    .top{
        flex-direction: column !important;
    }
    .rush{
        width: calc(100% - 40px) !important;
    }
    .right{
        width: 100% !important;
        margin-top: 20px;
    }
}
</style>