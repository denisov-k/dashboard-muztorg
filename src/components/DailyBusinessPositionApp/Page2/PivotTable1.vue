<template>
  <PivotTable :title="title" :data-u-r-l="dataURL" :totals="false" :left-dims="2">
    <template v-slot:title>
      <span class="title">{{ title }}</span>
    </template>
    <template v-slot:subtitle>
      <slot name="subtitle"></slot>
    </template>
  </PivotTable>
</template>

<script>
  import PivotTable from '@/components/DailyBusinessPositionApp/PivotTable';

  export default {
    name: 'Table1',
    components: {
      PivotTable
    },
    data() {
      return {
        title: 'План/Факт PL',
        dataURL: 'api/dbp/report_2/table_1',
      };
    }
  };
</script>

<style scoped>

</style>
