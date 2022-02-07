<template>
  <div
    v-for="(value, key) in props.tagObjList"
    :id="key.toString()"
    :key="key"
    class="container"
  >
    <div>
      <h2 class="title">{{ key }}</h2>
      <p class="desc">{{ value.description }}</p>
    </div>
    <div class="friend-container">
      <template v-for="friend in value.items" :key="friend._id">
        <card-friend-item
          v-if="friend.theme.cardStyle === 'card'"
          :friend="friend"
        />
      </template>
    </div>
    <div class="friend-container" style="margin-top: 20px">
      <template v-for="friend in value.items" :key="friend._id">
        <common-friend-item
          v-if="friend.theme.cardStyle === 'item' || !friend.theme.cardStyle"
          :friend="friend"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TagListType } from '../index/index.vue'
import { computed, PropType } from 'vue'
import commonFriendItem from '@/components/friend-style/common'
import cardFriendItem from '@/components/friend-style/card'
import '../../styles/animation.scss'
const props = defineProps({
  tagObjList: {
    type: Object as PropType<TagListType>,
    require: true
  }
})

const addKeyAndValue = (obj, key, val) => {
  if (obj[key]) {
    obj[key].items.push(val)
  } else {
    obj[key] = {
      description: (props.tagObjList as TagListType)[key].description,
      items: [val]
    }
  }
}

const cardTypeList = computed(() => {
  if (!props.tagObjList) return
  let cardItem: TagListType = {}
  let commonItem: TagListType = {}
  Object.keys(props.tagObjList).forEach((key) => {
    if (!props.tagObjList) return
    props.tagObjList[key].items.forEach((item) => {
      if (item.theme.cardStyle === 'card') {
        addKeyAndValue(cardItem, key, item)
        // if (cardItem[key]) {
        //   cardItem[key].items.push(item)
        // } else {
        //   cardItem[key] = {
        //     description: (props.tagObjList as TagListType)[key].description,
        //     items: [item]
        //   }
        // }
      } else if (item.theme.cardStyle === 'item') {
        addKeyAndValue(commonItem, key, item)
      }
    })
  })
  return { cardItem, commonItem }
})
</script>

<style lang="scss" scoped>
.container {
  .title {
  }
  .desc {
    color: red;
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
