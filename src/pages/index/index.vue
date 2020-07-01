<template>
  <view class="index">
    <!-- <van-button type="danger">普通按钮</van-button>
    <view class="my-1"></view>
    <van-button plain type="primary">朴素按钮</van-button>
    <view class="my-1"></view>
    <van-button plain hairline type="info">细边框</van-button>
    <view class="my-1"></view>
    <van-button disabled type="info">禁用</van-button>
    <view class="my-1"></view>
    <van-button loading type="success"></van-button>
    <view class="my-1"></view>-->
    <van-icon name="iconwenjianjia" />
    <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
  </view>
</template>

<script >
import VanButton from "@ui/button/index.vue";
import VanIcon from "@ui/icon/index.vue";
import { ref } from "vue";

export default {
  name: "Index",
  components: {
    VanButton,
    VanIcon
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
