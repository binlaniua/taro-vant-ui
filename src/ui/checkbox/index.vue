<template>
  <view class="van-checkbox custom-class">
    <view class="van-checkbox__icon-wrap" @tap="toggle">
      <slot v-if=" useIconSlot " name="icon" />
      <van-icon
        v-else
        name="success"
        size="0.8em"
        :class=" bem('checkbox__icon', [shape, { disabled: disabled || parentDisabled, checked: value }])"
        :style=" iconStyle "
        custom-class="icon-class"
        custom-style="line-height: 1.25em;"
      />
    </view>
    <view
      class="label-class"
      :class="bem('checkbox__label', [labelPosition, { disabled: disabled || parentDisabled }])"
      @tap="onClickLabel"
    >
      <slot />
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, inject, computed } from "vue";
import VanIcon from "../icon/index.vue";
import bem from "../utils/bem";
import * as utils from "../utils";

export default defineComponent({
  components: {
    VanIcon
  },
  props: {
    value: Boolean,
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: String,
    labelPosition: String,
    labelDisabled: Boolean,
    shape: {
      type: String,
      default: "round"
    },
    iconSize: {
      type: null,
      default: 20
    }
  },
  setup(props, { emit }) {
    const parentDisabled = inject("disabled", false);

    const iconStyle = computed(() => {
      var styles = [["font-size", utils.addUnit(props.iconSize)]];
      if (
        props.checkedColor &&
        props.value &&
        !props.disabled &&
        !parentDisabled
      ) {
        styles.push(["border-color", props.checkedColor]);
        styles.push(["background-color", props.checkedColor]);
      }
      return styles
        .map(function(item) {
          return item.join(":");
        })
        .join(";");
    });

    return {
      bem,
      parentDisabled,
      iconStyle,
      emitChange(value) {
        if (this.parent) {
          this.setParentValue(this.parent, value);
        } else {
          emit("input", value);
          emit("change", value);
        }
      },

      toggle() {
        const { disabled, value } = props;
        if (!disabled && !parentDisabled) {
          this.emitChange(!value);
        }
      },

      onClickLabel() {
        const { labelDisabled, disabled, value } = props;
        if (!disabled && !labelDisabled && !parentDisabled) {
          this.emitChange(!value);
        }
      }
    };
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>