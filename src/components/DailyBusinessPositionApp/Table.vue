<template>
  <widget-container :extra-buttons="extraButtons" class="table" :is-loading="isLoading">
    <template v-slot:title>
      <span class="title">{{ title }}</span>
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
            qElemNumSorter = (a, b) => a.qElemNumber - b.qElemNumber;

        this.getHyperCube().then(hc => {

          let columns = hc.headers.map((item, index) => {
            return {
              title: item.title,
              field: index.toString(),
              sorter: qNumSorter,
              formatter: qTextFormatter,
              accessorDownload
            }
          });

          columns[0].frozen = true;
          columns[0].sorter = qElemNumSorter;

          this.options = {
            columns,
            data: hc.data,
            pagination: false,
          }

        }).finally(() => this.isLoading = false)
      }
    },
    props: {
      title: String,
      dataURL: String
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
