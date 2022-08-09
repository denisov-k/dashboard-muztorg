<template>
  <div class="widget-container">
    <div class="widget-inner">
      <div class="widget-header">
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
        <widget-tools :onExpand="onResize" :extra-buttons="extraButtons"></widget-tools>
      </div>
      <div class="widget-content">
        <loading v-show="isLoading"></loading>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import WidgetTools from "@/components/Widget/Buttons";
  import Loading from "@/components/Widget/Loading";

  export default {
    name: "WidgetContainer",
    components: {WidgetTools, Loading},
    data() {
      return {}
    },
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      onResize: {
        type: Function,
        required: false
      },
      extraButtons: {
        type: Array,
        required: false,
        default: () => {
          return []
        }
      },
    },
    created() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .widget-container {
    box-sizing: border-box;
    margin: 0;
    background-origin: content-box;

    &.expanded {
      position: fixed !important;
      z-index: 10002;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      margin: auto !important;
      padding: 10px;
      box-sizing: border-box;
      background-color: #000000a3;
      transform: unset !important;
    }
    .widget-inner {
      display: flex;
      flex-flow: column;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 20px;
      background-color: white;
      overflow: auto;

      .widget-header {
        display: flex;
        align-items: center;
        white-space: break-spaces;
        padding: 0 0.75rem;
        color: #2a728e;

        .title {
          font-size: 0.75rem;
          padding: 0.75rem 0;
          font-weight: 600;
          margin-right: auto;
        }

        .subtitle {
          font-size: 12px;
          color: #b4b4b4;
        }
      }

      .widget-content {
        /*background: linear-gradient(0deg, rgba(255,255,255,1) 55%, rgba(233,233,233,1) 100%);*/
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        /*padding: 8px;*/
        height: calc(100% - 0px);
        overflow: hidden;
        position: relative;
      }
    }
  }
</style>