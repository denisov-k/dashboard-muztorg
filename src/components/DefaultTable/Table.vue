<template>
  <widget-container :extra-buttons="extraButtons" class="table-container"
                    :is-loading="isLoading">
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
    <template v-slot:subtitle>
      <slot name="subtitle"></slot>
    </template>
    <DefaultTable :options="options" ref="table"></DefaultTable>
  </widget-container>
</template>

<script>
  import api from '@/services/api';
  import ExportUtils from "@/utils/ExportUtils";

  import DefaultTable from "@/components/DefaultTable/index";
  import WidgetContainer from "@/components/Widget/Container";
  import utils from "@/components/DefaultTable/utils";

  export default {
    name: 'Table',
    components: {WidgetContainer, DefaultTable},
    created() {
      this.service = api;
    },
    data() {
      return {
        cellSize: 14,
        isLoading: true,
        options: {},
        data: [],
        extraButtons: [
          /*{ icon: require('@/assets/widget/plus.svg'), onClick: this.upCellSize },
          { icon: require('@/assets/widget/minus.svg'), onClick: this.downCellSize },*/
          { icon: require('@/assets/widget/table.svg'), onClick: this.exportData, title: 'Экспорт данных в XLSX' },
        ],
        requestId: null
      };
    },
    destroyed() {
      this.unsubscribe()
    },
    mounted() {
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'updateState')
          this.setupTable();
      });

      /*console.log(this.$refs.table.tabulator)
      this.$refs.table.tabulator.on("tableBuilt", this.isLoading = false)*/

      this.setupTable();
    },
    methods: {
      redraw(force) {
        return this.$refs.table.tabulator.redraw(force)
      },
      upCellSize() {
        this.cellSize = this.cellSize >= 20 ? 20 : this.cellSize + 1;
        return this.redraw(true)
      },
      downCellSize() {
        this.cellSize = this.cellSize <= 8 ? 8 : this.cellSize - 1;
        return this.redraw(true)
      },
      exportData() {
        this.getExportingData().then(({ data, headers }) => {
          ExportUtils.exportXLSX(data, headers.map(item => item.title), this.title);
        })
      },
      getExportingData() {
        return this.getHyperCube()
      },
      getHyperCube() {
        let filters = this.$store.getters.filters(),
          variables = this.$store.getters.variables();

        let params = {
          format: 'qlik',
          ...variables,
          ...filters
        };

        return this.service.request(this.dataURL, params).then(rsp => rsp.data);
      },
      setupTable() {
        this.isLoading = true;

        let { qTextFormatter, accessorDownload, qNumSorter, qTextSorter, qElemNumSorter } = utils.col;

        this.getHyperCube().then(hc => {

          let data = hc.data;

          let columns = hc.headers.map((item, index) => {
            return {
              title: item.title,
              field: index.toString(),
              minWidth: 75,
              sorter: qNumSorter,
              formatter: qTextFormatter,
              accessorDownload
            }
          });

          columns[0].sorter = qElemNumSorter;
          columns[0].width = 250;

          if (this.totals)
            data.push([ { qText: 'Итог' }, ...hc.grandTotalRow ])

          this.options = {
            columns,
            data,
            pagination: false,
            frozenRows: this.totals ? (item) => item._row.position === data.length : 0
          }

        }).finally(() => this.isLoading = false)
      }
    },
    props: {
      title: String,
      dataURL: String,
      totals: Boolean
    },
  };
</script>

<style scoped lang="scss">
  .widget-container {
    width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 0.5rem 0;
    overflow: hidden;
  }
</style>
