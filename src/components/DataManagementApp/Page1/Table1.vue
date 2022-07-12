<template>
  <widget-container :title="title" :extra-buttons="extraButtons" id="table-1" :is-loading="false">
    <DefaultTable :options="options" ref="table"></DefaultTable>
  </widget-container>
</template>

<script>
    import api from '@/services/api';
    import ExportUtils from "@/utils/ExportUtils";

    import DefaultTable from "@/components/DefaultTable";
    import WidgetContainer from "@/components/Widget/Container";

    export default {
      name: 'Table1',
      components: { WidgetContainer, DefaultTable },
      data() {
        return {
          isLoading: true,
          title: 'Таблица 1',
          options: {},
          data: [],
          dataURL: 'api/test2',
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

          const dataStatuses = [
            { label: 'Заблокировано', color: 'rgb(190,190,190)' },
            { label: 'На редактировании', color: 'rgb(0,0,255)' },
            { label: 'На редактировании (после отклонения)', color: 'rgb(165,42,42)' },
            { label: 'На согласовании', color: 'rgb(255,215,0)' },
            { label: 'Согласовано', color: 'rgb(34,139,34)' },
            { label: 'Подписано цифровой подписью', color: 'rgb(0,0,0)' },
          ];

          function statusFormatter({_cell}) {
            let { label, color } = dataStatuses[_cell.value - 1];

            return `<span style="color: ${color};">${label}</span>`
          }

          function customHeaderFilter(headerValue, rowValue, rowData, filterParams){
            let label = dataStatuses[rowValue - 1].label;

            return label.includes(headerValue);
          }

          let accessorDownload = (value) => dataStatuses[value - 1].label;

          this.getData().then(data => {
            this.options = {
              columns: [
                { title: 'Отчет', field: '0.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Отчетный год', field: '1.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Отчетный месяц', field: '2.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Регион', field: '3.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Статус данных', field: '5.qNum', headerFilter: "input", headerFilterFunc: customHeaderFilter,
                  sorter: 'number', accessorDownload, formatter: statusFormatter },
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
  width: 100%;
  height: 100%;
  padding: 1rem;
}
</style>
