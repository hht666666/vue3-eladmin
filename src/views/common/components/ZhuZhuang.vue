<template>
  <div id="zhuzhuang"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'

onMounted(() => {
  type EChartsOption = echarts.EChartsOption

  var chartDom = document.getElementById('zhuzhuang')!
  var myChart = echarts.init(chartDom)
  var option: EChartsOption

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#2ec7c9' // 0% 处的颜色
          },
          {
            offset: 0.33,
            color: '#2ec7c9' // 33% 处的颜色
          },
          {
            offset: 0.34,
            color: '#b6a2de' // 34% 处的颜色
          },
          {
            offset: 0.66,
            color: '#b6a2de' // 66% 处的颜色
          },
          {
            offset: 0.67,
            color: '#5ab1ef' // 67% 处的颜色
          },
          {
            offset: 1,
            color: '#5ab1ef' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    ],
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  }

  option && myChart.setOption(option)
})
</script>
<style lang="scss" scoped>
#zhuzhuang {
  width: 100%;
  height: 100%;
}
</style>
