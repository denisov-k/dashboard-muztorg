<template>
  <Table :data-u-r-l="dataURL">
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
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
        dataURL: 'api/dbp/report_9/table_3',
      };
    }
  };
</script>

<style scoped>

</style>
