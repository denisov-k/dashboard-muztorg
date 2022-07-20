<template>
  <div class="widget-switcher">
    <div class="switches">
      <span v-for="(item, index) in widgets" :key="index" class="title"
            :class="[ index === activeItemIndex ? 'selected' : '' ]"
        @click="onItemSelect(index)">{{ item.title }}</span>
    </div>
    <component :is="widgets[activeItemIndex].component"></component>
  </div>
</template>

<script>
  export default {
    name: "Switcher",
    props: {
      widgets: Array
    },
    data() {
      return {
        activeItemIndex: 0
      }
    },
    methods: {
      onItemSelect(index) {
        this.activeItemIndex = index;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .widget-switcher {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: hidden;

    .switches {
      padding: 1rem 1rem 0;

      .title {
        font-size: 0.8rem;
        margin: 0 0.5rem;
        font-weight: 700;
        cursor: pointer;
        text-underline-offset: 3px;

        &:hover {
          text-decoration-line: underline;
          text-decoration-style: dashed;
        }
        &.selected {
          text-decoration-line: underline;
          text-decoration-style: solid;
        }
      }
    }
  }
</style>