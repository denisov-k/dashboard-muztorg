<template>
  <widget-container :extra-buttons="extraButtons" class="table" :is-loading="isLoading">
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
  import utils from './utils';
  import ExportUtils from "@/utils/ExportUtils";

  import DefaultTable from "./DefaultTable";
  import WidgetContainer from "@/components/Widget/Container";

  export default {
    name: 'PivotTable',
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
          {icon: require('@/assets/widget/table.svg'), onClick: this.exportData}
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
        this.getExportingData().then(data => {
          ExportUtils.exportXLSX(data, this.options.columns.map(item => item.title), this.title);
        })
      },
      getExportingData() {
        return this.getHyperCube().then(hc => hc.data);
      },
      getHyperCube() {
        let filters = this.$store.getters.filters(),
          variables = this.$store.getters.variables();

        let params = {
          format: 'qlik',
          leftDims: this.leftDims,
          type: 'pivot',
          ...variables,
          ...filters
        };

        return this.service.request(this.dataURL, params).then(rsp => rsp.data);
      },
      setupTable() {
        this.isLoading = true;

        let { qTextFormatter, accessorDownload, qNumSorter, qTextSorter, qElemNumSorter } = utils.col;
        let { parseRows, parseColumns } = utils.parser;

        this.getHyperCube().then(hc => {
          let columns = parseColumns(hc.data.qTop),
              rows = parseRows(hc.data.qLeft, hc.data.qData);

          let leftColumn = { title: hc.headers[0].title, field: '_', formatter: qTextFormatter, sorter: qTextSorter },
              topColumn = { title: hc.headers[1].title, columns: columns };

          /*if (this.totals)
            data.push([ { qText: 'Итог' }, ...hc.totals ])*/

          this.options = {
            columns: [leftColumn, topColumn],
            data: rows,
            pagination: false,
            dataTree: this.leftDims > 1,
          }

        }).finally(() => this.isLoading = false)
      }
    },
    props: {
      title: String,
      dataURL: String,
      totals: Boolean,
      pivot: Boolean,
      leftDims: Number
    },
  };
</script>

<style scoped>
  .table {
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
