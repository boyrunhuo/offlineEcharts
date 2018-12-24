import Vue from 'vue'
import Router from 'vue-router'
import chart from '@/components/chart'
import record from '@/components/record'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'record',
      component: record
    },
    {
      path: '/chart',
      name: 'chart',
      component: chart
    }
  ]
})
