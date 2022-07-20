<template>
  <div class="page-content">
    <div>
      <vMerVariable></vMerVariable>
    </div>
   <switcher :widgets="widgets"></switcher>
  </div>
</template>

<script>
import Table1 from '@/components/DailyBusinessPositionApp/Page1/Table1';
import Table2 from '@/components/DailyBusinessPositionApp/Page1/Table2';
import Switcher from "@/components/Widget/Switcher";

import vMerVariable from '@/components/DailyBusinessPositionApp/Variables/vMer';

export default {
  name: "Page1",
  components: {
    Switcher, vMerVariable
  },
  data() {
    return {
      widgets: [
        { component: Table1, title: 'Группа РЦ' },
        { component: Table2, title: 'Магазин' },
      ]
    }
  }
}
</script>

<style scoped>
  .page-content {
    background-color: #dfe8f6;
  }
</style>