const options = {
  tooltip: {
    extraCssText: "display: flex; flex-direction: column;white-space:nowrap; max-width:40vw; font-size: 12px; padding: 0.5rem;",
    // formatter: function (params) { },
    appendToBody: true,
    confine: true,
    trigger: 'axis'
  },
  legend: {
    type: 'scroll',
    padding: [0, 25],
    bottom: '2%',
    textStyle: {
      fontSize: '12px',
      color: '#737373'
    },
    orient: "horizontal"
  },
  calculable: true,
  xAxis: [

  ],
  yAxis: [

  ],
  grid: {
    top: '5%',
    left: '2.5%',
    right: '2.5%',
    bottom: '12.5%',
    containLabel: true,
  },
};

export default options;