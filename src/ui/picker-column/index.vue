<template>
  <view
    class="van-picker-column custom-class"
    :style="{'height': viewHeight + 'px'}"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view :style="viewStyle">
      <view
        v-for="(option,index) in options"
        :key="index"
        :data-index="index "
        :style="{'height': itemHeight + 'px'}"
        class="van-ellipsis van-picker-column__item"
        :class="[option && option.disabled ? 'van-picker-column__item--disabled' : '', index === currentIndex ? 'van-picker-column__item--selected active-class' : '']"
        @tap="onClickItem"
      >{{ getOptionText(option, valueKey) }}</view>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from "vue";
import { range, isObj } from "../utils";

const DEFAULT_DURATION = 200;

export default defineComponent({
  components: {},
  props: {
    dataIndex: { type: Number, default: 0 },
    valueKey: { type: String, default: "" },
    className: String,
    itemHeight: { type: Number, default: 0 },
    visibleItemCount: { type: Number, default: 0 },
    initialOptions: {
      type: Array,
      default: []
    },
    defaultIndex: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const { state, getCount, setIndex } = usePicker(props, emit);

    //
    const viewHeight = computed(
      () => props.itemHeight * props.visibleItemCount
    );
    const viewStyle = computed(() => {
      const result = {
        transition: `transform ${state.duration}ms`,
        "line-height": `${props.itemHeight}px`,
        transform: `translate3d(0, ${state.offset +
          (props.itemHeight * (props.visibleItemCount - 1)) / 2}px, 0)`
      };
      return result;
    });

    return {
      ...toRefs(state),
      viewHeight,
      viewStyle,

      //初始化
      onTouchStart(event) {
        state.startY = event.touches[0].clientY;
        state.startOffset = state.offset;
        state.duration = 0;
      },

      //拖动
      onTouchMove(event) {
        const deltaY = event.touches[0].clientY - state.startY;
        state.offset = range(
          state.startOffset + deltaY,
          -(getCount() * props.itemHeight),
          props.itemHeight
        );
      },

      //拖完
      onTouchEnd() {
        if (state.offset !== state.startOffset) {
          state.duration = DEFAULT_DURATION;
          const index = range(
            Math.round(-state.offset / props.itemHeight),
            0,
            getCount() - 1
          );
          setIndex(index, true);
        }
      },

      onClickItem(event) {
        const { index } = event.currentTarget.dataset;
        setIndex(index, true);
      },

      getOptionText(option) {
        return isObj(option) && props.valueKey in option
          ? option[props.valueKey]
          : option;
      },

      setValue(value) {
        for (let i = 0; i < state.options.length; i++) {
          if (this.getOptionText(state.options[i]) === value) {
            return setIndex(i);
          }
        }
        return Promise.resolve();
      },

      getValue() {
        return state.options[state.currentIndex];
      }
    };
  }
});

function usePicker(props, emit) {
  const state = reactive({
    startY: 0,
    offset: 0,
    duration: 0,
    startOffset: 0,
    options: props.initialOptions,
    currentIndex: props.defaultIndex
  });

  onMounted(() => {
    state.options = props.initialOptions;
    state.currentIndex = props.defaultIndex;
    setIndex(state.currentIndex);
  });

  //
  function isDisabled(option) {
    return isObj(option) && option.disabled;
  }
  function getCount() {
    return state.options.length;
  }
  function adjustIndex(index) {
    const count = getCount();
    index = range(index, 0, count);
    for (let i = index; i < count; i++) {
      if (!isDisabled(state.options[i])) return i;
    }
    for (let i = index - 1; i >= 0; i--) {
      if (!isDisabled(state.options[i])) return i;
    }
  }
  function setIndex(index, userAction = false) {
    index = adjustIndex(index) || 0;
    const offset = -index * props.itemHeight;
    if (index !== state.currentIndex) {
      state.currentIndex = index;
      userAction &&
        emit("change", {
          index: props.dataIndex,
          value: state.options[index],
          valueIndex: index
        });
    }
    state.offset = offset;
    return Promise.resolve(offset);
  }
  return {
    state,
    getCount,
    setIndex
  };
}
</script>
<style lang="less">
@import url("./index.less");
</style>