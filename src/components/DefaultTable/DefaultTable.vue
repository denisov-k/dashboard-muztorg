<template>
  <div class="table-container">
    <div ref="table" class="table"></div>
  </div>
</template>

<script>
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator_simple.css';
import ruLang from './ru_lang.json';

let defaultOptions = {
  downloadRowRange: "all",
  paginationCounter: "rows",
  paginationMode: "local",
  paginationSize: 100,
  paginationButtonCount: 5,
  paginationSizeSelector: [10, 100, 500, 1000],
  locale: 'ru',
  layout: "fitDataStretch",
  langs: {
    "ru": ruLang
  },
  maxHeight: "100%",
}

export default {
  name: 'DefaultTable',
  components: { },
  data() {
    return {
      tabulator: null,
      tableData: [],
      pagination: false
    };
  },
  props: {
    options: Object
  },
  watch: {
    options: {
      handler(options) {
        this.tabulator = new Tabulator(this.$refs.table, { ...defaultOptions, ...options });

        if (this.tabulator.initialized)
          this.tabulator.redraw(true);

        // this.$nextTick();
      },
      deep: true,
    },
  },
  mounted() {


  }
};
</script>

<style scoped lang="scss">
.table-container {
  position: relative;
  margin: auto;
  height: 100%;
  width: 100%;
  border-top: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;

  .table /deep/ {
    height: 100%;
    font-size: 12px;

    .tabulator-tableHolder::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #F5F5F5;
    }
    .tabulator-tableHolder::-webkit-scrollbar
    {
      width: 9px;
      height: 9px;
      background-color: #F5F5F5;
    }
    .tabulator-tableHolder::-webkit-scrollbar-thumb
    {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #747474;
    }
    .tabulator-col-title {
      white-space: normal !important;
    }
    .tabulator-row {
      min-height: unset;

      .tabulator-selectable:hover {
        background-color: #e1eef6;
      }
    }
    .tabulator-cell {
      padding: 0 0.2vw;
    }
    .tabulator-col-content {
      padding: 0.2vh 0.2vw;
    }
  }
}





</style>