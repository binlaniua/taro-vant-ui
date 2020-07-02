<template>
  <view>
    <slot />
  </view>
</template>
<script lang="ts">
import { defineComponent, provide, computed, reactive } from "vue";

export default defineComponent({
  components: {},
  props: {
    max: Number,
    value: {
      type: Array,
      default: []
    },
    disabled: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    // 注入给子的checkbox
    const setParentValue = select => {
      const value = [...props.value];
      const pos = value.indexOf(select);
      if (pos == -1) {
        value.push(select);
      } else {
        value.splice(pos, 1);
      }
      emit("input", value);
      emit("change", value);
    };

    //
    provide(
      "checkbox-group",
      reactive({
        value: computed(() => props.value),
        disable: computed(() => props.disabled),
        setParentValue
      })
    );
    return {};
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>