<template>
  <Table :title="title" :data-u-r-l="dataURL" :totals="true">
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
    <template v-slot:subtitle>
      <slot name="subtitle"></slot>
    </template>
  </Table>
</template>

<script>
  import Table from '@/components/DefaultTable/Table';

  export default {
    name: 'Table2',
    components: {
      Table
    },
    data() {
      return {
        title: 'Table 2',
        dataURL: 'api/dbp/report_1/table_2',
      };
    }
  };
</script>

<style scoped>

</style>
