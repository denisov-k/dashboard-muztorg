<template>
  <PivotTable :title="title" :data-u-r-l="dataURL" :totals="[2]" :left-dims="2">
    <template v-slot:title>
      <span class="title">{{ title }}</span>
    </template>
    <template v-slot:subtitle>
      <slot name="subtitle"></slot>
    </template>
  </PivotTable>
</template>

<script>
  import PivotTable from '@/components/DefaultTable/PivotTable';

  export default {
    name: 'Table1',
    components: {
      PivotTable
    },
    data() {
      return {
        title: 'План/Факт',
        dataURL: 'api/dbp/report_12/table_1',
      };
    }
  };
</script>

<style scoped>

</style>
