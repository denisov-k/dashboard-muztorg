<template>
  <div class="page-content">
    <switcher :widgets="widgets[0]"></switcher>
    <switcher :widgets="widgets[1]"></switcher>
    <div class="row">
      <qVariable name="vMer" :values="['GS_Руб', 'Количество']"></qVariable>
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
</template>

<script>
  import Table1 from '@/components/DailyBusinessPositionApp/Page3/Table1';
  import Table2 from '@/components/DailyBusinessPositionApp/Page3/Table2';
  import Table3 from '@/components/DailyBusinessPositionApp/Page3/Table3';
  import Table4 from '@/components/DailyBusinessPositionApp/Page3/Table4';
  import Switcher from "@/components/Widget/Switcher";

  import qVariable from '@/components/DailyBusinessPositionApp/Variable';
  import qFilter from "@/components/DailyBusinessPositionApp/Filter";

  export default {
    name: "Page3",
    components: {
      qFilter, qVariable,
      Switcher
    },
    data() {
      return {
        appId: '62d6aee8e2521f0683aba1e6',
        widgets: [
          [
            {component: Table1, title: 'Группа РЦ'},
            {component: Table2, title: 'Магазин'},
          ],
          [
            {component: Table3, title: 'Группа РЦ'},
            {component: Table4, title: 'Магазин'},
          ]
        ]
      }
    }
  }
</script>

<style scoped>
  .page-content {
    padding: 0.25rem 0;
    background-color: #dfe8f6;
  }

  .row {
    justify-content: center;
  }
</style>