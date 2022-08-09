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
    name: 'Table5',
    components: {
      Table
    },
    data() {
      return {
        dataURL: 'api/dbp/report_10/table_5',
        title: 'Контрагенты'
      };
    }
  };
</script>

<style scoped>

</style>
