<template>
  <div class="loading" v-show="props.status === 'loading'">
    <img :src="loadingImage" />
  </div>
  <div
    class="load-fail"
    v-show="props.status == 'fail'"
    style="text-align: center"
  >
    <p>友链加载失败,请刷新重试</p>
  </div>
</template>

<script lang="ts" setup>
import { initOptions } from '@/types/parameter'
import { inject, PropType, ref } from 'vue'
const loadingImage = ref('')
const options = inject('option') as initOptions
const props = defineProps({
  status: {
    type: String as PropType<String>,
    default: 'loading'
  }
})

if (options.loading_img) {
  loadingImage.value = options.loading_img
}
</script>

<style lang="scss">
.loading {
  text-align: center;
}
</style>
