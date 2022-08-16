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
  import ExportUtils from "@/utils/ExportUtils";

  import DefaultTable from "@/components/DefaultTable";
  import WidgetContainer from "@/components/Widget/Container";

  export default {
    name: 'Table',
    components: {WidgetContainer, DefaultTable},
    created() {
      this.service = api;
    },
    data() {
      return {
        isLoading: true,
        options: {},
        data: [],
        extraButtons: [
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

        let qTextFormatter = ({_cell}) => _cell.value ? _cell.value.qText : '-',
            accessorDownload = (value) => value.qText,
            qNumSorter = (a, b) => a.qNum - b.qNum,
            qTextSorter = (a, b) => b.qText.localeCompare(a.qText),
            qElemNumSorter = (a, b) => a.qElemNumber - b.qElemNumber;


        function countElements(nodes, counter = 0) {
          nodes.forEach((node, index) => {

            if (node.qSubNodes.length) {
              counter = countElements(node.qSubNodes, counter)
            } else {
              node.id = counter
              counter = counter + 1;
            }

          })
          return counter
        }

        function parseColumns(nodes) {
          return nodes.map((node, index) => {

            let column = { title: node.qText };

            if (node.qSubNodes.length) {
              column.columns = parseColumns(node.qSubNodes)
            }
            else {
              column.formatter = qTextFormatter;
              column.sorter = qNumSorter;
              column.accessorDownload = accessorDownload;
              column.field = node.id.toString()
            }

            return column
          })
        }

        function parseRows(qLeft, qData) {
          return qLeft.map((node, index) => {

            let row = { _: { qText: node.qText } };

            if (node.qSubNodes.length) {
              row._children = parseRows(node.qSubNodes, qData)
            }
            else {
              row = { ...row, ...qData[node.id] }
            }

            return row
          });
        }

        this.getHyperCube().then(hc => {

          countElements(hc.data.qTop);
          countElements(hc.data.qLeft);

          let columns = parseColumns(hc.data.qTop),
              rows = parseRows(hc.data.qLeft, hc.data.qData)

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
