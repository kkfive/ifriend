<template>
  <div v-for="(value, key) in forFriendList" :key="key" class="container">
    <div>
      <h2 class="title">{{ value.class_name }}</h2>
      <p class="desc" v-html="value.class_desc"></p>
    </div>
    <div class="friend-container">
      <template v-for="friend in value.card_list" :key="friend.link">
        <card-friend-item :friend="friend" />
      </template>
    </div>
    <div class="friend-container" style="margin-top: 20px">
      <template v-for="friend in value.default_list" :key="friend._id">
        <common-friend-item :friend="friend" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FriendListType } from '../index/index.vue'
import { computed, PropType, ref } from 'vue'
import commonFriendItem from '@/components/friend-style/common'
import cardFriendItem from '@/components/friend-style/card'
import '../../styles/animation.scss'
import { FriendItem } from '@/types/friend'
const props = defineProps({
  friendList: {
    type: Object as PropType<FriendListType>,
    require: true
  }
})
const forFriendList = computed(() => {
  const friendItem: {
    [propNmae: string]: {
      class_name: string
      class_desc: string
      card_list: FriendItem[]
      default_list: FriendItem[]
    }
  } = {}
  const friendList: FriendListType = props.friendList as FriendListType
  const keys = Object.keys(props.friendList as Object)
  keys.forEach((key) => {
    const card_list: FriendItem[] = [],
      default_list: FriendItem[] = []
    friendList[key]?.link_list.forEach((item) => {
      if (item.theme.style === 'card') {
        card_list.push(item)
      } else {
        default_list.push(item)
      }
    })
    friendItem[key] = {
      class_name: friendList[key].class_name,
      class_desc: friendList[key].class_desc,
      card_list: card_list.sort(() => Math.random() - 0.5),
      default_list: default_list.sort(() => Math.random() - 0.5)
    }
  })
  return friendItem
})
</script>

<style lang="scss" scoped>
.container {
  .title {
  }
  .desc {
    // color: red;
  }
}
.friend-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &::after {
    content: '';
    width: 30%;
  }
}
</style>
