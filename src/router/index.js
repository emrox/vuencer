import Vue from 'vue'
import Router from 'vue-router'
import StepSeq from '@/components/StepSeq'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StepSeq',
      component: StepSeq
    }
  ]
})
