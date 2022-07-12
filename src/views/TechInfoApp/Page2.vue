<template>
  <div class="page-content">
    <Table1></Table1>
  </div>
</template>

<script>
import Table1 from '@/components/TechInfoApp/Page2/Table1';

export default {
  name: "Page2",
  components: {
    Table1
  }
}
</script>

<style scoped>
  .page-content {
    flex-wrap: wrap;
  }
</style>