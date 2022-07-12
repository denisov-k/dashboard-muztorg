<template>
  <widget-container :title="title" :extra-buttons="extraButtons" id="table-4" :is-loading="false">
    <DefaultTable :options="options" ref="table"></DefaultTable>
  </widget-container>
</template>

<script>
    import api from '@/services/api';
    import ExportUtils from "@/utils/ExportUtils";

    import DefaultTable from "@/components/DefaultTable/DefaultTable";
    import WidgetContainer from "gost-widget-components/src/Container";

    export default {
      name: 'Table4',
      components: { WidgetContainer, DefaultTable },
      data() {
        return {
          isLoading: true,
          title: 'Приложение 7',
          options: {},
          data: [],
          dataURL: 'api/E_BUGET/page1/table4',
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
                { title: 'Субъект РФ', field: '0.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: '№ п/п', field: '1.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Наименование МИ', field: '2.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Группа МИ', field: '3.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Плановое количество приобретаемых МИ в 2022 г. (ед.)', field: '4.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Плановое количество приобретаемых МИ в 2023 г. (ед.)', field: '5.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Плановое количество приобретаемых МИ в 2024 г. (ед.)', field: '6.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Итого: плановое количество приобретаемых МИ в 2022-2024 гг. (ед.)', field: '7.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
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
#table-4 {
  height: 500px;
}
</style>
