<template>
  <view
    v-if="info !== null && info !== '' || dot"
    class="custom-class van-info"
    :class="bem('info', { dot })"
    :style="customStyle"
  >{{ dot ? '' : info }}</view>
</template>
<script>
import bem from "../utils/bem";
import { computed } from "vue";

export default {
  props: {
    dot: Boolean,
    info: String,
    customStyle: String
  },
  setup(props) {
    return {
      bem
    };
  }
};
</script>
<style lang="less">
@import url("./index.less");
</style>