<template>
  <widget-container :title="title" :extra-buttons="extraButtons" id="table-2" :is-loading="false">
    <DefaultTable :options="options" ref="table"></DefaultTable>
  </widget-container>
</template>

<script>
  import api from '@/services/api';
  import ExportUtils from "@/utils/ExportUtils";

  import DefaultTable from "@/components/DefaultTable/DefaultTable";
  import WidgetContainer from "@/components/Widget/Container";

  export default {
    name: 'Table2',
    components: {WidgetContainer, DefaultTable},
    data() {
      return {
        isLoading: true,
        title: 'Таблица 2',
        options: {},
        data: [],
        dataURL: 'api/DBP/S1/T2',
        extraButtons: [
          {icon: require('@/assets/widget/table.svg'), onClick: this.exportData}
        ]
      };
    },
    mounted() {
      this.setupTable();
    },
    methods: {
      exportData() {
        this.getExportingData().then(data => {
          ExportUtils.exportXLSX(data, this.options.columns.map(item => item.title), this.title);
        })
      },
      getExportingData() {
        return api.request(`${this.dataURL}?format=qlik`).then(rsp => rsp.data);
      },
      getHyperCube() {
        return api.request(`${this.dataURL}?format=qlik&meta=1`).then(rsp => rsp.data);
      },
      setupTable() {

        let qTextFormatter = ({_cell}) => _cell.value.qText,
            accessorDownload = (value) => value.qText,
            qNumSorter = (a, b) => a.qNum - b.qNum;

        this.getHyperCube().then(hc => {

          let columns = hc.headers.map((item, index) => {
            return {title: item, field: index.toString(), sorter: qNumSorter, formatter: qTextFormatter, accessorDownload}
          });

          columns[0].frozen = true;

          this.options = {
            columns,
            data: hc.data,
            pagination: false,
          }
        })
      }
    }
  };
</script>

<style scoped>
  #table-2 {
    width: 100%;
    max-height: 100%;
    padding: 1rem;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
  }
</style>
