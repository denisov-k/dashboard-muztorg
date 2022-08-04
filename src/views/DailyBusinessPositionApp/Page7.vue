<template>
  <div class="page-content">
    <div class="sidebar">
      <div class="row">
        <qVariable v-for="(variable, index) in variables"
                   :key="index" :name="variable.name" :options="variable.options" ></qVariable>
      </div>
      <div class="row">
        <qFilter :app-id="appId" name="date" placeholder="Дата"></qFilter>
        <qFilter :app-id="appId" name="year" placeholder="Год"></qFilter>
        <qFilter :app-id="appId" name="month" placeholder="Месяц"></qFilter>
        <qFilter :app-id="appId" name="quarter" placeholder="Квартал"></qFilter>
        <qFilter :app-id="appId" name="year_month" placeholder="Год-Месяц"></qFilter>
      </div>
      <div class="row">
        <qFilter :app-id="appId" name="market_type" placeholder="Тип рынка"></qFilter>
        <qFilter :app-id="appId" name="sales_channel" placeholder="Канал сбыта"></qFilter>
        <qFilter :app-id="appId" name="point_of_sale" placeholder="Точка сбыта"></qFilter>
      </div>
    </div>
    <div class="main row">
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_1" title="Table 1"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_2" title="Table 2"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_3" title="Table 3"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_4" title="Table 4"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_5" title="Table 5"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_6" title="Table 6"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_7" title="Table 7"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_8" title="Table 8"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_9" title="Table 9"></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import Table from '@/components/DailyBusinessPositionApp/Table';

  import qVariable from '@/components/DailyBusinessPositionApp/Variable';
  import qFilter from "@/components/DailyBusinessPositionApp/Filter";

  export default {
    name: "Page7",
    components: {
      Table,
      qFilter,
      qVariable
    },
    data() {
      return {
        appId: '62d6aee8e2521f0683aba1e6',
        variables: [
          { name: 'vCalcTurn', options: [ { value: 'Год', title: 'Год' },
              { value: 'Год-Квартал', title: 'Квартал' }, { value: 'Год-Месяц', title: 'Месяц' },
              { value: 'Год-Неделя', title: 'Неделя' }, { value: 'Дата', title: 'Дата' } ] },
          { name: 'vCalcTurn2', options: [ { value: 'Год', title: 'Год' },
              { value: 'Месяц', title: 'Месяц' }, { value: 'Неделя', title: 'Неделя' },
              { value: 'День недели', title: 'День недели' }, { value: 'День', title: 'День' },
              { value: 'Номер дня в году', title: 'Номер дня в году' } ] }
        ]
      }
    }
  }
</script>

<style scoped>
  .main {
    flex-direction: unset;
  }
  [class^=col-] {
    height: 50%;
  }
</style>