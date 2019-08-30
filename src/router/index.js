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
    {
      path: '/pagination',
      name: 'pagination',
      component: () => import('@/components/pagination')
    },
    {
      path: '/svg',
      name: 'svg',
      component: () => import('@/components/svgAnimation')
    },
    {
      path: '/vant',
      name: 'van',
      component: () => import('@/components/vantCom/dialog')
    },
    {
      path: '/tree',
      name: 'tree',
      component: () => import('@/components/tree')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/components/editor')
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: () => import('@/components/canvas')
    },

  ]
})
