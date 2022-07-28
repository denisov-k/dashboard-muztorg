<template>
  <div class="page-content">
    <div class="sidebar">
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
    <div class="main">
      <table1></table1>
      <table2></table2>
    </div>
  </div>
</template>

<script>
  import Table1 from '@/components/DailyBusinessPositionApp/Page2/Table1';
  import Table2 from '@/components/DailyBusinessPositionApp/Page2/Chart1';

  import qVariable from '@/components/DailyBusinessPositionApp/Variable';
  import qFilter from "@/components/DailyBusinessPositionApp/Filter";

  export default {
    name: "Page5",
    components: {
      Table1,
      Table2,
      qFilter
    },
    data() {
      return {
        appId: '62d6aee8e2521f0683aba1e6'
      }
    }
  }
</script>

<style scoped>

</style>