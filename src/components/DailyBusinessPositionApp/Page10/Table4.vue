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
    name: 'Table1',
    components: {
      Table
    },
    data() {
      return {
        dataURL: 'api/dbp/report_10/table_4',
      };
    }
  };
</script>

<style scoped>

</style>
