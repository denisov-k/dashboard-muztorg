<template>
  <Table :data-u-r-l="dataURL">
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
    name: 'Table4',
    components: {
      Table
    },
    data() {
      return {
        dataURL: 'api/dbp/report_10/table_4',
        title: 'Категория 2'
      };
    }
  };
</script>

<style scoped>

</style>
