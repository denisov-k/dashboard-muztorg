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
        dataURL: 'api/dbp/report_7/chart_1',
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
              type: 'bar',
              data: []
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
          let yAxis = {
            axisLabel: {
              fontSize: '12px',
              formatter(value) {
                return Math.abs(value) > 1000000 ? `${value / 1000000} м` : value
              }
            },
            type: 'value',
            scale: true
          }

          let data = hc.data.sort((a, b) => a[0].qNum - b[0].qNum);

          let tooltip = {
            confine: true,
            trigger: 'axis',
            formatter: function (params) {

              let dataIndex = params[0].dataIndex,
                  dataRow = data[dataIndex],
                  name = dataRow[0].qText;

              let series = params.map((param, index) => {
                return {
                  name: param.seriesName,
                  value: dataRow[index + 1].qText,
                  marker: param.marker
                }
              })

              let template = series.map(item => `<br/>${item.marker} ${item.name}: ${item.value}`).join('');

              return `<b>${name}</b>${template}`
            }
          }

          let options = data.reduce((accum, row, index) => {

            accum.xAxis[0].data.push(row[0].qText)
            accum.series[0].data.push(row[1].qNum)

            return accum
          }, { series, xAxis, yAxis, tooltip })

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