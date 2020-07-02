<template>
  <view
    class="custom-class"
    :class="[bem('col', [span]), offset ? 'van-col--offset-' + offset : '']"
    :style=" viewStyle "
  >
    <slot />
  </view>
</template>
<script lang="ts">
import { defineComponent, computed, inject } from "vue";
import bem from "../utils/bem";

export default defineComponent({
  components: {},
  props: {
    span: Number,
    offset: Number
  },
  setup() {
    // 从van-row上注入进来gutter
    const rowProps = inject("row", { gutter: 0 });
    const viewStyle = computed(() => {
      const m = `${rowProps.gutter / 2}px`;
      return rowProps.gutter ? `padding-left: ${m}; padding-right: ${m}` : "";
    });
    return {
      bem,
      viewStyle
    };
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>