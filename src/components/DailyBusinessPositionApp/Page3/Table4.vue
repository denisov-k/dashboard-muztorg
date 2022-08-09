<template>
  <Table :title="title" :data-u-r-l="dataURL">
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
    name: 'Table4',
    components: {
      Table
    },
    data() {
      return {
        title: 'Динамика оборота',
        dataURL: 'api/dbp/report_3/table_4',
      };
    }
  };
</script>

<style scoped>

</style>
