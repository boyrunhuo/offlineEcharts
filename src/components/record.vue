<template>
  <div id="record">
    <h1>提交记录</h1>
    <el-table
      :data="fileterData"
      style="width:100%"
    >
      <el-table-column
        prop="deviceinfo"
        label="设备信息"
      >
      </el-table-column>
      <el-table-column
        prop="uploadtime"
        label="上传时间"
      >
      </el-table-column>
      <el-table-column
        prop="sumtime"
        label="统计总时长(秒)"
      >
      </el-table-column>
      <el-table-column
        prop="appname"
        label="应用名字"
      >
      </el-table-column>
      <el-table-column
        prop="appversion"
        label="版本号"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary" size="small" @click="showDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from './util/format.js'

export default {
  data () {
    return {
      recordData: [
      ]
    }
  },
  created () {
    this.recordData = window.json
    // this.$http.get('/static/fakeData.json').then(res => {
    //   this.recordData = res.data
    // })
    
  },
  methods: {
    copyArr (arr) {
      return arr.map(e => {
        if (typeof e === 'object') {
          return Object.assign({}, e)
        } else {
          return e
        }
      })
    },
    showDetail (row) {
      this.$router.push({
        path: 'chart',
        query: { 
            appname: row.appname
        },
      })
    }
  },
  computed: {
    fileterData () {
      let arr = this.copyArr(this.recordData)
      arr.forEach(item => {
        let date = new Date(Number(item.uploadtime))
        item.uploadtime = formatDate(date, 'hh:mm:ss')
      })
      return arr
    }
  }
}
</script>

<style scoped>
#record {
  max-width: 1200px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
