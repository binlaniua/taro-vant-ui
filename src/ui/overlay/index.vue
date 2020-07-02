<template>
  <van-transition
    :show=" show "
    custom-class="van-overlay"
    :custom-style="'z-index:' + zIndex + ';' +  customStyle "
    :duration=" duration "
    @tap="onClick"
  >
    <slot></slot>
  </van-transition>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import VanTransition from "../transition/index.vue";

export default defineComponent({
  components: {
    VanTransition
  },
  props: {
    show: Boolean,
    customStyle: String,
    duration: {
      type: Number,
      default: 300
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  setup() {
    return {
      onClick() {
        this.$emit("click");
      }
    };
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>