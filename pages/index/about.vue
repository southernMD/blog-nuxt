<template>
    <Head>
        <Title>南山有壶酒-关于</Title>
        <Meta name="keywords" content="南山有壶酒-关于">
        </Meta>
        <Meta name="description" content="南山有壶酒-关于">
        </Meta>
    </Head>
    <div class="about">
       <div class="title">
        <div class="txt">关于本站</div>
       </div>
       <div class="main">
        2023-5-4<br>
        使用了clever-cloud的免费mysql<br>
        考虑重置nuxt,路由有很多问题,暂时没有时间修改<br>
        <br>
        2023-1-19<br>
        前端:nuxt3，后端nestjs，数据库mysql，vercel部署。<br>
        之前用的免费mysql数据库访问不了，暂时借用了百度云的服务器数据库。<br>
        等服务器到期可能考虑换便宜的服务器或者用mongodb。<br>
        nuxt3在我手上问题很大，查不到资料好多问题没法解决。<br>
        ui什么的不想再搞了<br>
        seo貌似在vercel上没法生效?<br>

       </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.about{
    width: 100%;
    min-height: 400px;
    background-color: @background-color-op;
    border-radius: @border-ra;
    .title{
        height: 60px;
        user-select: none;
        font-size: 25px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid @split-color;
        .txt{
            margin-left: 15px;
            color: @font-color;
        }
    }
    .main{
        width: 950;
        margin: 0 auto;
        height: 450px;
        margin: 30px;
        color: @font-color;
        line-height: 20px;
        font-size: 16px;
    }
}
</style>