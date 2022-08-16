<template>
  <div class="widget-buttons">
    <div class="button" v-for="(extraButton, ind) in extraButtons" :title="extraButton.title"
         v-on:click="extraButton.onClick" v-bind:key="ind">
      <inline-svg :src="extraButton.icon"/>
    </div>
    <div class="button" v-on:click="onExpandClick"
         :title="expanded ? 'Выйти из полноэкранного режима' : 'Раскрыть на весь экран' ">
      <inline-svg :src="require('@/assets/widget/expand.svg')" v-if="!expanded"/>
      <inline-svg :src="require('@/assets/widget/collapse.svg')" v-else/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WidgetButtons",
    props: {
      extraButtons: {
        type: Array,
        required: false,
        default: () => {
          return []
        }
      },
      onExpand: Function
    },
    data() {
      return {
        expanded: false,
      }
    },
    methods: {
      onExpandClick: function () {
        this.$parent.$el.classList.toggle("expanded");
        this.expanded = !this.expanded;

        const timeout = this.$parent.$el.classList.contains('expanded') ? 350 : 0;

        this.onExpand && setTimeout(() => {
          this.onExpand();
        }, timeout);
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .widget-buttons {
    display: inline-flex;
    padding: 0.25rem 0;
    margin-left: auto;
    user-select: none;
  }

  .button {
    fill: #2a728e;
    aspect-ratio: 1;
    height: 0.8rem;
    padding: 6px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .button:hover {
    background-color: #00000025;
    border-radius: 10px;
  }

  .button:not(:last-child) {
    /*border-right: 1px solid #e3e3e3;*/
  }

  .button svg {
    height: 100%;
    width: 100%;
  }
</style>

<i18n>
  {
    "en": {
      "export_image": "Export image",
      "export_data": "Export data",
      "expand": "Expand widget",
      "collapse": "Collapse widget"
    },
    "ru": {
      "export_image": "Экспортировать изображение",
      "export_data": "Экспортировать исходные данные",
      "expand": "Развернуть на весь экран",
      "collapse": "Выйти из режима полного экрана"
    }
  }
</i18n>