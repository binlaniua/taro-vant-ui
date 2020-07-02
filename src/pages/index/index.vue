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
    <van-icon info="9" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
    <view class="my-1"></view>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" :border=" false " />
    </van-cell-group>
    <view class="my-1"></view>
    <van-row :gutter="4">
      <van-col :span="8">
        <view class="bg-blue">span: 8</view>
      </van-col>
      <van-col :span="8">
        <view class="bg-blue">span: 8</view>
      </van-col>
      <van-col :span="8">
        <view class="bg-blue">span: 8</view>
      </van-col>
    </van-row>
    <view class="my-1"></view>
    <van-row :gutter="8">
      <van-col :span="12">
        <view class="bg-blue">span: 12</view>
      </van-col>
      <van-col :span="12">
        <view class="bg-blue">span: 12</view>
      </van-col>
    </van-row>-->
    <view class="my-1"></view>
    <van-button @click="showPopup = true">点击弹窗</van-button>
    <van-popup
      custom-style="height:20%"
      position="top"
      :show="showPopup"
      @close="showPopup = false"
    ></van-popup>
  </view>
</template>

<script >
import VanButton from "@ui/button/index.vue";
import VanIcon from "@ui/icon/index.vue";
import VanCellGroup from "@ui/cell-group/index.vue";
import VanCell from "@ui/cell/index.vue";
import VanCol from "@ui/col/index.vue";
import VanRow from "@ui/row/index.vue";
import VanPopup from "@ui/popup/index.vue";
import { onMounted, ref } from "vue";

export default {
  name: "Index",
  components: {
    VanPopup,
    VanCellGroup,
    VanCell,
    VanButton,
    VanIcon,
    VanRow,
    VanCol
  },
  setup(props) {
    return {
      showPopup: ref(false)
    };
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
.bg-blue {
  background: #00a9e9;
}
</style>
