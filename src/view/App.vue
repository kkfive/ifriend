<template>
  <friend-template :tagObjList="tagObjList" />
</template>

<script lang="ts" setup>
import type { initOptions } from '../types/parameter'
import type { FriendItem } from '../types/friend'
import { onMounted, inject, reactive } from 'vue'
import { getFriendList } from '../http/index'
import friendTemplate from './components/friend-template.vue'
export interface TagListType {
  [propNmae: string]: {
    description: string
    items: FriendItem[]
  }
}

const options = inject('option') as initOptions
/**
 * 存储标签列表
 */
const tagObjList = reactive<TagListType>({})
onMounted(async () => {
  const result = await getFriendList(options.url)
  const friendList: FriendItem[] = result.data
  // 遍历所有友链
  friendList.forEach((item) => {
    if (item.tag && item.tag._id) {
      // 如果标签存在
      if (tagObjList[item.tag.name]) {
        // 判断tags列表中是否存在此标签
        tagObjList[item.tag.name].items.push(item)
      } else {
        tagObjList[item.tag.name] = {
          description: '',
          items: [item]
        }
      }
    }
  })
})
</script>

<style lang="scss"></style>
