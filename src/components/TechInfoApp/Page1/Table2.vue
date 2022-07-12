<template>
  <widget-container :title="title" :extra-buttons="extraButtons" id="table-1" :is-loading="false">
    <DefaultTable :options="options" ref="table"></DefaultTable>
  </widget-container>
</template>

<script>
    import api from '@/services/api';
    import ExportUtils from "@/utils/ExportUtils";

    import DefaultTable from "@/components/DefaultTable/DefaultTable";
    import WidgetContainer from "gost-widget-components/src/Container";

    export default {
      name: 'Table2',
      components: { WidgetContainer, DefaultTable },
      data() {
        return {
          isLoading: true,
          title: 'Сводка по серверу Взаимодействия',
          options: {},
          data: [],
          dataURL: 'api/WHO_LOGIN/page1/table2',
          extraButtons: [{ icon: { name: 'table' }, onClick: this.exportData }]
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
                { title: 'Имя сервера', field: '0.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Дата входа', field: '1.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Время входа', field: '2.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Дата выхода', field: '3.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Время выхода', field: '4.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Имя учётной записи', field: '5.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Код входа', field: '6.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Вход', field: '7.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Длительность соединения', field: '8.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
              ],
              data,
              pagination: true,
            }
          })
        }
      }
    };
</script>

<style scoped>
#table-1 {
  height: 500px;
}
</style>
