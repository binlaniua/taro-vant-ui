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
    <view class="my-1"></view>
    <van-icon class="mr-1" dot name="iconwenjianjia" />
    <van-icon info="9" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />-->
    <!-- <view class="my-1"></view>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" :border=" false " />
    </van-cell-group> -->
    
  </view>
</template>

<script >
import VanButton from "@ui/button/index.vue";
import VanIcon from "@ui/icon/index.vue";
import VanCellGroup from "@ui/cell-group/index.vue";
import VanCell from "@ui/cell/index.vue";
import { ref } from "vue";

export default {
  name: "Index",
  components: {
    VanCellGroup,
    VanCell,
    VanButton,
    VanIcon
  },
  setup(props) {
    return {};
  }
};
</script>

<style lang="less">
.index {
}
.my-1 {
  margin: 8px 0;
}
.mr-1 {
  margin-right: 8px;
}
</style>
