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
          title: 'Информация о размещенных приложениях ЭБ на облачном диске',
          options: {},
          data: [],
          dataURL: 'api/E_BUGET/page2/table6',
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
                { title: 'Папка расположения', field: '0.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Субъект РФ', field: '1.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Имя файла', field: '2.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Год', field: '3.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Месяц', field: '4.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Проверка расположения файла', field: '5.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Наличие ошибок в названии файла РЕГИОН', field: '6.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Наличие ошибок в названии файла ГОД', field: '7.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Наличие ошибок в названии файла МЕСЯЦ', field: '8.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Проверка маски названия ФАЙЛА', field: '9.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Дата проверки', field: '10.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
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
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  min-width: 350px;
  min-height: 350px;
}
</style>
