import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'tab',
      component: () => {console.log('loading tab');return import('@/components/tab')}
    },
    {
      path: '/otherTab',
      name: 'otherTab',
      component: () => {console.log('loading otherTab');return import('@/components/otherTab')}
    },

  ]
})
