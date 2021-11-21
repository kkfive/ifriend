<template>
  <div v-for="(value, key) in label" :id="key" :key="key" class="container">
    <div>
      <h3 class="title">{{ key }}</h3>
      <p class="desc">{{ value.desc }}</p>
    </div>
    <div class="friend-container">
      <card-friend-item
        v-for="friend in value.card"
        :key="friend.number"
        :friend="friend"
      />
    </div>
    <div class="friend-container" style="margin-top: 20px">
      <common-friend-item
        v-for="friend in value.common"
        :key="friend.number"
        :friend="friend"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import commonFriendItem from '@/components/friend-style/common'
import cardFriendItem from '@/components/friend-style/card'

export default defineComponent({
  name: 'friend-template',
  props: {
    label: {
      type: Object,
      require: true,
    },
  },
  components: { commonFriendItem, cardFriendItem },
  setup: (props) => {},
})
</script>

<style lang='scss' scoped>
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
