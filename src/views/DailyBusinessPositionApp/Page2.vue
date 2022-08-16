<template>
  <div class="page-content">
    <div class="sidebar">
      <div class="row">
        <qVariable v-for="(variable, index) in variables"
                   :key="index" :name="variable.name" :options="variable.options" ></qVariable>
      </div>
      <div class="row">
        <qFilter :app-id="appId" name="date" placeholder="Дата"></qFilter>
        <qFilter :app-id="appId" name="year" placeholder="Год" :sorting="true"></qFilter>
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
    <div class="main">
      <table1></table1>
      <chart1></chart1>
    </div>
  </div>
</template>

<script>
  import Table1 from '@/components/DailyBusinessPositionApp/Page2/PivotTable1';
  import Chart1 from '@/components/DailyBusinessPositionApp/Page2/Chart1';

  import qVariable from '@/components/DailyBusinessPositionApp/Variable';
  import qFilter from "@/components/DailyBusinessPositionApp/Filter";

  export default {
    name: "Page2",
    components: {
      Table1,
      Chart1,
      qFilter,
      qVariable
    },
    data() {
      return {
        appId: '62d6aee8e2521f0683aba1e6',
        variables: [
          { name: 'vPlan', options: [ { value: 'PL', title: 'PL' }, { value: 'KPI', title: 'KPI' } ] }
        ]
      }
    }
  }
</script>

<style scoped>

</style>