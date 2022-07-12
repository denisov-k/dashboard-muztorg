<template>
  <div class="page-content">
    <div class="row">
      <div class="col-xs-12">
        <Table1></Table1>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <Table2></Table2>
      </div>
    </div>
  </div>
</template>

<script>
import Table1 from '@/components/DataManagementApp/Page1/Table1';
import Table2 from '@/components/DataManagementApp/Page1/Table2';

export default {
  name: "Page1",
  components: {
    Table1, Table2
  }
}
</script>

<style scoped>

</style>