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
    <div class="main row">
      <div class="col-xs-4 col-lg-4">
        <chart dataURL="api/dbp/report_5/chart_1" title="Chart 1"></chart>
      </div>
      <div class="col-xs-4 col-lg-4">
        <chart dataURL="api/dbp/report_5/chart_2" title="Chart 2"></chart>
      </div>
      <div class="col-xs-4 col-lg-4">
        <chart dataURL="api/dbp/report_5/chart_3" title="Chart 3"></chart>
      </div>
      <div class="col-xs-4 col-lg-4">
        <chart dataURL="api/dbp/report_5/chart_4" title="Chart 4"></chart>
      </div>
      <div class="col-xs-4 col-lg-4">
        <chart dataURL="api/dbp/report_5/chart_5" title="Chart 5"></chart>
      </div>
      <div class="col-xs-4 col-lg-4">
        <chart dataURL="api/dbp/report_5/chart_6" title="Chart 6"></chart>
      </div>
    </div>
  </div>
</template>

<script>
  import Chart from '@/components/DailyBusinessPositionApp/Page5/Chart';

  import qVariable from '@/components/DailyBusinessPositionApp/Variable';
  import qFilter from "@/components/DailyBusinessPositionApp/Filter";

  export default {
    name: "Page5",
    components: {
      Chart,
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