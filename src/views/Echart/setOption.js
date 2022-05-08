
export function setLineOption(salesStatus, line) {
  salesStatus.setOption({
    color: ['#55A5EB', '#F99BAD'],
    title: {
      text: '销售情况'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器
        type: 'cross'
      }
    },
    xAxis: [
      {
        boundaryGap: false,
        data: line.map((r) => r.mounth)
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 1000
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'value',
        lineStyle: {
          width: 0
        },
        areaStyle: {
          color: '#55A5EB'
        },
        data: line.map((r) => r.line1)
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: 'value',
        lineStyle: {
          width: 0
        },
        areaStyle: {
          color: '#F99BAD'
        },
        data: line.map((r) => r.line2)
      }
    ]
  })
}

export function setBarOption(financesStatus, bar) {
  financesStatus.setOption({
    color: ['#7460EE', '#FFB22B'],
    title: {
      text: '资金情况'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      itemHeight: 8,
      right: '5%',
      data: ['支出', '收入']
    },
    xAxis: [
      {
        type: 'category',
        data: bar.map((r) => r.mounth)
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: false
      }
    ],
    series: [
      {
        name: '支出',
        type: 'bar',
        data: bar.map((r) => r.bar1)
      },
      {
        name: '收入',
        type: 'bar',
        data: bar.map((r) => r.bar2)
      }
    ]
  })
}

export function setPieOption(sectorStatus, pie, color) {
  sectorStatus.setOption({
    color,
    title: {
      text: '部门情况',
      top: '6%'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      // 图例的朝向: horizontal,vertical
      orient: '',
      x: '70%',
      y: '28%',
      // 图标
      icon: 'triangle',
      textStyle: {
        // 图例字体大小
        fontSize: 12
      },
      // 图例大小
      itemHeight: 10
    },
    graphic: {
      type: 'text',
      left: '28%',
      top: '52%',
      style: {
        text: '费用占比',
        textAlign: 'center',
        fill: '#00E4FF',
        fontSize: 15
      }
    },
    series: [
      {
        name: 'pie',
        type: 'pie',
        radius: ['50%', '70%'],
        label: {
          show: false
        },
        // 圆心的坐标位置
        center: ['35%', '55%'],
        // 防止标签间的重叠
        avoidLabelOverlap: false,
        data: pie
      }
    ]
  })
}

export default {
  setLineOption,
  setBarOption,
  setPieOption
}
