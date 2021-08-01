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
      <common-friend-item
        v-for="friend in value.common"
        :key="friend.number"
        :friend="friend"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { friendItem } from "../../types/friend";
import { ref, defineComponent, watch, reactive } from "vue";
import commonFriendItem from "../components/common.vue";
import cardFriendItem from "../components/card.vue";

export default defineComponent({
  name: "friend-template",
  props: {
    label: {
      type: Object,
      require: true,
    },
  },
  components: { commonFriendItem, cardFriendItem },
  setup: (props) => {},
});
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
}
</style>
