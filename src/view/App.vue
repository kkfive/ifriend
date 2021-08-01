<template>
  <div>哈哈哈</div>
</template>

<script lang="ts" setup>
import { onMounted, inject } from "vue";
import { getFriendList } from "../http/index";
import { initOptions } from "../types/parameter";

console.log(this);
const options = <initOptions>inject("option");
onMounted(async () => {
  const friendList = await getFriendList(options.url);
  console.log(friendList);
});
</script>

<style>
.div {
  color: red;
}
</style>
