<template>
  <div class="widget-switcher">
    <component :is="widgets[activeItemIndex].component">
      <template v-slot:subtitle>
        <div class="switches">
          <span v-for="(item, index) in widgets" :key="index" class="option"
                :class="[ index === activeItemIndex ? 'selected' : '' ]"
                @click="onItemSelect(index)">{{ item.title }}</span>
        </div>
      </template>
    </component>
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
    font-size: 0.75rem;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: hidden;

    .switches {
      display: flex;
      padding: 0.75rem 0;
      margin: auto;

      .option {
        /*font-size: 0.8rem;*/
        margin: 0 0.25rem;
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