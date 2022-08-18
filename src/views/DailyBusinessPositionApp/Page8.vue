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
      <Table data-u-r-l="api/dbp/report_8/table_1" :totals="false">
        <template v-slot:title>
          <span class="title">Аксессуары</span>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
  import Table from '@/components/DailyBusinessPositionApp/Page8/PivotTable1';

  import qFilter from "@/components/Filter";

  export default {
    name: "Page8",
    components: {
      Table,
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
  .main {
    flex-direction: unset;
  }
  [class^=col-] {
    height: 50%;
  }
</style>