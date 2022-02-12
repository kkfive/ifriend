<template>
  <div style="position: relative">
    <friend-template :friendList="friendList" />
    <loading-template :status="loading"></loading-template>
  </div>
</template>

<script lang="ts" setup>
import type { initOptions } from '../../types/parameter'
import type { FriendItem } from '../../types/friend'
import { onMounted, inject, ref } from 'vue'
import { request } from '../../http/index'
import friendTemplate from '../components/friend-template.vue'
import loadingTemplate from '../components/loading-template.vue'
export interface FriendListType {
  [propNmae: string]: {
    class_name: string
    class_desc: string
    link_list: FriendItem[]
  }
}

const options = inject('option') as initOptions
/**
 * 存储标签列表
 */
const loading = ref<String>('loading')
let friendList = ref<FriendListType>({})
const requestList = () => {
  const list: Promise<any>[] = []
  if (Array.isArray(options.api)) {
    options.api.forEach((url) => {
      list.push(
        new Promise((resoleve) => {
          request(url).then((res) => {
            resoleve(res)
          })
        })
      )
    })
  }
  return list
}

onMounted(async () => {
  loading.value = 'loading'
  let result
  if (typeof options.api === 'string') {
    result = await request(options.api)
  } else {
    result = await Promise.race(requestList())
  }
  loading.value = 'success'
  // loading.value = 'fail'

  friendList.value = result
})
</script>

<style lang="scss"></style>
