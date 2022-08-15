<template>
  <Table :data-u-r-l="dataURL" :totals="true">
    <template v-slot:title>
      <span class="title">{{ title }}</span>
    </template>
    <template v-slot:subtitle>
      <slot name="subtitle"></slot>
    </template>
  </Table>
</template>

<script>
  import Table from '@/components/DailyBusinessPositionApp/Table';

  export default {
    name: 'Table3',
    components: {
      Table
    },
    data() {
      return {
        dataURL: 'api/dbp/report_10/table_3',
        title: 'Категория 1'
      };
    }
  };
</script>

<style scoped>

</style>
