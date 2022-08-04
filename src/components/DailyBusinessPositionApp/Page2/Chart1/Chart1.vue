<template>
  <widget-container :title="$t('title')" class="widget" :extra-buttons="extraButtons" :is-loading="isLoading">
    <template v-slot:title>
      <span class="title">{{ title }}</span>
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
    name: "Chart1",
    components: {WidgetContainer},
    data() {
      return {
        chart: Object,
        dataURL: 'api/dbp/report_2/chart_1',
        extraButtons: [
          { icon: require('@/assets/widget/image.svg'), onClick: this.exportImage },
          { icon: require('@/assets/widget/table.svg'), onClick: this.exportData },
        ],
        isLoading: true,
        title: 'Динамика План/Факт PL'
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
        this.getExportingData().then(data => {
          ExportUtils.exportXLSX(data, this.options.columns.map(item => item.title), this.title);
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
        return this.getHyperCube().then(hc => hc.data);
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
              type: 'bar',
              data: []
            },
            {
              name: hc.headers[2].title,
              type: 'bar',
              data: []
            },
            {
              name: hc.headers[3].title,
              type: 'line',
              data: [],
              yAxisIndex: 1
            }
          ];
          let xAxis = [
            {
              name: hc.headers[0].title,
              type: 'category',
              data: [],
              axisLabel: {
                fontSize: '12px',
              }
            }
          ]
          let yAxis = [
            {
              type: 'value',
              axisLabel: {
                fontSize: '12px',
                formatter(value) {
                  return `${value / 1000000} м`
                }
              }
            },
            {
              type: 'value',
              axisLabel: {
                fontSize: '12px',
                formatter(value) {
                  return `${value} %`
                }
              }
            },
          ]

          let options = hc.data.reduce((accum, row, index) => {

            accum.xAxis[0].data.push(row[0].qText)
            accum.series[0].data.push(row[1].qNum)
            accum.series[1].data.push(row[2].qNum)
            accum.series[2].data.push(row[3].qNum)

            return accum
          }, { series, xAxis, yAxis })

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
    margin: 0.5rem 0;
    flex: 1 1 auto;
    height: 100%;
    max-height: 100%;
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