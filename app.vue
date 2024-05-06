<template>
  <div>
    <NuxtLoadingIndicator /> 
    <NuxtPage></NuxtPage>
    <SpeedInsights/>
  </div>
</template>

<script lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>