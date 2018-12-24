<template>
  <div id="line">
    <div ref="echartDom" id="echartDom"></div>
  </div>
</template>

<script>
import { formatDate } from './util/format.js'

export default {
  props: {
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      
    }
  },
  mounted () {    
    this.drwaLine()
  },
  watch: {
    option() {
      this.$nextTick(() => {
      if (this.option) {
        this.drwaLine()
        }
      })
    }
  },
  methods: {
    drwaLine () {      
      let myChart = this.$echarts.init(this.$refs.echartDom)

      let option = {
        title: this.option.title,
        tooltip: this.option.tooltip,
        legend: {
          left: 'center',
          bottom: 'bottom',
          data: this.option.legend || []
        },
        xAxis: {
          data: this.option.xAxis
        },
        yAxis: this.option.yAxis,
        toolbox: {
          right: '120',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: this.option.series,
        color: this.option.color
      }

      myChart.setOption(option)
    }
  }
}
</script>

<style>
#echartDom {
  width: 1200px;
  height: 400px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 40px;
}
</style>
