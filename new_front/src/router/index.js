import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import People from '@/components/People'
import Configuration from '@/components/Configuration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
      path: '/map',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/people',
      name: 'people',
      component: People
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: Configuration
    }
  ]
})
