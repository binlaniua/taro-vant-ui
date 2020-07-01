<template>
  <view class="index">
    <u-button type="danger">普通按钮</u-button>
    <view class="my-1"></view>
    <u-button plain type="primary">朴素按钮</u-button>
    <view class="my-1"></view>
    <u-button plain hairline type="info">细边框</u-button>
    <view class="my-1"></view>
    <u-button disabled type="info">禁用</u-button>
    <view class="my-1"></view>
    <u-button loading type="success"></u-button>
  </view>
</template>

<script >
import UButton from "@ui/button/index.vue";
import { ref } from "vue";

export default {
  name: "Index",
  components: {
    UButton
  },
  setup(props) {
    return {};
  }
};
</script>

<style lang="less">
.my-1 {
  margin: 4px 0;
}
</style>
