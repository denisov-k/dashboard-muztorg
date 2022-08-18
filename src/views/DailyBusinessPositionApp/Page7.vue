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
      </div>
      <div class="row">
        <qFilter :app-id="appId" name="market_type" placeholder="Тип рынка"></qFilter>
        <qFilter :app-id="appId" name="sales_channel" placeholder="Канал сбыта"></qFilter>
        <qFilter :app-id="appId" name="point_of_sale" placeholder="Точка сбыта"></qFilter>
      </div>
    </div>
    <div class="main row">
      <switcher :widgets="widgets" id="charts"></switcher>
      <div class="col-xs-6 col-lg-6">
        <chart4></chart4>
      </div>
      <div class="col-xs-6 col-lg-6">
        <chart5></chart5>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_7/table_1" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_7/table_2" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_7/table_3" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_7/table_4" :totals="true"></Table>
      </div>
      <div class="col-xs-6 col-lg-6">
        <Table data-u-r-l="api/dbp/report_7/table_5" :totals="true"></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import qVariable from '@/components/Variable';
  import qFilter from "@/components/Filter";
  import Switcher from "@/components/Widget/Switcher";

  import Table from '@/components/DefaultTable/Table';
  import Chart1 from "@/components/DailyBusinessPositionApp/Page7/Chart1";
  import Chart2 from "@/components/DailyBusinessPositionApp/Page7/Chart2";
  import Chart3 from "@/components/DailyBusinessPositionApp/Page7/Chart3";
  import Chart4 from "@/components/DailyBusinessPositionApp/Page7/Chart4";
  import Chart5 from "@/components/DailyBusinessPositionApp/Page7/Chart5";

  export default {
    name: "Page7",
    components: {
      Chart4, Chart5,
      Table,
      qFilter,
      qVariable,
      Switcher
    },
    data() {
      return {
        appId: '62d6aee8e2521f0683aba1e6',
        widgets: [
          {component: Chart1, title: 'Одно измерение'},
          {component: Chart2, title: 'Два измерения'},
          {component: Chart3, title: 'Два измерения'},
        ],
        variables: [
          { name: 'vCalTurn', options: [ { value: 'Год', title: 'Год' },
              { value: 'Год-Квартал', title: 'Квартал' }, { value: 'Год-Месяц', title: 'Месяц' },
              { value: 'Год-Неделя', title: 'Неделя' }, { value: 'Дата', title: 'Дата' } ] },
          { name: 'vCalTurn2', options: [ { value: 'Год', title: 'Год' },
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
  #charts {
    width: 100%;
    height: 50%;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
  [class^=col-] {
    height: 50%;
  }
</style>