<template>
  <van-overlay
    v-if=" overlay "
    :show=" show "
    :z-index=" zIndex "
    :custom-style=" overlayStyle "
    :duration=" duration "
    @click="onClickOverlay"
  />
  <view
    v-if=" state.inited "
    class="custom-class"
    :class="[state.classes, bem('popup', [position, { round, safe: safeAreaInsetBottom, safeTop: safeAreaInsetTop }])]"
    :style="[{'z-index':  zIndex, 'transition-duration': state.currentDuration + 'ms', 'display': state.display ? '' : ' none'}, customStyle ]"
    @transitionend="onTransitionEnd"
  >
    <slot />
    <van-icon
      v-if=" closeable "
      ::name=" closeIcon "
      class="close-icon-class van-popup__close-icon"
      :class="'van-popup__close-icon-' + closeIconPosition "
      @tap="onClickCloseIcon"
    />
  </view>
</template>
<script lang="ts">
import { defineComponent, watch } from "vue";
import bem from "../utils/bem";
import useTransition from "../hook/useTransition";
import VanIcon from "../icon/index.vue";
import VanOverlay from "../overlay/index.vue";

export default defineComponent({
  components: {
    VanIcon,
    VanOverlay
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 300
    },
    name: {
      type: String,
      default: "fade"
    },
    round: Boolean,
    closeable: Boolean,
    customStyle: String,
    overlayStyle: String,
    transition: {
      type: String
    },
    zIndex: {
      type: Number,
      default: 100
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeIcon: {
      type: String,
      default: "cross"
    },
    closeIconPosition: {
      type: String,
      default: "top-right"
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: "center"
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const { state, onTransitionEnd } = useTransition(props, emit);
    watch(
      [() => props.transition, () => props.position],
      ([transition, position]) => {
        console.log(transition, position);
      }
    );

    return {
      bem,
      state,
      onTransitionEnd,
      onClickCloseIcon() {
        this.$emit("close");
      },
      onClickOverlay() {
        this.$emit("click-overlay");
        if (props.closeOnClickOverlay) {
          this.$emit("close");
        }
      }
    };
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>