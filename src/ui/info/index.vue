<template>
  <view
    v-if="info !== null && info !== '' || dot"
    class="custom-class van-info"
    :class="bem('info', { dot })"
    :style="customStyle"
  >{{ dot ? '' : info }}</view>
</template>
<script lang="ts">
import bem from "../utils/bem";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    dot: Boolean,
    info: String,
    customStyle: String
  },
  setup() {
    return {
      bem
    };
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>