<template>
  <widget-container :title="title" :extra-buttons="extraButtons" id="table-3" :is-loading="false">
    <DefaultTable :options="options" ref="table"></DefaultTable>
  </widget-container>
</template>

<script>
    import api from '@/services/api';
    import ExportUtils from "@/utils/ExportUtils";

    import DefaultTable from "@/components/DefaultTable/DefaultTable";
    import WidgetContainer from "gost-widget-components/src/Container";

    export default {
      name: 'Table3',
      components: { WidgetContainer, DefaultTable },
      data() {
        return {
          isLoading: true,
          title: 'Приложение 10',
          options: {},
          data: [],
          dataURL: 'api/E_BUGET/page2/table3',
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
                { title: 'Полное наименование медицинской организации', field: '4.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'ИНН медицинской организации', field: '5.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Марка и модель автомобиля', field: '6.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Группа АВТО', field: '7.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата включения в план-график закупок автомобилей (дд.мм.гг.)', field: '8.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата включения в план-график закупок автомобилей (дд.мм.гг.)', field: '9.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Номер извещения в ЕИС в сфере закупок', field: '10.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата внесения сведений в реестр контрактов, заключенных по результатам закупок (дд.мм.гг.)', field: '11.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата внесения сведений в реестр контрактов, заключенных по результатам закупок (дд.мм.гг.)', field: '12.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата поставки автомобилей (дд.мм.гг.)', field: '13.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата поставки автомобилей (дд.мм.гг.)', field: '14.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата поставки автомобилей на учет в ГИБДД (дд.мм.гг.)', field: '15.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата поставки автомобилей на учет в ГИБДД (дд.мм.гг.)', field: '16.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата оплаты товаров (дд.мм.гг.)', field: '17.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата оплаты товаров (дд.мм.гг.)', field: '18.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },

                { title: 'Плановое количеств о приобретаемых автомобилей в отчетном году (ед.)', field: '19.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количеств о законтрактованных автомобилей (ед.)', field: '20.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количество поставленных автомобилей (ед.)', field: '21.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количество автомобилей, поставленных на учет в ГИБДД (ед.)', field: '22.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
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
#table-3 {
  height: 500px;
}
</style>
