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
        <qFilter :app-id="appId" name="store" placeholder="Магазин_KPI"></qFilter>
        <qFilter :app-id="appId" name="group" placeholder="ГруппаРЦ_KPI"></qFilter>
        <qFilter :app-id="appId" name="ka" placeholder="КА ЮрФизЛицо"></qFilter>
      </div>
      <div class="row">
        <qFilter :app-id="appId" name="market_type" placeholder="Тип рынка"></qFilter>
        <qFilter :app-id="appId" name="sales_channel" placeholder="Канал сбыта"></qFilter>
        <qFilter :app-id="appId" name="point_of_sale" placeholder="Точка сбыта"></qFilter>
      </div>
    </div>
    <div class="main row">
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_1" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_2" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_3" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_4" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_5" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_6" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_7" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_8" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_6/table_9" :totals="true"></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import Table from '@/components/DefaultTable/Table';

  import qVariable from '@/components/Variable';
  import qFilter from "@/components/Filter";

  export default {
    name: "Page6",
    components: {
      Table,
      qFilter,
      qVariable
    },
    data() {
      return {
        appId: '62d6aee8e2521f0683aba1e6',
        variables: [
          { name: 'vMer1', options: [ { value: 'GS', title: 'GS' },
              { value: 'GM', title: 'GM' }, { value: 'GM%', title: 'GM%' },
              { value: 'EWC', title: 'EWC' }, { value: 'Cost', title: 'Cost' },
              { value: 'Количество', title: 'Количество' } ] },
          { name: 'vCur', options: [ { value: 'Руб', title: 'Руб' },
              { value: 'USD', title: 'USD' } ] }
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