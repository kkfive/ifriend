<template>
  <div style="position: relative">
    <div style="text-align: center">
      <n-button @click="addFriendLinkHandler">添加友链</n-button>
    </div>
    <friend-template :tagObjList="tagObjList" />
    <loading-template :status="loading"></loading-template>
    <other-template
      @close="otherTemplateClose"
      v-show="otherTemplateShowStatus"
    ></other-template>
  </div>
</template>

<script lang="ts" setup>
import { useMessage, NButton } from 'naive-ui'
import type { initOptions } from '../../types/parameter'
import type { FriendItem, TagType } from '../../types/friend'
import { onMounted, inject, reactive, ref } from 'vue'
import { request } from '../../http/index'
import friendTemplate from '../components/friend-template.vue'
import loadingTemplate from '../components/loading-template.vue'
import otherTemplate from '../components/add-link-template.vue'
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
const loading = ref<String>('loading')
const otherTemplateShowStatus = ref<Boolean>(false)
const otherTemplateClose = () => {
  otherTemplateShowStatus.value = false
}
const addFriendLinkHandler = () => {
  otherTemplateShowStatus.value = true
}

onMounted(async () => {
  const message = useMessage()
  loading.value = 'loading'
  let result
  try {
    result = await request(
      options.api + '/api/friend/all?userId=' + options.user
    )
    loading.value = 'success'
  } catch (e) {
    loading.value = 'fail'
    message.error('获取失败，请刷新重试')
  }

  const friendList: FriendItem[] = result.data
  // 遍历所有友链
  friendList.forEach((item) => {
    if (item.tag && (item.tag as TagType)._id) {
      // 如果标签存在
      if (tagObjList[(item.tag as TagType).name]) {
        // 判断tags列表中是否存在此标签
        tagObjList[(item.tag as TagType).name].items.push(item)
      } else {
        tagObjList[(item.tag as TagType).name] = {
          description: (item.tag as TagType).description,
          items: [item]
        }
      }
    }
  })
})
</script>

<style lang="scss"></style>
