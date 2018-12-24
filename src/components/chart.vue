<template>
  <div id="chart">
    <h1>DYMoniter</h1>
    <el-table :data="tableData" style="width:100%">
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column prop="CPU" label="平均CPU(%)">
      </el-table-column>
      <el-table-column prop="memory" label="平均内存(MB)">
      </el-table-column>
      <el-table-column prop="fps" :render-header="renderFpsHeader">
      </el-table-column>
      <el-table-column :render-header="renderFlowHeader">
        <el-table-column label="总流量(总输入+总输出)">
          <template scope="scope">
            <p>{{scope.row.traffic}}({{scope.row.inputSum}}+{{scope.row.outputSum}})</p>
          </template>
        </el-table-column>
        <el-table-column prop="input" label="平均输入">
        </el-table-column>
        <el-table-column prop="output" label="平均输出">
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-tabs v-model="activeName">
      <el-tab-pane label="CPU数据图" name="first">
        <chartline :option="cpuOption"></chartline>
      </el-tab-pane>
      <el-tab-pane label="Fps趋势" name="second">
        <chartline :option="fpsOption"></chartline>
      </el-tab-pane>
      <el-tab-pane label="流量数据图" name="third">
        <chartline :option="flowOption"></chartline>
      </el-tab-pane>
      <el-tab-pane label="内存数据图" name="fourth">
        <chartline :option="memoryOption"></chartline>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import chartline from './line'
import { formatDate } from './util/format.js'

export default {
  data: function() {
    return {
      filterData: {
        cpu: [],
        netin: [],
        netout: [],
        memory: [],
        fps: [],
        xAxis: []
      },
      tableData: [
        {
          remark: '本次测试',
          CPU: '',
          memory: '',
          fps: '-',
          traffic: '',
          input: '',
          output: '',
          inputSum: '',
          outputSum: '',
        }
      ],
      activeName: 'first'
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.getData()
  //   })
  // },
  created() {
    this.getData()
    this.getTableData()
  },
  components: {
    chartline
  },
  methods: {
    renderFpsHeader(h) {
      return (
        <div>
          <span>平均FPS(帧/秒)</span>
          <i
            class="el-icon-info"
            style="color:#409EFF; font-size:16px; margin-left: 4px;"
          />
        </div>
      )
    },
    renderFlowHeader(h) {
      return (
        <div style="position: relative;left: 50%;transform: translateX(-50%);">
          <span>流量(KB)</span>
        </div>
      )
    },
    getAverage(arr) {
      let lenght = arr.lenght
      let sum = arr.reduce((previous, current) => (current += previous))
      let avg = Number(sum / arr.length).toFixed(3)
      return avg
    },
    getSum(arr) {
        let sum = arr.reduce((previous, current) => (current += previous))
        sum = Number(sum)
        return sum
    },
    getTableData() {      
      this.tableData[0].CPU = this.getAverage(this.filterData.cpu)      
      this.tableData[0].memory = this.getAverage(this.filterData.memory)
      this.tableData[0].fps = this.getAverage(this.filterData.fps)
      this.tableData[0].input = this.getAverage(this.filterData.netin)
      this.tableData[0].output = this.getAverage(this.filterData.netout)
      this.tableData[0].inputSum = this.getSum(this.filterData.netin)
      this.tableData[0].outputSum = this.getSum(this.filterData.netout)
      this.tableData[0].traffic = Number(this.tableData[0].inputSum) + Number(this.tableData[0].outputSum) 
    },
    getData() {
      let alldata = window.json
      alldata.forEach(item => {
        if (item.appname === this.$route.query.appname) {
          item.content.forEach(element => {
            this.filterData.cpu.push(element.cpu)
            this.filterData.memory.push(element.memory)
            this.filterData.fps.push(element.fps)
            this.filterData.netin.push(element.netin)
            this.filterData.netout.push(element.netout)
            this.filterData.xAxis.push(
              formatDate(new Date(Number(element.time) * 1000), 'hh:mm:ss')
            )
          })
        }
      })
      // this.$http.get('/static/fakeData.json').then(res => {
      //   let alldata = res.data
      //   alldata.forEach(item => {
      //     if (item.appname === this.$route.query.appname) {
      //       item.content.forEach(element => {
      //         this.filterData.cpu.push(element.cpu)
      //         this.filterData.netin.push(element.netin)
      //         this.filterData.netout.push(element.netout)
      //         this.filterData.memory.push(element.memory)
      //         this.filterData.fps.push(element.fps)
      //         this.filterData.xAxis.push(formatDate(new Date(Number(element.time)), 'hh:mm:ss'))
      //       })
      //     }
      //   })
      // })
    }
  },
  computed: {
    cpuOption() {
      return {
        title: {
          left: 'center',
          text: 'CPU数据图'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b} <br> {c}%'
        },
        xAxis: this.filterData.xAxis,
        yAxis: [
          {
            type: 'value',
            axisLabel: { formatter: '{value} %' }
          }
        ],
        series: [
          {
            type: 'line',
            data: this.filterData.cpu,
            itemStyle: { normal: { areaStyle: { type: 'default' } } }
          }
        ],
        color: ['#13CE66']
      }
    },
    fpsOption() {
      return {
        title: {
          left: 'center',
          text: 'Fps趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: this.filterData.xAxis,
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            type: 'line',
            data: this.filterData.fps
          }
        ],
        color: ['#1D8CE0']
      }
    },
    flowOption() {
      return {
        title: {
          left: 'center',
          text: '流量数据图'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b} <br> {c}KB'
        },
        xAxis: this.filterData.xAxis,
        yAxis: [
          {
            type: 'value',
            axisLabel: { formatter: '{value} KB' }
          }
        ],
        legend: ['上行流量', '下行流量'],
        series: [
          {
            name: '上行流量',
            type: 'line',
            data: this.filterData.netout
          },
          {
            name: '下行流量',
            type: 'line',
            data: this.filterData.netin
          }
        ],
        color: ['#20A0FF', '#FF4949']
      }
    },
    memoryOption() {
      return {
        title: {
          left: 'center',
          text: '内存数据图'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b} <br> {c}M'
        },
        xAxis: this.filterData.xAxis,
        yAxis: [
          {
            type: 'value',
            axisLabel: { formatter: '{value} M' }
          }
        ],
        series: [
          {
            type: 'line',
            data: this.filterData.memory
          }
        ],
        color: ['#475669']
      }
    }
  }
}
</script>

<style scoped>
#chart {
  max-width: 1200px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.el-tabs {
  margin-top: 40px;
}
</style>
