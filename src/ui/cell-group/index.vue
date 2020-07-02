<template>
  <view v-if=" title " class="van-cell-group__title">{{ title }}</view>
  <view class="custom-class van-cell-group" :class="border ? 'van-hairline--top-bottom' : ''">
    <slot />
  </view>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {
    title: String,
    border: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {};
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>