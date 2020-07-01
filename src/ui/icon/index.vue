<template>
  <view
    class="custom-class"
    :class="[classPrefix, isRemote ? 'van-icon--image' :  name]"
    @tap="onClick"
  >
    <van-info v-if="dot" :dot="dot" :info="info" custom-class="van-icon__info" />
    <image v-if="isRemote" :src="name" mode="aspectFit" class="van-icon__image" />
  </view>
</template>
<script>
import bem from "../utils/bem";
import { computed } from "vue";

export default {
  props: {
    dot: Boolean,
    info: null,
    size: null,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      default: "van-icon"
    },
    name: {
      type: String
    }
  },
  setup(props) {
    return {
      bem,
      isRemote: computed(() => {
        return ~props.name.indexOf("/");
      }),
      onClick() {
        this.$emit("click");
      }
    };
  }
};
</script>
<style lang="less">
@import url("./index.less");
</style>