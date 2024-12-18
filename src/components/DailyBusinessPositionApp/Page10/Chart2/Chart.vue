<template>
  <widget-container class="widget" :extra-buttons="extraButtons" :is-loading="isLoading">
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
    <template v-slot:subtitle>
      <slot name="subtitle"></slot>
    </template>
    <div class="chart" ref="chartContainer"></div>
  </widget-container>
</template>

<script>
  import WidgetContainer from "@/components/Widget/Container";
  import * as echarts from "echarts";
  import defaultOptions from "./options";

  import api from "@/services/api";
  import ExportUtils from "@/utils/ExportUtils";

  export default {
    name: "Chart",
    components: {WidgetContainer},
    data() {
      return {
        chart: Object,
        dataURL: 'api/dbp/report_10/chart_2',
        extraButtons: [
          { icon: require('@/assets/widget/image.svg'), onClick: this.exportImage, title: 'Экспорт снимка'},
          { icon: require('@/assets/widget/table.svg'), onClick: this.exportData, title: 'Экспорт данных в XLSX'},
        ],
        isLoading: true
      }
    },
    mounted() {
      this.chart = echarts.init(this.$refs["chartContainer"]);

      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (['updateState'].includes(mutation.type))
          this.setupChart();
      });

      this.setupChart()
    },
    beforeDestroy() {
      this.resizeObserver.unobserve(this.$el);
      this.unsubscribe();
      this.chart.dispose();
    },
    methods: {
      exportData() {
        this.getExportingData().then(({ data, headers }) => {
          ExportUtils.exportXLSX(data, headers.map(item => item.title), this.title);
        })
      },
      exportImage() {
        let a = document.createElement("a"),
            image = this.chart.getDataURL({pixelRatio: 2, backgroundColor: '#fff'});

        a.href = image;
        a.download = "Image.png";
        a.click();
      },
      getExportingData() {
        return this.getHyperCube()
      },
      getHyperCube() {
        let filters = this.$store.getters.filters(),
            variables = this.$store.getters.variables();

        let params = {
          format: 'qlik',
          ...variables,
          ...filters
        };

        return api.request(this.dataURL, params).then(rsp => rsp.data);
      },
      setupChart() {
        this.isLoading = true;

        this.resizeObserver = new ResizeObserver(([$container]) => this.repaint($container));
        this.resizeObserver.observe(this.$el)

        this.getHyperCube().then(hc => {
          let series = [
            {
              name: hc.headers[1].title,
              type: 'pie',
              radius: [0, 85],
              center: ['50%', '50%'],
              data: []
            }
          ];

          let tooltip = {
            confine: true,
            formatter: params => {
              let value = hc.data[params.dataIndex][1].qText,
                  name = hc.data[params.dataIndex][0].qText,
                  marker = params.marker;
              return `${marker} ${name} <br> ${value}`
            }
          }

          let options = hc.data.reduce((accum, row, index) => {

            accum.series[0].data.push({ value: row[1].qNum, name: row[0].qText })

            return accum
          }, { series, tooltip })

          this.paintChart(options);

        }).catch(e => this.catchError(e)).finally(() => this.isLoading = false);
      },
      paintChart(options) {
        this.chart.setOption({ ...defaultOptions, ...options });
      },
      repaint($container) {
        if ($container.contentRect.width > 0 && $container.contentRect.height > 0)
          this.chart.resize();
      },
      catchError(e) {
        this.chart.setOption({
          title: {
            show: true,
            textStyle: {
              color: 'grey',
              fontSize: 20
            },
            text: `Ошибка ${e}`,
            left: 'center',
            top: 'center'
          },
          xAxis: {
            show: false
          },
          yAxis: {
            show: false
          },
          series: []
        })

        console.error(e);
      }
    },
  }
</script>

<style scoped>
  .widget {
    padding: 0.5rem 0;
    width: 100%;
    height: 100%;
  }

  .chart {
    width: 100%;
    height: 100%;
  }
</style>

<i18n>
  {
    "en": {
      "title": "Rainfall vs Evaporation",
      "dim_1": "Rainfall",
      "dim_2": "Evaporation",
      "subtitle": "",
      "switch_type": "Switch view type"
    },
    "ru": {
      "title": "Осадки и Испарения",
      "dim_1": "Осадки",
      "dim_2": "Испарения",
      "subtitle": "",
      "switch_type": "Изменить тип отображения"
    }
  }
</i18n>