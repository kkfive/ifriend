<template>
  <div class="card-friend" @click="jump">
    <div class="wrapper cover">
      <img :src="friend.body.screenshot" />
    </div>
    <div class="info">
      <img v-lazy="friend.body.avatar" />
      <span>{{ friend.body.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'friend-template-card',
  props: {
    friend: {
      type: Object,
      require: true,
      default: [],
    },
  },
  setup: function (props, context) {
    // console.log(props.friend)
    const jump = () => {
      // console.log(props.friend.body.link)
      window.open(props.friend.body.link)
    }
    return { jump }
  },
})
</script>

<style lang='scss' scoped>
.card-friend {
  width: calc(100% / 4 - 15px);
  height: 130px;
  position: relative;
  display: block;
  margin: 15px 7px;
  float: left;
  overflow: hidden;
  border-radius: 3px;
  transition: all 0.3s ease 0s, transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
  box-shadow: 0 14px 38px rgb(0 0 0 / 8%), 0 3px 8px rgb(0 0 0 / 6%);
  cursor: pointer;
  .wrapper {
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transform: scale(1);
      transition: transform 0.8s !important;
    }
  }
  &:hover .info {
    transform: translateY(-100%);
  }
  &:hover .wrapper img {
    transform: scale(1.2);
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.7);
    transition: transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s !important;
    img {
      position: relative;
      top: 22px;
      width: 66px;
      height: 66px;
      border-radius: 50%;
      box-shadow: 0 0 10px rgb(0 0 0 / 30%);
      z-index: 1;
    }
    span {
      padding: 6px ​0 12px;
      font-size: 16px;
      width: 100%;
      text-align: center;
      box-shadow: 0 0 10px rgb(0 0 0 / 30%);
      background-color: rgba(255, 255, 255, 0.7);
      color: var(--font-color);
      margin-bottom: -8px;
    }
  }
}
</style>
