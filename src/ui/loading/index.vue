<template>
  <view class="custom-class van-loading" :class="vertical ? 'van-loading--vertical' : ''">
    <view class="van-loading__spinner" :class="'van-loading__spinner--' + type">
      <template v-if="type === 'spinner'">
        <view v-for="index in array12" :key="index" class="van-loading__dot"></view>
      </template>
      <view class="van-loading__text">
        <slot />
      </view>
    </view>
  </view>
</template>
<script>
export default {
  components: {},
  props: {
    color: String,
    vertical: Boolean,
    type: {
      type: String,
      default: "circular"
    },
    size: String,
    textSize: String
  },
  setup(props) {
    return {
      array12: Array.from({ length: 12 })
    };
  }
};
</script>
<style lang="less">
@import url("./index.less");
</style>