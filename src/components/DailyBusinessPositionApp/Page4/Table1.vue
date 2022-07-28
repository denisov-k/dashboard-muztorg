<template>
  <Table :title="title" :data-u-r-l="dataURL">
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
    name: 'Table1',
    components: {
      Table
    },
    data() {
      return {
        title: 'Возвраты',
        dataURL: 'api/dbp/report_4/table_1',
      };
    }
  };
</script>

<style scoped>

</style>
