<template>
  <view
    class="custom-class"
    :class="bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }])"
    hover-class="van-cell--hover hover-class"
    hover-stay-time="70"
    :style=" customStyle "
    @tap="onClick"
  >
    <van-icon
      v-if=" icon "
      :name=" icon "
      class="van-cell__left-icon-wrap"
      custom-class="van-cell__left-icon"
    />
    <slot v-else name="icon" />

    <view
      :style=" titleWidth ? 'max-width:' + titleWidth + ';min-width:' + titleWidth : '' "
      class="van-cell__title title-class"
    >
      <template v-if=" title ">{{ title }}</template>
      <slot v-else name="title" />

      <view v-if=" label || useLabelSlot " class="van-cell__label label-class">
        <slot v-if=" useLabelSlot " name="label" />
        <template v-else-if=" label ">{{ label }}</template>
      </view>
    </view>

    <view class="van-cell__value value-class">
      <template v-if=" value || value === 0 ">{{ value }}</template>
      <slot v-else />
    </view>

    <van-icon
      v-if=" isLink "
      :name=" arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow' "
      class="van-cell__right-icon-wrap right-icon-class"
      custom-class="van-cell__right-icon"
    />
    <slot v-else name="right-icon" />

    <slot name="extra" />
  </view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import bem from "../utils/bem";
import VanIcon from "../icon/index.vue";

export default defineComponent({
  components: {
    VanIcon
  },
  props: {
    title: String,
    value: String,
    icon: String,
    size: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    arrowDirection: String,
    useLabelSlot: Boolean,
    border: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {
      bem,
      onClick(event) {
        this.$emit("click", event.detail);
      }
    };
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>