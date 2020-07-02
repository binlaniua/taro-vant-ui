<template>
  <view class="van-checkbox custom-class">
    <view class="van-checkbox__icon-wrap" @tap="toggle">
      <slot v-if=" useIconSlot " name="icon" />
      <van-icon
        v-else
        name="success"
        size="0.8em"
        :class=" bem('checkbox__icon', [shape, { disabled: disabled || parentDisabled, checked }])"
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
    name: { type: String, default: "" },
    value: { type: Boolean, default: null },
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
    // 如果被checkbox-group给包住
    // 不能使用 {...}  结构会丢失响应
    const checkboxGroup = inject("checkbox-group", {
      value: [],
      disabled: false,
      setParentValue: null
    });

    const iconStyle = computed(() => {
      var styles = [["font-size", utils.addUnit(props.iconSize)]];
      if (
        props.checkedColor &&
        props.value &&
        !props.disabled &&
        !checkboxGroup.disabled
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

    const checked = computed(() => {
      if (checkboxGroup.setParentValue) {
        //@ts-ignore
        return ~checkboxGroup.value.indexOf(props.name);
      }
      return props.value;
    });

    return {
      bem,
      parentDisabled: checkboxGroup.disabled,
      iconStyle,
      checked,
      emitChange(value) {
        if (checkboxGroup.setParentValue) {
          //@ts-ignore
          checkboxGroup.setParentValue(props.name);
        } else {
          emit("input", value);
          emit("change", value);
        }
      },

      toggle() {
        const { disabled, value } = props;
        if (!disabled && !checkboxGroup.disabled) {
          this.emitChange(!value);
        }
      },

      onClickLabel() {
        const { labelDisabled, disabled, value } = props;
        if (!disabled && !labelDisabled && !checkboxGroup.disabled) {
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