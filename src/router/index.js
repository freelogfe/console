/**
 * meta 配置
 * hidden=true表示在导航上默认不展示
 * requiresAuth=true 表示需要身份验证即需要登录
 * scrollTop=true 切换路由时，页面滚动到顶部，默认是true
 * type: resource/node 对应的侧边栏
 */
import Vue from 'vue'
import Router from 'vue-router'
import Views from '@/views/index'

import nodeRoute from './node'
import resourceRoute from './resource'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }
  const position = {}
  if (to.hash) {
    position.selector = to.hash
  }

  if (to.meta.scrollToTop !== false) {
    position.x = 0
    position.y = 0
  }
  return position
}

const router = new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      meta: { title: '资源市场' },
      component: Views.layout,
      children: [resourceRoute, nodeRoute, {
        path: 'about',
        hidden: true,
        meta: {
          requiresAuth: false,
          title: '关于freelog'
        },
        component: Views.aboutView
      },{
        path: 'setting',
        hidden: true,
        meta: {
          requiresAuth: true,
          title: '账号设置'
        },
        component: Views.userView
      }, {
        path: 'help',
        hidden: true,
        meta: {
          requiresAuth: false,
          title: '帮助中心'
        },
        component: Views.helpView
      }, {
        path: '/',
        hidden: true,
        meta: {
          requiresAuth: false,
          title: '资源市场',
          theme: 'gray'
        },
        component: Views.mainView
      }]
    },
    {
      path: '*',
      meta: {
        requiresAuth: false,
        title: 'not found'
      },
      component: Views.layout,
      children: [{
        name: '404',
        path: '',
        meta: {
          requiresAuth: false,
          title: '404'
        },
        component: Views.error
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  //do sth
  next()
})
export default router
