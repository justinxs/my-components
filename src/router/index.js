import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'tab',
      component: () => import('@/components/tab')
    },
    {
      path: '/otherTab',
      name: 'otherTab',
      component: () => import('@/components/otherTab')
    },
    {
      path: '/slot',
      name: 'slot',
      component: () => import('@/components/slot')
    },

  ]
})
