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
    <div class="main">
      <switcher :widgets="widgets"></switcher>
      <Table3 />
      <Table4 />
      <Table5 />
      <Table6 />
    </div>
  </div>
</template>

<script>
  import Table1 from '@/components/DailyBusinessPositionApp/Page10/Table1';
  import Table2 from '@/components/DailyBusinessPositionApp/Page10/Table2';
  import Table3 from '@/components/DailyBusinessPositionApp/Page10/Table3';
  import Table4 from '@/components/DailyBusinessPositionApp/Page10/Table4';
  import Table5 from '@/components/DailyBusinessPositionApp/Page10/Table5';
  import Table6 from '@/components/DailyBusinessPositionApp/Page10/Table6';

  import Chart1 from '@/components/DailyBusinessPositionApp/Page10/Chart1';
  import Chart2 from '@/components/DailyBusinessPositionApp/Page10/Chart2';

  import Switcher from "@/components/Widget/Switcher";
  import qVariable from '@/components/Variable';
  import qFilter from "@/components/Filter";

  export default {
    name: "Page10",
    components: {
      Table3, Table4, Table5, Table6,
      qFilter, qVariable,
      Switcher
    },
    data() {
      return {
        appId: '62d6aee8e2521f0683aba1e6',
        widgets: [
          {component: Table1, title: 'TOP SKU'},
          {component: Table2, title: 'TOP Категория1'},
          {component: Chart1, title: 'Возвраты'},
          {component: Chart2, title: 'Транзакции'},
        ],
        variables: [
          { name: 'vMer', options: [ { value: 'GS_Руб', title: 'GS_Руб' },
              { value: 'Количество', title: 'Количество' } ] },
          { name: 'vIsServ', options: [ { value: 'Без услуг', title: 'Без услуг' },
              { value: 'С услугами', title: 'С услугами' } ] },
          { name: 'vIsMov ', options: [ { value: 'Без перемещений', title: 'Без перемещений' },
              { value: 'С перемещениями', title: 'С перемещениями' } ] },
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    display: block;
    padding: 0;
    column-count: 2;
    column-gap: 0;

    & > .widget-container {
      height: 33.3%;
      break-inside: avoid;
      padding: 0.5rem;
      box-sizing: border-box;
    }
    & > .widget-switcher {
      height: 66.6%;
      padding: 0 0.5rem;
      box-sizing: border-box;
    }
  }
</style>