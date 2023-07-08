<template>
  <div>
    <NuxtLoadingIndicator /> 
    <NuxtPage></NuxtPage>
  </div>
</template>
<script setup>
const flag = useCookie('flag')
flag.value = 'true'
</script>
