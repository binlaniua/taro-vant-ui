<template>
  <view class="custom-class van-row" :style=" viewStyle ">
    <slot />
  </view>
</template>
<script lang="ts">
import { defineComponent, computed, provide } from "vue";

export default defineComponent({
  components: {},
  props: {
    gutter: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    // 提供给子组件 gutter
    provide("row", props);

    //
    const viewStyle = computed(() => {
      const m = `-${props.gutter / 2}px`;
      return props.gutter ? `margin-left: ${m}; margin-right: ${m}` : "";
    });

    return {
      viewStyle
    };
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>