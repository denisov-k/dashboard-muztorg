<template>
  <Table :title="title" :data-u-r-l="dataURL"></Table>
</template>

<script>
  import Table from '@/components/DailyBusinessPositionApp/Table';

  export default {
    name: 'Chart1',
    components: {
      Table
    },
    data() {
      return {
        title: 'Динамика План/Факт PL',
        dataURL: 'api/dbp/report_2/chart_1',
      };
    }
  };
</script>

<style scoped>

</style>
