<template>
  <PivotTable :title="title" :data-u-r-l="dataURL" :totals="[]" :left-dims="1">
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
    <template v-slot:subtitle>
      <slot name="subtitle"></slot>
    </template>
  </PivotTable>
</template>

<script>
  import PivotTable from '@/components/DefaultTable/PivotTable';

  export default {
    name: 'PivotTable1',
    components: {
      PivotTable
    },
    data() {
      return {
        title: 'Аксессуары',
        dataURL: 'api/dbp/report_8/table_1',
      };
    }
  };
</script>

<style scoped>

</style>
