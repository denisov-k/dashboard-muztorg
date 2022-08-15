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

        let qTextFormatter = ({_cell}) => _cell.value.qText,
            accessorDownload = (value) => value.qText,
            qNumSorter = (a, b) => a.qNum - b.qNum,
            qTextSorter = (a, b) => b.qText.localeCompare(a.qText),
            qElemNumSorter = (a, b) => a.qElemNumber - b.qElemNumber;


        function parseTree(nodes, address = []) {

          node.qSubNodes

          function parseNode(node) {

            return nodes.map((node, index) => {

              let column = { title: node.qText };

              if (node.qSubNodes.length) {
                column.columns = parseNodes(node.qSubNodes, [...address, index])
              }
              else {
                address.push([...address, node.qElemNo]);

                column.formatter = qTextFormatter;
                column.sorter = qNumSorter;
                column.accessorDownload = accessorDownload;
                column.field = (index).toString()
              }

              return column
            })
          }
        }

        this.getHyperCube().then(hc => {

          let data = hc.data.qLeft.map((item, index) => {
            return {
              _: {
                qText: item.qText
              },
              _children: item.qSubNodes,
              ...hc.data.qData[index]
            }
          });

          let nodes = parseTree(hc.data.qTop);

          let leftColumn = { title: hc.headers[0].title, field: '_', formatter: qTextFormatter, sorter: qTextSorter },
              topColumn = { title: hc.headers[1].title, columns: nodes.tree };

          console.log(nodes)

          /*if (this.totals)
            data.push([ { qText: 'Итог' }, ...hc.totals ])*/

          this.options = {
            columns: [leftColumn, topColumn],
            data: data,
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
