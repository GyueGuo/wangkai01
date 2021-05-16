$(function() {
  // 缸温
  function drawTemperature($dom, showText) {
    var myChart = echarts.init($dom);
    var _animationDuration = 1000;
    var _animationDurationUpdate = 1000;
    var _animationEasingUpdate = 'quarticInOut';
    var _valOnRadianMax = 300;
    var _outerRadius = 81;
    var _innerRadius = 41;
    var _pointerInnerRadius = 40;

    function renderItem(params, api) {
      var valOnRadian = api.value(1);
      var coords = api.coord([api.value(0), valOnRadian]);
      var polarEndRadian = coords[3];
      var imageStyle = {
        image: 'data:image/png;base64,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',
        x: params.coordSys.cx - _outerRadius,
        y: params.coordSys.cy - _outerRadius,
        width: _outerRadius * 2,
        height: _outerRadius * 2
      };

      return {
        type: 'group',
        children: [
          {
            type: 'image',
            style: imageStyle,
            clipPath: {
              type: 'sector',
              shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r: _outerRadius,
                r0: _innerRadius,
                startAngle: 0,
                endAngle: -polarEndRadian,
                transition: 'endAngle',
                enterFrom: {
                  endAngle: 0
                }
              }
            }
          }, {
            type: 'image',
            style: imageStyle,
            clipPath: {
              type: 'polygon',
              shape: {
                points: makePionterPoints(params, polarEndRadian)
              },
              extra: {
                polarEndRadian: polarEndRadian,
                transition: 'polarEndRadian',
                enterFrom: {
                  polarEndRadian: 0
                }
              },
              during: function(apiDuring) {
                apiDuring.setShape(
                  'points',
                  makePionterPoints(params, apiDuring.getExtra('polarEndRadian'))
                );
              }
            }
          }, {
            type: 'text',
            extra: {
              valOnRadian: valOnRadian,
              transition: 'valOnRadian',
              enterFrom: {
                valOnRadian: 0
              }
            },
            style: {
              text: makeText(valOnRadian),
              fontSize: 40,
              fontWeight: 700,
              x: params.coordSys.cx,
              y: params.coordSys.cy - 30,
              fill: '#fcef01',
              align: 'center',
              fontFamily: 'altgot',
            },
            during: function(apiDuring) {
              apiDuring.setStyle('text', makeText(apiDuring.getExtra('valOnRadian')));
            }
          }, {
            type: 'text',
            style: {
              text: showText,
              fontSize: 16,
              fontWeight: 400,
              x: params.coordSys.cx,
              y: params.coordSys.cy + 20,
              fill: '#81b9fc',
              align: 'center',
              fontFamily: 'altgot',
            },
          }
        ]
      };
    }

    function convertToPolarPoint(renderItemParams, radius, radian) {
      return [
        Math.cos(radian) * radius + renderItemParams.coordSys.cx,
        -Math.sin(radian) * radius + renderItemParams.coordSys.cy
      ];
    }

    function makePionterPoints(renderItemParams, polarEndRadian) {
      return [
        convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
        convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian + Math.PI * 0.003),
        convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian)
      ];
    }

    function makeText(valOnRadian) {
      return (valOnRadian / _valOnRadianMax * 100).toFixed(0) + '°C';
    }

    var option = {
      animationEasing: _animationEasingUpdate,
      animationDuration: _animationDuration,
      animationDurationUpdate: _animationDurationUpdate,
      animationEasingUpdate: _animationEasingUpdate,
      dataset: {
        source: [
          [1, 156]
        ]
      },
      tooltip: {},
      angleAxis: {
        type: 'value',
        startAngle: 0,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        min: 0,
        max: _valOnRadianMax
      },
      radiusAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      polar: {},
      series: [{
          type: 'custom',
          coordinateSystem: 'polar',
          renderItem: renderItem
        },
        {
          name: '外边框',
          type: 'pie',
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          center: ['50%', '50%'],
          radius: ['80%', '80%'],
          label: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 9,
            name: '',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#0b5263'
              }
            }
          }]
        },
        {
          name: '外边框',
          type: 'pie',
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          center: ['50%', '50%'],
          radius: ['70%', '70%'],
          label: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 9,
            name: '',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#0b5263'
              }
            }
          }]
        }
      ]
    };

    setInterval(function() {
      //这里获取到真正的温度，开始温度设置为真实值+50，为了当最低值是-50的时候刚好在最右侧，如果温度低于零下50，则起始温度直接设置为0
      var nextSource = [
        [0, Math.round(Math.random() * 300)]
      ];
      myChart.setOption({
        dataset: {
          source: nextSource
        }
      });
    }, 3000);

    myChart.setOption(option);
    return myChart;
  }
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
      } else if (i % 40 === 0) {
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
  }

  function drawGraph($dom) {
    var myChart = echarts.init($dom);
    var data = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    for (var i = 0; i < 6; i++) {
      data.push({
        name: i,
        value: [
          i * 20,
          Math.random() * 100
        ]
      });
      data1.push({
        name: i,
        value: [
          i * 20,
          Math.random() * 300
        ]
      });
      data2.push({
        name: i,
        value: [
          i * 20,
          Math.random() * 700
        ]
      });
      data3.push({
        name: i,
        value: [
          i * 20,
          Math.random() * 10000
        ]
      });
    }
    var temp = 120;
    var option = {
      title: false,
      tooltip: false,
      legend: {
        right: 0,
        data: [{
          name: '推力值',
          textStyle: {
            color: '#81b9fc',
            icon: 'circle',
          },
        }, {
          name: '扭矩值',
          textStyle: {
            color: '#81b9fc',
          },
        }, {
          name: '油门',
          textStyle: {
            color: '#81b9fc',
          },
        }, {
          name: 'TCU转速',
          textStyle: {
            color: '#81b9fc',
          },
        }]
      },
      xAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#81b9fc',
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#81b9fc',
          }
        },
        scale: true
      },
      yAxis: [{
          name: '(N,NU,%)',
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#81b9fc',
            }
          },
          axisLine: {
            lineStyle: {
              color: '#81b9fc',
            }
          },
        },
        {
          name: '(NPM)',
          axisLine: {
            lineStyle: {
              color: "rgb(239, 22, 22)"
            }
          },
          type: 'value',
          splitLine: {
            show: false
          }
        }
      ],
      series: [{
          name: '推力值',
          type: 'line',
          lineStyle: {
            color: "#DAA520"
          },
          smooth: true,
          yAxisIndex: 0,
          showSymbol: false,
          hoverAnimation: false,
          data: []
        },
        {
          name: '扭矩值',
          type: 'line',
          lineStyle: {
            color: "#81b9fc"
          },
          smooth: true,
          yAxisIndex: 0,
          showSymbol: false,
          hoverAnimation: false,
          data: []
        },
        {
          name: '油门',
          type: 'line',
          lineStyle: {
            color: "#fcef01"
          },
          smooth: true,
          yAxisIndex: 0,
          showSymbol: false,
          hoverAnimation: false,
          data: []
        },
        {
          name: 'TCU转速',
          type: 'line',
          lineStyle: {
            color: "#e83828"
          },
          smooth: true,
          yAxisIndex: 1,
          showSymbol: false,
          hoverAnimation: false,
          data: []
        }
      ]
    };
    setInterval(function() {
      temp = temp + 20;
      data.shift();
      data.push({
        name: i,
        value: [
          temp,
          Math.random() * 1000
        ]
      });
      data1.shift();
      data1.push({
        name: i,
        value: [
          temp,
          Math.random() * 2000
        ]
      });
      data2.shift();
      data2.push({
        name: i,
        value: [
          temp,
          Math.random() * 1500
        ]
      });
      data3.shift();
      data3.push({
        name: i,
        value: [
          temp,
          Math.random() * 10000
        ]
      });
      option.series[0].data = data;
      option.series[1].data = data1;
      option.series[2].data = data2;
      option.series[3].data = data3;
      myChart.setOption(option, true);
    }, 3000);
    return myChart;
  }

  function drawPressure($dom) {
    var myChart = echarts.init($dom);
    var option = {
      series: [{
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        max: 200,
        min: -50,
        progress: {
          show: true,
          width: 3
        },
        axisLine: {
          lineStyle: {
            width: 3
          }
        },
        axisTick: {
          show: false
        },
        splitLine: false,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: '#fdf914'
            }, {
              offset: 1,
              color: '#e83828'
            }]),
          }
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          // icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '40%',
          width: 2,
          // offsetCenter: [0, '-60%'],
          // itemStyle: {
          //   color: pointerColor,
          // }
        },
        anchor: false,
        title: {
          show: false
        },
        detail: false,
        data: [{
          value: 70
        }]
      }]
    };
    setInterval(function() {
      let random = (Math.random() * 60).toFixed(2) - 0;
      option.series[0].data[0].value = random;
      myChart.setOption(option, true);
    }, 2000);
    myChart.setOption(option);
    return myChart;
  }

  $('.thermometer').each(function() {
    drawThermometer(this)
  });
  $('.pressure-chat').each(function() {
    drawPressure(this);
  });
  $('.temperature-chat').each(function () {
    drawTemperature(this, this.getAttribute('data-text'));
  });
  // 其他温度 左侧半圆
  drawHalfCircle($('#right-top-half-circle').get(0), '#d74736');
  drawHalfCircle($('#right-bottom-half-circle').get(0), '#fcef01');
  drawGraph($('#graph-wrap').get(0))
});