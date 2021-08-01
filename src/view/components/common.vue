<template>
  <div class="common-friend" @click="jump" :title="friend.body.name">
    <div class="avatar">
      <img v-lazy="friend.body.avatar" />
    </div>
    <div class="information">
      <div class="information-title">{{ friend.body.name }}</div>
      <div class="information-desc">{{ friend.body.descr }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import type { friendItem } from "../../types/friend";
import {
  defineComponent,
  onMounted,
  watch,
  PropType,
  onBeforeMount,
} from "vue";

export default defineComponent({
  name: "friend-template-common",
  props: {
    friend: {
      type: Object as PropType<friendItem>,
      require: true,
      default: [],
    },
  },
  setup: function (props, context) {
    onBeforeMount(() => {
      console.log(props.friend);
    });
    const jump = () => {
      console.log(props.friend.body.link);
      window.open(props.friend.body.link);
    };
    return { jump };
  },
});
</script>

<style lang='scss' scoped>
.common-friend {
  width: calc(100% / 3 - 15px);
  height: 90px;
  display: flex;
  border-radius: 8px;
  line-height: 17px;
  align-items: center;
  cursor: pointer;
  margin-right: 15px;
  padding: 0 15px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  &::before {
    transform: scale(0);
    background: #49b1f5;
    transition: transform 0.3s ease-out;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    content: "";
  }
  &:hover::before {
    transform: scale(1);
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .information {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: space-between;
    height: 60px;
    overflow: hidden;
    .information-title {
      color: rgb(76, 73, 72);
      font-size: 18px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .information-desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
  }
}
</style>
