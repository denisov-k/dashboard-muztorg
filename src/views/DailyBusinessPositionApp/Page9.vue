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
        <qFilter :app-id="appId" name="bank" placeholder="Банк"></qFilter>
      </div>
      <div class="row">
        <qFilter :app-id="appId" name="market_type" placeholder="Тип рынка"></qFilter>
        <qFilter :app-id="appId" name="sales_channel" placeholder="Канал сбыта"></qFilter>
        <qFilter :app-id="appId" name="point_of_sale" placeholder="Точка сбыта"></qFilter>
      </div>
    </div>
    <router-view name="aside"></router-view>
    <switcher :widgets="widgets" class="main"></switcher>
  </div>
</template>

<script>
  import Table1 from '@/components/DailyBusinessPositionApp/Page9/Table1';
  import Table2 from '@/components/DailyBusinessPositionApp/Page9/Table2';
  import Table3 from '@/components/DailyBusinessPositionApp/Page9/Table3';
  import Table4 from '@/components/DailyBusinessPositionApp/Page9/Table4';
  import Switcher from "@/components/Widget/Switcher";

  import qVariable from '@/components/Variable';
  import qFilter from "@/components/Filter";

  export default {
    name: "Page9",
    components: {
      qFilter, qVariable,
      Switcher
    },
    data() {
      return {
        appId: '62d6aee8e2521f0683aba1e6',
        widgets: [
          {component: Table1, title: 'Страна'},
          {component: Table2, title: 'Округ'},
          {component: Table3, title: 'Регион'},
          {component: Table4, title: 'Город'},
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

<style scoped>

</style>