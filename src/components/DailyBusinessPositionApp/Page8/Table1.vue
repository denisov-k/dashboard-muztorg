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
        title: 'Аксессуары',
        dataURL: 'api/dbp/report_8/table_1',
      };
    }
  };
</script>

<style scoped>

</style>
