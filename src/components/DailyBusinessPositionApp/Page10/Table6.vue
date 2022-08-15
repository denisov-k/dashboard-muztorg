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
    name: 'Table6',
    components: {
      Table
    },
    data() {
      return {
        dataURL: 'api/dbp/report_10/table_6',
        title: 'Бренд'
      };
    }
  };
</script>

<style scoped>

</style>
