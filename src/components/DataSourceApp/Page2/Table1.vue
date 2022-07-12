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
      name: 'Table1',
      components: { WidgetContainer, DefaultTable },
      data() {
        return {
          isLoading: true,
          title: 'Приложение 6',
          options: {},
          data: [],
          dataURL: 'api/E_BUGET/page2/table1',
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
          return api.request(`${this.dataURL}?format=qlik`).then(rsp => rsp.data)
        },
        setupTable() {

          let qTextFormatter = ({_cell}) => _cell.value.qText,
              accessorDownload = (value) => value.qText;

          this.getData().then(data => {
            this.options = {
              pagination: true,
              data,
              columns: [
                { title: 'Год', field: '0.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Отчетный месяц', field: '1.qText', sorter: 'string', formatter: "textarea", headerFilter: "input" },
                { title: 'Наименование Региона', field: '2.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: '№ п/п', field: '3.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Полное наименование медицинской организации', field: '4.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'ИНН медицинской организации', field: '5.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Наименование МИ', field: '6.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Группа МИ', field: '7.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата включения в план-график закупок МИ (дд.мм.гг.)', field: '8.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата включения в план-график закупок МИ (дд.мм.гг.)', field: '9.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Номер извещения в ЕИС в сфере закупок', field: '10.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата внесения сведений в реестр контрактов, заключенных по результатам закупок (дд.мм.гг.)', field: '11.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата внесения сведений в реестр контрактов, заключенных по результатам закупок (дд.мм.гг.)', field: '12.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата поставки МИ (дд.мм.гг.)', field: '13.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата поставки МИ (дд.мм.гг.)', field: '14.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата оплаты товаров (дд.мм.гг.)', field: '15.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата оплаты товаров (дд.мм.гг.)', field: '16.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Планируемая дата ввода в эксплуатацию МИ (дд.мм.гг.)', field: '17.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },
                { title: 'Фактическая дата ввода в эксплуатацию МИ (дд.мм.гг.)', field: '18.qText', sorter: 'string', formatter:"textarea", headerFilter: "input" },

                { title: 'Плановое количество приобретаемых МИ (ед.)', field: '19.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количество законтрактованных МИ (ед.)', field: '20.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количеств о поставленных МИ (ед.)', field: '21.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
                { title: 'Количество введенных в эксплуатацию МИ (ед.)', field: '22.qNum', sorter: 'number', formatter:"textarea", headerFilter: "input" },
              ]
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
