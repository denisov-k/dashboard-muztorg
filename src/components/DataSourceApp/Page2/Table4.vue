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
          title: 'Приложение 12',
          options: {},
          data: [],
          dataURL: 'api/E_BUGET/page2/table4',
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
                { title: '№ п/п', field: '3.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Наименование лекарственного препарата', field: '4.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Группа ЛЕК', field: '5.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата включения в план-график закупок лекарственны х препаратов (дд.мм.гг.)', field: '6.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата включения в план-график закупок лекарственны х препаратов (дд.мм.гг.)', field: '7.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Номер извещения в ЕИС в сфере закупок', field: '8.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата внесения сведений в реестр контрактов, заключенных по результатам закупок (дд.мм.гг.)', field: '9.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата внесения сведений в реестр контрактов, заключенных по результатам закупок (дд.мм.гг.)', field: '10.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата поставки лекарственных препаратов (дд.мм.гг.)', field: '11.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата поставки лекарственных препаратов (дд.мм.гг.)', field: '12.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата оплаты (дд.мм.гг.)', field: '13.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата оплаты (дд.мм.гг.)', field: '14.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },

                { title: 'Плановое количество приобретаемых упаковок лекарственных препаратов (ед.)', field: '15.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количество законтрактованных упаковок лекарственных препаратов (ед.)', field: '16.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количество поставленных лекарственных препаратов (ед.)', field: '17.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
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
