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
      components: { WidgetContainer, DefaultTable },
      data() {
        return {
          isLoading: true,
          title: 'Таблица 2',
          options: {},
          data: [],
          dataURL: 'api/test',
          extraButtons: [
            { icon: require('@/assets/widget/table.svg'), onClick: this.exportData }
          ]
        };
      },
      mounted() {
        this.setupTable();
      },
      methods: {
        exportData() {
          this.getExportData().then(data => {
            ExportUtils.exportXLSX(data, this.options.columns.map(item => item.title), this.title);
          })
        },
        getExportData() {
          return api.request(`${this.dataURL}?format=qlik`).then(rsp => rsp.data);
        },
        getData() {
          return api.request(`${this.dataURL}?format=qlik`).then(rsp => rsp.data);
        },
        setupTable() {

          let qTextFormatter = ({_cell}) => _cell.value.qText,
              accessorDownload = (value) => value.qText;

          this.getData().then(data => {
            this.options = {
              columns: [
                {title: 'Отчет', field: '0.qText', sorter: 'string', formatter: "textarea"},
                {title: 'Дата получения данных', field: '1.qText', sorter: 'string', formatter: "textarea"},
                {title: 'Время получения данных', field: '2.qText', sorter: 'string', formatter: "textarea"}
              ],
              data
            }
          })

        }
      }
    };
</script>

<style scoped>
#table-2 {
  width: 100%;
  height: 100%;
  padding: 1rem;
}
</style>
