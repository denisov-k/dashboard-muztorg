<template>
  <Table :data-u-r-l="dataURL">
    <template v-slot:subtitle>
      <slot name="subtitle"></slot>
    </template>
  </Table>
</template>

<script>
  import Table from '@/components/DailyBusinessPositionApp/Table';

  export default {
    name: 'Table2',
    components: {
      Table
    },
    data() {
      return {
        dataURL: 'api/dbp/report_11/table_2',
      };
    }
  };
</script>

<style scoped>

</style>
