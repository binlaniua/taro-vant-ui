<template>
  <view
    v-if=" state.inited "
    class="van-transition"
    :class="[state.classes, customClass]"
    :style="[{'transition-duration':  state.currentDuration + 'ms',  display: state.display ?  '' : 'none'},  customStyle ]"
  >
    <slot />
  </view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useTransition from "../hook/useTransition";

export default defineComponent({
  components: {},
  props: {
    customClass: String,
    customStyle: String,
    show: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 300
    },
    name: {
      type: String,
      default: "fade"
    }
  },
  setup(props, { emit }) {
    const { state, onTransitionEnd } = useTransition(props, emit);
    return {
      state,
      currentDuration: state.currentDuration,
      onTransitionEnd
    };
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>