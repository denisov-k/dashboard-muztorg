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
    <div class="row">
      <div class="col-xs-12">
        <Table3></Table3>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <Table4></Table4>
      </div>
    </div>
  </div>
</template>

<script>
import Table1 from '@/components/DataSourceApp/Page1/Table1';
import Table2 from '@/components/DataSourceApp/Page1/Table2';
import Table3 from '@/components/DataSourceApp/Page1/Table3';
import Table4 from '@/components/DataSourceApp/Page1/Table4';

export default {
  name: "Page1",
  components: {
    Table1, Table2, Table3, Table4
  }
}
</script>

<style scoped>

</style>