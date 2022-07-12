<template>
  <div class="widget-buttons">
    <div class="button" v-for="(extraButton, ind) in extraButtons" :title="extraButton.title"
         v-on:click="extraButton.onClick" v-bind:key="ind">
      <inline-svg :src="extraButton.icon"/>
    </div>
    <div class="button" v-on:click="exportImage" v-if="exportImage" :title="$t('export_image')">
      <inline-svg :src="require('@/assets/widget/image.svg')"/>
    </div>
    <div class="button" v-on:click="onExportXLS" v-if="exportURL" :title="$t('export_data')">
      <inline-svg :src="require('@/assets/widget/table.svg')"/>
    </div>
    <div class="button" v-on:click="onExpandClick" :title="expanded ? $t('collapse') : $t('expand')">
      <inline-svg :src="require('@/assets/widget/expand.svg')" v-if="!expanded"/>
      <inline-svg :src="require('@/assets/widget/collapse.svg')" v-else/>
    </div>
  </div>
</template>

<script>
  import api from "@/services/api";

  import * as FileSaver from 'file-saver';

  export default {
    name: "WidgetDataExport",
    props: {
      title: String,
      exportURL: {
        type: String,
        required: false
      },
      exportImage: {
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
      onExpand: Function
    },
    data() {
      return {
        expanded: false,
      }
    },
    methods: {
      onExportImage: function () {
        this.pdfExport();
      },
      onExpandClick: function () {
        this.$parent.$el.classList.toggle("expanded");
        this.expanded = !this.expanded;

        const timeout = this.$parent.$el.classList.contains('expanded') ? 350 : 0;

        this.onExpand && setTimeout(() => {
          this.onExpand();
        }, timeout);
      },
      onExportXLS: function () {
        this.loading = true;

        api.request(this.exportURL + '?format=xlsx', {}, null, 'get', {responseType: 'blob'}).then(res => {

          let blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),
              filename = (this.title || this.$route.meta.title) + '.xlsx';

          FileSaver.saveAs(blob, filename);

          this.loading = false;
        })
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .widget-buttons {
    display: inline-flex;
    float: right;
    margin: 0 15px;
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