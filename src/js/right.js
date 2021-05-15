$(function() {
  // 其他温度 左侧半圆
  function drawHalfCircle($dom, pointerColor) {
    var myChart = echarts.init($dom);
    var option = {
      series: [{
        type: 'gauge',
        center: ["50%", "60%"],
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 120,
        splitNumber: 0,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0, '#0e2662'],
              [1, '#0e2662']
            ],
          }
        },
        itemStyle: {
          color: function(param) {
            if (param.value < 20) {
              return '#81b9fc';
            } else if (param.value < 65) {
              return new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#81b9fc'
              }, {
                offset: 1,
                color: '#fcef01'
              }])
            } else {
              return new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#fcef01'
              }, {
                offset: 1,
                color: '#e83828'
              }])
            }
          },
        },
        progress: {
          show: true,
          width: 6,
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 8,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: pointerColor,
          }
        },
        splitLine: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLabel: {
          color: 'transparent',
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          height: '15%',
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 10,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: '#fcef01',
          fontFamily: 'altgot',
        },
        data: [{
          value: 20
        }]
      }],
    };
    myChart.setOption(option, true);
    // setInterval(function() {
    //   let random = (Math.random() * 100).toFixed(2) - 0;
    //   option.series[0].data[0].value = random;

    //   myChart.setOption(option, true);
    // }, 2000);
    return myChart;
  }

  function drawThermometer($dom) {
    var myChart = echarts.init($dom);
    var option;
    var TP_value = 0;
    var kd = [];
    var Gradient = [];
    var max = 180
    // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
    for (var i = 0; i <= max; i++) {
      if (i < 40) {
        kd.push(0)
      } else  if (i % 40 === 0) {
        kd.push(10);
      } else {
        kd.push(0);
      }

    }
    //中间线的渐变色和文本内容
    if (TP_value > 20) {

      Gradient.push({
        offset: 0,
        color: '#93FE94'
      }, {
        offset: 0.5,
        color: '#E4D225'
      }, {
        offset: 1,
        color: '#E01F28'
      })
    } else if (TP_value > -20) {

      Gradient.push({
        offset: 0,
        color: '#93FE94'
      }, {
        offset: 1,
        color: '#E4D225'
      })
    } else {

      Gradient.push({
        offset: 1,
        color: '#93FE94'
      })
    }
    if (TP_value > 62) {
      showValue = 62
    } else {
      if (TP_value < -60) {
        showValue = -60
      } else {
        showValue = TP_value
      }
    }

    leftColor = Gradient[Gradient.length - 1].color;
    option = {
      backgroundColor: '#0C2F6F',
      title: {
        text: '温度计',
        show: false
      },
      yAxis: [{
        show: false,
        data: [],
        min: 0,
        max: max,
        axisLine: {
          show: false
        }
      }, {
        show: false,
        min: 0,
        max: 50,
      }],
      xAxis: [{
        show: false,
        min: -10,
        max: 80,
        data: []
      }, {
        show: false,
        min: -10,
        max: 80,
        data: []
      }, {
        show: false,
        min: -10,
        max: 80,
        data: []
      }, {
        show: false,
        min: -35,
        max: 110,

      }],
      series: [{
        name: '条',
        type: 'bar',
        // 对应上面XAxis的第一个对)象配置
        xAxisIndex: 0,
        data: [{
          value: 60
        }],
        barWidth: 18,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient),
            barBorderRadius: 9,
          }
        },
        z: 2
      }, {
        name: '白框',
        type: 'bar',
        xAxisIndex: 1,
        barGap: '-100%',
        data: [max - 1],
        barWidth: 28,
        itemStyle: {
          normal: {
            color: '#0C2E6D',
            barBorderRadius: 50,
          }
        },
        z: 1
      }, {
        name: '外框',
        type: 'bar',
        xAxisIndex: 2,
        barGap: '-100%',
        data: [max],
        barWidth: 38,
        itemStyle: {
          normal: {
            color: '#4577BA',
            barBorderRadius: 50,
          }
        },
        z: 0
      }, {
        name: '圆',
        type: 'scatter',
        hoverAnimation: false,
        data: [0],
        xAxisIndex: 0,
        symbolSize: 40,
        itemStyle: {
          normal: {
            color: '#93FE94',
            opacity: 1,
          }
        },
        z: 2
      }, {
        name: '白圆',
        type: 'scatter',
        hoverAnimation: false,
        data: [0],
        xAxisIndex: 1,
        symbolSize: 60,
        itemStyle: {
          normal: {
            color: '#0C2E6D',
            opacity: 1,
          }
        },
        z: 1
      }, {
        name: '外圆',
        type: 'scatter',
        hoverAnimation: false,
        data: [0],
        xAxisIndex: 2,
        symbolSize: 70,
        itemStyle: {
          normal: {
            color: '#4577BA',
            opacity: 1,
          }
        },
        z: 0
      }, {
        name: '刻度',
        type: 'bar',
        yAxisIndex: 0,
        xAxisIndex: 3,
        label: false,
        barGap: '-100%',
        data: kd,
        barWidth: 2.5,
        itemStyle: {
          normal: {
            color: 'white',
          }
        },
        z: 0
      }]
    };
    myChart.setOption(option);
    return myChart;
    // setInterval(function() {
    //   option.series[0].data[0].value = (Math.random() * 180).toFixed(2) - 0;
    //   myChart.setOption(option, true);
    // }, 2000);
  }
  $('.thermometer').each(function () {
    drawThermometer(this)
  })
  // 其他温度 左侧半圆
  drawHalfCircle($('#right-top-half-circle').get(0), '#d74736')
  drawHalfCircle($('#right-bottom-half-circle').get(0), '#fcef01')
});