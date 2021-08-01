<template>
  <friend-template :label="labels" />
</template>

<script lang="ts" >
import type { initOptions } from "../types/parameter";
import type { friendItem } from "../types/friend";
import { onMounted, inject, reactive } from "vue";
import { getFriendList } from "../http/index";
import friendTemplate from "./components/friend-template.vue";
export default {
  components: { friendTemplate },

  setup() {
    const options = inject("option") as initOptions;
    const labels: {
      [propName: string]: {
        desc: string;
        [styleName: string]: any;
      };
    } = reactive({});
    onMounted(async () => {
      const result = await getFriendList(options.url);
      const friendList: friendItem[] = [...result.gitee, ...result.github];
      // 获取所有类型的标签
      if (options.labelDesc) {
        // 自定义了标签则先将自定义的标签导入
        const keys = Object.keys(options.labelDesc);
        keys.forEach((item) => {
          labels[item] = { desc: options.labelDesc![item] };
          // 普通样式
          labels[item].common = [];
          // 卡片样式
          labels[item].card = [];
        });
      }
      // 遍历所有友链
      friendList.filter((item) => {
        // 获取卡片样式的友链
        if (item.label.length) {
          if (!labels[item.label[0].name]) {
            labels[item.label[0].name] = { desc: "" };
            // 普通样式
            labels[item.label[0].name].common = [];
            // 卡片样式
            labels[item.label[0].name].card = [];
          }

          if (item.body.card_style === "item" || item.body.card_style === "") {
            labels[item.label[0].name].common.push(item);
          } else {
            console.log(item.label[0].name, item.body.card_style);

            labels[item.label[0].name].card.push(item);
          }
        }
      });
    });
    return { labels };
  },
};
</script>

<style lang="scss">
</style>
