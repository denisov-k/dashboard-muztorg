<template>
  <widget-container :title="title" :extra-buttons="extraButtons" id="table-5" :is-loading="false">
    <DefaultTable :options="options" ref="table"></DefaultTable>
  </widget-container>
</template>

<script>
    import api from '@/services/api';
    import ExportUtils from "@/utils/ExportUtils";

    import DefaultTable from "@/components/DefaultTable/DefaultTable";
    import WidgetContainer from "gost-widget-components/src/Container";

    export default {
      name: 'Table5',
      components: { WidgetContainer, DefaultTable },
      data() {
        return {
          isLoading: true,
          title: 'Приложение 13',
          options: {},
          data: [],
          dataURL: 'api/E_BUGET/page2/table5',
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
                { title: 'Год', field: '0.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Отчетный месяц', field: '1.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Наименование Региона', field: '2.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },

                { title: 'Количество медицинских организаций, подведомственных органам исполнительной власти субъектов Российской Федерации, имеющих структурные подразделения, оказывающие специализированную паллиативную медицинскую помощь, оснащенных (переоснащенных, дооснащенных) медицинскими изделиями, единиц', field: '3.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количество пациентов, нуждающихся в паллиативной медицинской помощи, обеспеченных медицинскими изделиями для поддержания функций органов и систем организма человека, для использования на дому, человек', field: '4.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Общее количество медицинских изделий, переданных пациентам, нуждающимся в паллиативной медицинской помощи для использования на дому для поддержания функций органов и систем организма человека, единиц', field: '5.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количество пациентов, нуждающихся в паллиативной медицинской помощи, обеспеченных лекарственными препаратами, содержащими наркотические средства и психотропные вещества, для купирования тяжелых симптомов заболевания, в том числе для обезболивания, человек', field: '6.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количество пациентов, нуждающихся в паллиативной медицинской помощи, обеспеченных в амбулаторных условиях, лекарственными препаратами, содержащими наркотические средства и психотропные вещества, для купирования тяжелых симптомов заболевания, в том числе для обезболивания, человек', field: '7.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количество рецептов на лекарственные препараты, содержащие наркотические средства и психотропные вещества, выписанных пациентам, нуждающимся в паллиативной медицинской помощи, единиц', field: '8.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
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
#table-5 {
  height: 500px;
}
</style>
