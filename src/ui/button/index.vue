<template>
  <button
    :id=" id "
    :data-detail=" dataset "
    class="custom-class"
    :class="bem('button', [type,size,{block,round,plain,square,loading,disabled,hairline}])"
    hover-class="van-button--active hover-class"
    :lang=" lang "
    :form-type=" formType "
    :open-type=" disabled ? '' : openType "
    @tap="onClick"
  >
    <block v-if=" loading ">
      <van-loading
        custom-class="loading-class"
        :size=" loadingSize "
        :type=" loadingType "
        :color=" loadingColor"
      />
      <view v-if=" loadingText" class="van-button__loading-text">{{ loadingText }}</view>
    </block>
    <block v-else>
      <van-icon
        v-if=" icon "
        size="1.2em"
        :name=" icon "
        :class-prefix=" classPrefix "
        class="van-button__icon"
        custom-style="line-height: inherit;"
      />
      <view class="van-button__text">
        <slot />
      </view>
    </block>
  </button>
</template>
<script>
import { computed } from "vue";
import bem from "../utils/bem";
import VanIcon from "../icon";

export default {
  components: {
    VanIcon
  },
  props: {
    formType: String,
    icon: String,
    classPrefix: {
      type: String,
      value: "van-icon"
    },
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loadingText: String,
    customStyle: String,
    loadingType: {
      type: String,
      default: "circular"
    },
    type: {
      type: String,
      default: "default"
    },
    dataset: null,
    size: {
      type: String,
      default: "normal"
    },
    loadingSize: {
      type: String,
      default: "20px"
    }
  },
  setup(props) {
    const loadingColor = computed(() => {
      if (props.plain) return color ? color : "#c9c9c9";
      if (props.type === "default") return "#c9c9c9";
      return "white";
    });
    return {
      bem,
      loadingColor,
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