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
      <div class="col-xs-4 col-lg-4" v-for="(item, index) in widgets" :key="index">
        <chart :dataURL="item.dataURL" :title="item.title"></chart>
      </div>
    </div>
  </div>
</template>

<script>
  import Chart from '@/components/DailyBusinessPositionApp/Page5/Chart';

  import qVariable from '@/components/Variable';
  import qFilter from "@/components/Filter";

  export default {
    name: "Page5",
    components: {
      Chart,
      qFilter,
      qVariable
    },
    data() {
      return {
        appId: '62d6aee8e2521f0683aba1e6',
        variables: [
          { name: 'vCalTurn', options: [ { value: 'Год', title: 'Год' },
              { value: 'Год-Квартал', title: 'Квартал' }, { value: 'Год-Месяц', title: 'Месяц' },
              { value: 'Год-Неделя', title: 'Неделя' }, { value: 'Дата', title: 'Дата' } ] }
        ],
        widgets: [
          { title: 'GS', dataURL: 'api/dbp/report_5/chart_1' },
          { title: 'Средний чек', dataURL: 'api/dbp/report_5/chart_2' },
          { title: 'Количество посетителей', dataURL: 'api/dbp/report_5/chart_3' },
          { title: 'Среднее кол-во позиций в чеке', dataURL: 'api/dbp/report_5/chart_4' },
          { title: 'Средняя цена штуки в чеке', dataURL: 'api/dbp/report_5/chart_5' },
          { title: 'Конверсия', dataURL: 'api/dbp/report_5/chart_6' },
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