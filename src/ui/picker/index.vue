<template>
  <view class="van-picker custom-class">
    <!-- toolbar -->
    <view v-if=" showToolbar " class="van-picker__toolbar toolbar-class">
      <view
        class="van-picker__cancel"
        hover-class="van-picker__cancel--hover"
        hover-stay-time="70"
        data-type="cancel"
        bindtap="emit"
      >{{ cancelButtonText }}</view>
      <view v-if=" title " class="van-picker__title van-ellipsis">{{title }}</view>
      <view
        class="van-picker__confirm"
        hover-class="van-picker__confirm--hover"
        hover-stay-time="70"
        data-type="confirm"
        bindtap="emit"
      >{{ confirmButtonText }}</view>
    </view>
    <!-- loading -->
    <view v-if=" loading " class="van-picker__loading">
      <loading color="#1989fa" />
    </view>
    <!--  -->
    <view
      class="van-picker__columns"
      :style="{'height':  itemHeight * visibleItemCount  + 'px'}"
      @touchmove="noop"
    >
      <picker-column
        class="van-picker__column"
        v-for=" (item,index) in columnValues "
        :key="index"
        :data-index=" index "
        custom-class="column-class"
        :value-key=" valueKey "
        :initial-options=" item.values "
        :default-index=" item.defaultIndex || defaultIndex "
        :item-height=" itemHeight "
        :visible-item-count=" visibleItemCount "
        active-class="active-class"
        @change="onChange"
      />
      <view
        class="van-picker__mask"
        :style="{'background-size': '100% ' + (itemHeight * visibleItemCount - itemHeight) / 2 + 'px'}"
      />
      <view class="van-picker__frame van-hairline--top-bottom" style="height: {{ itemHeight }}px" />
    </view>
    <!-- 不支持toolbar在底部 -->
    <!-- <template
      is="toolbar"
      wx:if="{{ toolbarPosition === 'bottom' }}"
      data="{{ showToolbar, cancelButtonText, title, confirmButtonText }}"
    ></template>-->
  </view>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import PickerColumn from "../picker-column/index.vue";
import Loading from "../loading/index.vue";

export default defineComponent({
  components: {
    PickerColumn,
    Loading
  },
  props: {
    title: String,
    loading: Boolean,
    showToolbar: Boolean,
    cancelButtonText: {
      type: String,
      default: "取消"
    },
    confirmButtonText: {
      type: String,
      default: "确认"
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    itemHeight: {
      type: Number,
      default: 44
    },
    valueKey: {
      type: String,
      default: "text"
    },
    toolbarPosition: {
      type: String,
      default: "top"
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    columns: {
      type: Array,
      default: []
    }
  },
  setup(props, { emit }) {
    //
    const simple = ref(true);
    const columnValues = computed(() => {
      return simple.value ? [{ values: props.columns }] : props.columns;
    });

    //
    watch(
      () => props.columns,
      columns => {
        //@ts-ignore
        simple.value = columns.length && !columns[0].values;
      }
    );

    //
    const selectValue = simple
      ? {
          picker: this,
          value: null,
          index: null
        }
      : { picker: this, value: [], index: [] };

    return {
      simple,
      columnValues,

      noop() {},

      /**
       * index 第几列
       * value    选中的值
       * valueIndex 选中的值的位置
       */
      onChange({ index, value, valueIndex }) {
        if (simple) {
          selectValue.value = value;
          selectValue.index = valueIndex;
        } else {
          //@ts-ignore
          selectValue.value[index] = value;
          //@ts-ignore
          selectValue.index[index] = valueIndex;
        }
        emit("change", selectValue);
      }
    };
  }
});
</script>
<style lang="less">
@import url("./index.less");
</style>