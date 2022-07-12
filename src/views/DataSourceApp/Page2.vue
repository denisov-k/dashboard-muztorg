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
    <div class="row">
      <div class="col-xs-12">
        <Table5></Table5>
      </div>
    </div>
  </div>
</template>

<script>
import Table1 from '@/components/DataSourceApp/Page2/Table1';
import Table2 from '@/components/DataSourceApp/Page2/Table2';
import Table3 from '@/components/DataSourceApp/Page2/Table3';
import Table4 from '@/components/DataSourceApp/Page2/Table4';
import Table5 from '@/components/DataSourceApp/Page2/Table5';

export default {
  name: "Page2",
  components: {
    Table1, Table2, Table3, Table4, Table5
  }
}
</script>

<style scoped>

</style>